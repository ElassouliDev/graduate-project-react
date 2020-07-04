import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState, Component } from "react";
import Grid from "@material-ui/core/Grid";
import UploadCard from "./component/UploadCard";
import UploadFileListItem from "./component/UploadCard/UploadFileListItem";
import { Avatar } from "@material-ui/core";
import { CardContent, CardHeader } from "@material-ui/core";
import { List } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";
import TaskStudentsList from "../task_students_list"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const TaskInfo = (props) => {
  const classRoom = props.store.ClassRoomStore.getClassRoom(props.match.params.id);
  if (!classRoom) {
    return <div>
      class room not found
  </div>
  }
  if (!classRoom.TaskStore) {
    return <div>
      faild to load tasks
  </div>
  }
  const Task = classRoom.TaskStore.get(props.match.params.tId)
  if (!Task) {
    return <div>
      faild to load task
  </div>
  }
  return (
    <div >
      <Grid container className={["py-12"]} spacing={2}>
        <Grid item xs={12} sm={8} md={9}>
          <Card>
            <CardHeader
              avatar={
                <Avatar
                  alt={Task.User.name}
                  src={Task.User.image}
                ></Avatar>
              }
              title={Task.User.name}
              subheader={Task.created_at}
            />
            <Divider />

            <CardContent className="!mb-2 p-5">
              <Typography variant="h6" className="!mb-2">
                {Task.description}
              </Typography>

              <List>
                <UploadFileListItem file={Task.taskFile} DeleteShow={false} />
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4} md={3}>
          <UploadCard files={Task.SubmittedSolutions} />
        </Grid>
        <Grid container xs={12} sm={12} md={12}>
          <TaskStudentsList></TaskStudentsList>
        </Grid>
      </Grid>
    </div>
  );
}
export default inject('store')(observer(withRouter(TaskInfo)));