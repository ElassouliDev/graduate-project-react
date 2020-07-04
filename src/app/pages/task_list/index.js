import { makeStyles } from "@material-ui/core/styles";
import { useParams, withRouter } from "react-router-dom";
import React, { useEffect, useState, Component } from "react";

import TaskListItem from "./component/TaskListItem";
import { Divider } from "@material-ui/core";
import { Typography } from "@material-ui/core";

import { CardActionArea, Button } from "@material-ui/core";
import { Card } from "@material-ui/core";
import getNextPath from "../../../shared/middleware/getNexPath"
import { observer, inject } from "mobx-react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
        {
          classRoom.TaskStore.tasks.map((taskData) => (
            <TaskListItem link={getNextPath(props.history.location.pathname, taskData.id)} taskData={taskData} />
          ))}
      </div>
    </div>
  );
}
export default inject('store')(observer(withRouter(TaskList)));
