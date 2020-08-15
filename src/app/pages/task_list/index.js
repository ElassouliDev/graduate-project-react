import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import TaskListItem from "./component/TaskListItem";
import { Divider, Typography } from "@material-ui/core";
import getNextPath from "../../../shared/middleware/getNexPath"
import { observer, inject } from "mobx-react";
import AddTask from "./component/AddTask";
import { Edit } from '@material-ui/icons';
import { Fab } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import { DeleteForever, Add } from '@material-ui/icons';
import EditTask from "./component/EditTask";
import LoadingProgressPage from "../../../shared/components/loading-progress-page";

const TaskList = (props) => {
  const classRoom = props.store.ClassRoomStore.getClassRoom(props.match.params.id);
  const [open, setOpen] = React.useState(false);
  const [editForm, setOpenEditForm] = React.useState(false);
  const [task , setTask] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }
  const handleCloseEditForm = () => {
    setOpenEditForm(false);
  }
  React.useEffect(
    () => {
      async function fetchData() {
        try {
          if (classRoom) return;
          setLoading(true);
          let res = await props.store.apiRequests.getOneClassRoom(props.match.params.id);
          // console.log("res", res);
          props.store.ClassRoomStore.setOneClassRoom(res.data);
        } catch (error) {
          setLoading(false);
          // console.log("mappedClassRooms", error.message);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }, []);

  if (isLoading) {
    return <LoadingProgressPage />
  }

  if (!classRoom) {
    return <Typography className={'text-center !text-4xl !my-20 bg-gray-400 !py-10'}>class room not found</Typography>;
  }

  if (!classRoom.classroom_tasks_info) {
    return <div>
      faild to load tasks
  </div>
  }


  const handleDeleteFunction = async (taskID) => {

    // console.log('delete task ', event)
    console.log('delete task ', taskID)

     const res = await props.store.apiRequests.deleteTask(taskID);
     classRoom.classroom_tasks_info.delete(taskID);


  }
  const handleEditFunction = async (taskID) => {

    console.log('edit task ', taskID)
      setOpenEditForm(true);
      const task =classRoom.classroom_tasks_info.get(taskID);
      setTask(task)

  }
  const  action_menu_items = [
    {
      title:'delete',
      icon:<DeleteForever  fontSize="small"/>,
      action:handleDeleteFunction
    },{
      title:'edit',
      icon:<Edit  fontSize="small"/>,
      action:handleEditFunction
    }
  ];

  return (
    <div className="container m-auto my-20  ">
      <Typography variant="h2" className="!mb-5">
        Task List
        { window.localStorage.getItem("groups") == 1 ?<Tooltip title="Add"   className="!mx-4" aria-label="add" onClick={handleOpen}>
                <Fab color="primary" >
                  <Add />
                </Fab>
        </Tooltip>:"" }

      </Typography>
      <Divider />

      <div className="my-10">
        {   classRoom.classroom_tasks_info.tasks.length> 0?
          classRoom.classroom_tasks_info.sortDescTask().map(
            (taskData , index) => (
              <TaskListItem key={index} action_menu_items={action_menu_items} link={getNextPath(props.history.location.pathname, taskData.id)} taskData={taskData} />
            )
          ):<Typography variant="h4" className="!mb-5 text-center">
          No Task Exist

        </Typography>

        }
      </div>
      <Divider />
      <div className="my-10">
        <EditTask task={task} onClose={handleCloseEditForm} editFormVisible={editForm} />
        <AddTask handleOpen={handleOpen} handleClose={handleClose} open={open} />
      </div>
    </div>
  );
}
export default inject('store')(withRouter(observer(TaskList)));
