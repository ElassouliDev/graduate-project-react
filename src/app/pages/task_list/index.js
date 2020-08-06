import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import TaskListItem from "./component/TaskListItem";
import { Divider, Typography } from "@material-ui/core";
import getNextPath from "../../../shared/middleware/getNexPath"
import { observer, inject } from "mobx-react";
import AddTask from "./component/AddTask";

const TaskList = (props) => {
  const classRoom = props.store.ClassRoomStore.getClassRoom(props.match.params.id);
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

  return (
    <div className="container m-auto my-20  ">
      <Typography variant="h2" className="!mb-5">
        Task List
      </Typography>
      <Divider />

      <div className="my-10">
        {
          classRoom.classroom_tasks_info.tasks.map(
            (taskData) => (
              <TaskListItem link={getNextPath(props.history.location.pathname, taskData.id)} taskData={taskData} />
            )
          )
        }
      </div>
      <Divider />
      <div className="my-10">
        <AddTask></AddTask>
      </div>
    </div>
  );
}
export default inject('store')(withRouter(observer(TaskList)));
