import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import React, { useEffect, useState, Component } from "react";
import getConfig from "../../config";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import CardTask from "../../../shared/components/task-card";
import CreateParticipationCard from "../../../shared/components/Participation/CreateParticipationCard";
import CustomClassroomLayout from "../../../shared/components/custom-classroom-layout";
import classNames from "classnames";
import UploadCard from "./component/UploadCard";
import UploadFileListItem from "./component/UploadCard/UploadFileListItem";
import { Avatar } from "@material-ui/core";
import { CardContent, CardHeader } from "@material-ui/core";
import { Folder } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { ListItemSecondaryAction } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { ListItemAvatar } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { List } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Fab } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardActionArea, Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Card } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default class TaskInfo extends Component {
  constructor(props) {
    super(props);
    this.dense = false;
    this.secondary = false;
    this.taskData = {
      teacher: {
        name: "Yehia Elas",
        image:
          "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
      },
      title: "Task Test",
      desc:
        "Lizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except Antarctica",
      created_at: "Yehia Elas",
      status: "sended",
      is_closed: false,
      created_at: "September 14, 2016",
      taskFile: [
        /// this  list of files that sended by teacher to the task
        {
          id: 1,
          file_name: "file task",
          file_path: "https://i.ytimg.com/vi/0KEv38tAWm4/maxresdefault.jpg",
        },
        {
          id: 2,
          file_name: "file task",
          file_path: "https://i.ytimg.com/vi/0KEv38tAWm4/maxresdefault.jpg",
        },
      ],
      sended_file: [
        /// this  list of solution that sended by user
        {
          id: 1,
          file_name: "file test",
          file_path: "https://i.ytimg.com/vi/0KEv38tAWm4/maxresdefault.jpg",
          created_at: "6/6/2020",
        },
        {
          id: 2,
          file_name: "file test",
          file_path: "https://i.ytimg.com/vi/0KEv38tAWm4/maxresdefault.jpg",
          created_at: "6/6/2020",
        },
        {
          id: 3,
          file_name: "file test",
          file_path: "https://i.ytimg.com/vi/0KEv38tAWm4/maxresdefault.jpg",
          created_at: "6/6/2020",
        },
        {
          id: 4,
          file_name: "file test",
          file_path: "https://i.ytimg.com/vi/0KEv38tAWm4/maxresdefault.jpg",
          created_at: "6/6/2020",
        },
      ],
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div >
        <Grid container className={["py-12"]} spacing={2}>
          <Grid item xs={12} sm={8} md={9}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar
                    alt={this.taskData.teacher.name}
                    src={this.taskData.teacher.image}
                  ></Avatar>
                }
                title={this.taskData.teacher.name}
                subheader={this.taskData.created_at}
              />
              <Divider />

              <CardContent className="!mb-2 p-5">
                <Typography variant="h6" className="!mb-2">
                  {this.taskData.desc}
                </Typography>

                <List>
                  {this.taskData.taskFile.map((file) => (
                    <UploadFileListItem file={file} DeleteShow={false} />
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <UploadCard files={this.taskData.sended_file} />
          </Grid>
        </Grid>
      </div>
    );
  }
}
