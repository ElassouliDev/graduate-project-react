import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import TaskListItem from "./component/TaskListItem";
import { Divider, Typography } from "@material-ui/core";
import getNextPath from "../../../shared/middleware/getNexPath"
import { observer, inject } from "mobx-react";
import AddTask from "./component/AddTask";

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
  if (!classRoom) {
    return <div>
      class room not found
  </div>
  }
  if (!classRoom.TaskStore) {
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
        <AddTask></AddTask>
      </div>
      <Divider />
      <div className="my-10">
        {
          classRoom.TaskStore.tasks.map(
            (taskData) => (
              <TaskListItem link={getNextPath(props.history.location.pathname, taskData.id)} taskData={taskData} />
            )
          )
        }
      </div>
    </div>
  );
}
export default inject('store')(withRouter(observer(TaskList)));
