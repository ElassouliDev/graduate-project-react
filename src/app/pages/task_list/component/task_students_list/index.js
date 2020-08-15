import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import React, { useState, Fragment } from "react";

import UserItem from "./component/UserItem";
import { Chip } from "@material-ui/core";

import { Grid } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { Typography } from "@material-ui/core";

import { inject, observer } from "mobx-react";
import LoadingProgressPage from "../../../../../shared/components/loading-progress-page";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const TaskStudentsList = (props) => {

  const [isLoaded, setIsLoaded] = useState(false);
  const [studentType, setStudentType] = useState("1");
  const classRoom = props.store.ClassRoomStore.getClassRoom(props.match.params.id);
  const [isLoading, setLoading] = useState(false);

  React.useEffect(
    () => {
      if (classRoom) return;

      async function fetchData() {
        try {
          if (!classRoom) {
            setLoading(true);
            let res = await props.store.apiRequests.getOneClassRoom(props.match.params.id);
            console.log("res", res);
            props.store.ClassRoomStore.setOneClassRoom(res.data);
          }
        }
        catch {
          setLoading(false);
        } finally {
          setLoading(false);
        }
      }
      fetchData()
    })
  React.useEffect(
    () => {
      async function fetchData() {
        try {
          if (!classRoom) return;
          setLoading(true);
          let task_temp = classRoom.classroom_tasks_info.get(props.match.params.tId)

          if (!task_temp)
            return
          if (isLoaded)
            return
          let undelivered_students = await props.store.apiRequests.UndeliveredStudentsAnswerTask(props.match.params.tId);
          let delivered_students = await props.store.apiRequests.deliveredStudentsAnswerTask(props.match.params.tId);
          console.log("undelivered_students ", undelivered_students);
          console.log("delivered_students  ", delivered_students);
          task_temp.setNewData({ 'key': 'undelivered_students', 'value': undelivered_students.data })
          task_temp.setNewData({ 'key': 'delivered_students', 'value': delivered_students.data })
          setIsLoaded(true)
          //  task_temp['undelivered_students'] = undelivered_students.data;
          //  task_temp['delivered_students'] = delivered_students.data;

          console.log('data ', task_temp)
          console.log(classRoom.classroom_tasks_info.editTask(task_temp));


        } catch (error) {
          setLoading(false);
          console.log("mappedClassRooms", error.message);
        } finally {
          setLoading(false);
        }
      }
      fetchData();

    });

  if (isLoading) {
    return <LoadingProgressPage />
  }

  if (!classRoom) {
    return <div>
      class room not found
      </div>

  }
  if (!classRoom.classroom_tasks_info) {
    return <div>
      faild to load tasks
      </div>
  }




  const Task = classRoom.classroom_tasks_info.get(props.match.params.tId)
  console.log('task', Task)
  if (!Task) {
    return <div>
      faild to load task
</div>
  }

  return (
    <Fragment>
      <Grid item md={12}>
        <Typography variant="h4" className="!mb-5 pt-10 pb-5">
          Student who submited a solution
            <Chip
            className="mx-5 !px-5 !text-lg"
            size="medium"
            label={
              Task.delivered_students.length +
              " / " + (Task.delivered_students.length + Task.undelivered_students.length)
            }
          />
        </Typography>

        {
          Task.delivered_students.map(
            (student) => {
              return <UserItem
                student={student}
                key={student.id}
                hasSolution={true}
                classroom={classRoom}
                task={Task}

              />
            }
          )
        }
      </Grid>
      <Divider />
      <Grid item md={12}>
        <Typography variant="h4" className="!mb-5 pt-10 pb-5">
          Student who didn't submited a solution
              <Chip
            className="mx-5 !px-5 !text-lg"
            size="medium"
            label={
              Task.undelivered_students.length +
              " / " + (Task.delivered_students.length + Task.undelivered_students.length)

            }
          />
        </Typography>

        {
          Task.undelivered_students.map(
            (student) => {
              return <UserItem
                student={student}
                key={student.id}
                classroom={classRoom}
                task={Task}
              />
            }
          )
        }
      </Grid>
    </Fragment>
  );
}
export default inject('store')(withRouter(observer(TaskStudentsList)));
