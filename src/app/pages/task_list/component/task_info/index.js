import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState, Component } from "react";
import Grid from "@material-ui/core/Grid";
import UploadCard from "./component/UploadCard";
import { Avatar } from "@material-ui/core";
import { CardContent, CardHeader } from "@material-ui/core";
import { List } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { withRouter, useLocation } from "react-router";
import { Chip } from '@material-ui/core';
import AttachmentIcon from '@material-ui/icons/Attachment';
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const TaskInfo = (props) => {
  const classRoom = props.store.ClassRoomStore.getClassRoom(props.match.params.id);
  const [isLoaded, setIsLoaded] = useState(false);

  const Task = classRoom ? classRoom.classroom_tasks_info.get(props.match.params.tId) : {}
  const query  =  useQuery();

  useEffect(
    () => {
      async function fetchData() {
        try {
          if (classRoom)
          return
        let res = await props.store.apiRequests.getOneClassRoom(props.match.params.id);
        console.log("res", res);
        props.store.ClassRoomStore.setOneClassRoom(res.data);

        } catch (error) {
          console.log("mappedClassRooms 1 ", error.message);
        }
      }
      fetchData();
    }, []);

    React.useEffect(
      () => {
        async function fetchData() {
          try {
            if (!classRoom)
              return

            let task_temp = classRoom.classroom_tasks_info.get(props.match.params.tId)

            if (!task_temp)
              return
            if (isLoaded)
              return
            if (Task.task_solutions.length>0)
              return
            let solutions = await props.store.apiRequests.taskSolution(props.match.params.tId);
            task_temp.setNewData({ 'key': 'task_solutions', 'value': solutions.data })
            setIsLoaded(true)

          //  classRoom.classroom_tasks_info.editTask(task_temp)
            console.log('data ss ', Task.task_solutions.getUserSolution(5))

          } catch (error) {
            console.log("mappedClassRooms 2", error.message);
          }
        }
        fetchData();

      });

  if (!classRoom) {
    return <div>
      class room not found
  </div>
  }
  if (!Task) {
    return <div>
      faild to load task
  </div>
  }






  const user_id =window.localStorage.getItem("groups") != 1?window.localStorage.getItem("id")   :  query.has("user_id")?query.get("user_id"):0;
  const userSolutions = Task.task_solutions && Task.task_solutions.getUserSolution(5)?Task.task_solutions.getUserSolution(5).solutionInfo:[];
  const accepted = Task.task_solutions && Task.task_solutions.getUserSolution(5)?Task.task_solutions.getUserSolution(5).accepted:null;


  return (
    <div >
      <Grid container className={["py-12"]} spacing={2}>
        <Grid item xs={12} sm={user_id != 0?8:12} md={user_id != 0?9:12}>
          <Card>
            <CardHeader
              avatar={
                <Avatar
                  alt={<Typography variant="h6" className="!mb-2 !text-3xl">
                  {Task.user_info.fullName }
              </Typography>}
                  src={Task.user_info.image}
                ></Avatar>
              }
              action={<>
                <Chip
            className="mt-5 "
            size="larg"
            color={!Task.accept_solutions ? "secondary" : "primary"}
            label={<Typography variant="h6" >
              {!Task.accept_solutions ? "closed" : "open"}
            </Typography>}
          />
              {window.localStorage.getItem("groups") == 1?<Link to={`/Room/${classRoom.id}/tasks/${Task.id}/student` }>

<Chip label={ <Typography variant="h6" className="!p-2 !text-3xl">
                  Show Students
              </Typography>} color="primary" />
              </Link>:""}

              </>
              }
              title={<Typography variant="h5" className="!mb-2 !text-3xl">
              {Task.user_info.fullName }
          </Typography>}
              subheader=
              {Task.created_at }

            />
            <Divider />

            <CardContent className="!mb-2 p-5">
              <Typography variant="h3" className="!mb-2">
                {Task.title}
              </Typography>
              <Typography variant="p" className="!mb-2 lead !text-3xl">
                {Task.content}
                </Typography>

              <List>
                 {
                  Task.attachments_info.length > 0 ?
                    Task.attachments_info.map(att =><><a  className={'!py-2 block'} download href={att.file} target="_blanck">
                                           <AttachmentIcon />
 {att.title}



                    </a> <Divider></Divider></>) :
                    // Task.attachments_info.map(file => <UploadFileListItem file={file} DeleteShow={false} />) :
                    "there is no attachments"
                }
              </List>
            </CardContent>
          </Card>
        </Grid>


      {user_id != 0 ? <Grid item xs={12} sm={4} md={3}>
          <UploadCard files={userSolutions}  accepted={accepted} task={Task}/>
        </Grid>:""
        }
        {/* <Grid container xs={12} sm={12} md={12}>
           <TaskStudentsList></TaskStudentsList>
        </Grid> */}
      </Grid>
    </div>
  );
}
export default inject('store')(withRouter(observer(TaskInfo)));