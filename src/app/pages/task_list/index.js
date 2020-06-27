import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import React, { useEffect, useState, Component } from "react";

import TaskListItem from './component/TaskListItem';
import { Divider } from '@material-ui/core';
import { Typography } from '@material-ui/core';


import { CardActionArea, Button } from "@material-ui/core";
import { Card } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.dense = false;
    this.secondary = false;
    this.taskListData = [{
      teacher: {
        name: "Yehia Elas",
        image:
          "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
      },
      id: 1,
      title: "Task Test2",
      desc:
        "Lizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except Antarctica",
      status: "notSended",
      is_closed: false,
      created_at: "September 14, 2016",


    },{
      teacher: {
        name: "Yehia Elas",
        image:
          "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
      },
      id: 1,
      title: "Task Test3",
      desc:
        "Lizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except Antarctica",
      status: "sended",
      is_closed: true,
      created_at: "September 14, 2016",


    },{
      teacher: {
        name: "Yehia Elas",
        image:
          "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
      },
      id: 1,
      title: "Task Test",
      desc:
        "Lizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except AntarcticaLizards are a widespread group of squamate reptiles, with ove 6,000 species, ranging across all continents except Antarctica",
      status: "sended",
      is_closed: false,
      created_at: "September 14, 2016",


    }];
  }

  componentDidMount() {}

  render() {
    return (
      <div className="container m-auto my-20  ">
        <Typography variant="h2" className="!mb-5">
          Task List
        </Typography>
        <Divider/>
        <div className="my-10">
          {this.taskListData.map((taskData)=><TaskListItem link="/task/1" taskData={taskData}/>
)}
       </div>
      </div>
    );
  }
}
