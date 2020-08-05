import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import TaskListItem from "./component/TaskListItem";
import { Divider, Typography } from "@material-ui/core";
import getNextPath from "../../../shared/middleware/getNexPath"
import { observer, inject } from "mobx-react";
import AddTask from "./component/AddTask";
import { Fab } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import { DeleteForever, Add } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  labelRoot: {
    fontSize: "1.75rem",
  },
  inputRoot: {
    fontSize: "1.75rem",
  },
  containedSizeLarge: {
    fontSize: "1.75rem",
  },
}));
const TaskList = (props) => {
  const classRoom = props.store.ClassRoomStore.getClassRoom(props.match.params.id);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }
  React.useEffect(
    () => {
      async function fetchData() {
        try {
          if (classRoom)
            return
          let res = await props.store.apiRequests.getOneClassRoom(props.match.params.id);
          console.log("res", res);
          props.store.ClassRoomStore.setOneClassRoom(res.data);
        } catch (error) {
          console.log("mappedClassRooms", error.message);
        }
      }
      fetchData();
    }, []);
  if (!classRoom) {
    return <Typography>class room not found</Typography>;
  }
  if (!classRoom) {
    return <div>
      class room not found
  </div>
  }
  if (!classRoom.classroom_tasks_info) {
    return <div>
      faild to load tassks
  </div>
  }


  const handleDeleteFunction = async (taskID) => {

    // console.log('delete task ', event)
    console.log('delete task ', taskID)

     const res = await props.store.apiRequests.deleteTask(taskID);
     classRoom.classroom_tasks_info.delete(taskID);


  }
  const  action_menu_items = [
    {
      title:'delete',
      icon:<DeleteForever  fontSize="small"/>,
      action:handleDeleteFunction
    }
  ];

  return (
    <div className="container m-auto my-20  ">
      <Typography variant="h2" className="!mb-5">
        Task List
        <Tooltip title="Add"   className="!mx-4" aria-label="add" onClick={handleOpen}>
                <Fab color="primary" >
                  <Add />
                </Fab>
              </Tooltip>
      </Typography>
      <Divider />

      <div className="my-10">
        {   classRoom.classroom_tasks_info.tasks.length> 0?
          classRoom.classroom_tasks_info.tasks.map(
            (taskData) => (
              <TaskListItem action_menu_items={action_menu_items} link={getNextPath(props.history.location.pathname, taskData.id)} taskData={taskData} />
            )
          ):<Typography variant="h4" className="!mb-5 text-center">
          No Task Exist

        </Typography>

        }
      </div>
      <Divider />
      <div className="my-10">
        <AddTask handleOpen={handleOpen} handleClose={handleClose} open={open}></AddTask>
      </div>
    </div>
  );
}
export default inject('store')(withRouter(observer(TaskList)));
