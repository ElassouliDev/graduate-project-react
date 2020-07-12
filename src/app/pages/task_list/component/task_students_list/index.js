import { makeStyles } from "@material-ui/core/styles";
import { useParams, withRouter } from "react-router-dom";
import React, { useEffect, useState, Component, Fragment } from "react";

import UserItem from "./component/UserItem";
import classNames from "classnames";
import { Chip } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { CardContent, CardHeader, Grid } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { Typography } from "@material-ui/core";

import { CardActionArea, Button } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { inject, observer } from "mobx-react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const TaskStudentsList = (props) => {
  const [studentType, setStudentType] = useState("1");
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
    <Fragment>
      <Grid item md={3}>
        <Typography variant="h4" className="!mb-5">
          Student who submited a solution
            <Chip
            className="mx-5 !px-5 !text-lg"
            size="medium"
            label={
              Task.getStudentsWhoAnswered.length +
              " / " +
              Task.students.length
            }
          />
        </Typography>

        {
          Task.getStudentsWhoAnswered.map(
            (createdAt) => {
              return <UserItem
                student={createdAt}
                key={createdAt.id + createdAt.username}
              />
            }
          )
        }
      </Grid>
      <Divider />
      <Grid item md={3}>
        <Typography variant="h4" className="!mb-5">
          Student who didn't submited a solution
              <Chip
            className="mx-5 !px-5 !text-lg"
            size="medium"
            label={
              Task.getStudentsWhoDidntAnswered.length
              + " / " +
              Task.students.length
            }
          />
        </Typography>
        {
          Task.getStudentsWhoDidntAnswered.map(
            (createdAt) => {
              return <UserItem
                student={createdAt}
                key={createdAt.id + createdAt.username}
              />
            }
          )
        }
      </Grid>
    </Fragment>
  );
}
export default inject('store')(observer(withRouter(TaskStudentsList)));