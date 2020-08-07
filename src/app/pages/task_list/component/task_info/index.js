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
import AttachmentIcon from '@material-ui/icons/Attachment';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const TaskInfo = (props) => {
  const classRoom = props.store.ClassRoomStore.getClassRoom(props.match.params.id);

  const Task = classRoom ? classRoom.classroom_tasks_info.get(props.match.params.tId) : {}

  useEffect(
    () => {
      async function fetchData() {
        try {
          let res = await props.store.apiRequests.getClassRooms();
          console.log("res", res);
          props.store.ClassRoomStore.setClassRooms(res.data);

        } catch (error) {
          console.log("mappedClassRooms", error.message);
        }
      }
      fetchData();
    }, []);


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
  return (
    <div >
      <Grid container className={["py-12"]} spacing={2}>
        <Grid item xs={12} sm={8} md={9}>
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
                    Task.attachments_info.map(att => <a download href={att.file}>
                      {att.title}
                      <AttachmentIcon />

                    </a>) :
                    // Task.attachments_info.map(file => <UploadFileListItem file={file} DeleteShow={false} />) :
                    "there is no attachments"
                }
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4} md={3}>
          <UploadCard files={Task.SubmittedSolutions} />
        </Grid>
        <Grid container xs={12} sm={12} md={12}>
          {/* <TaskStudentsList></TaskStudentsList> */}
        </Grid>
      </Grid>
    </div>
  );
}
export default inject('store')(withRouter(observer(TaskInfo)));