import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import getConfig from "../../config";
import axios from "axios";
import classNames from "classnames";
import { Chip } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { CardHeader } from "@material-ui/core";
import { Typography, Card, CardActionArea } from "@material-ui/core";
import { Security } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import ListUserChat from "./components/list-user-chat";
import ChatMessages from './components/chatCard';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));
export default function Chat(props) {
  let { slug } = useParams();
  // const [data, setData] = useState({ post: {} });
  const classes = useStyles();
  const [listUser,setListUser] = useState([
    {
      chat_id: 1,
      name: "Yehia Elas",
      image:
        "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
    },{
      chat_id: 1,
      name: "Yehia Elas",
      image:
        "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
    },{
      chat_id: 1,
      name: "Yehia Elas",
      image:
        "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
    },{
      chat_id: 4,
      name: "Yehia Elas",
      image:
        "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
    },{
      chat_id: 1,
      name: "Yehia Elas",
      image:
        "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
    },{
      chat_id: 1,
      name: "Yehia Elas",
      image:
        "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
    },
  ]);


  const [chatMessages,setChatMessages] = useState(
    {
      chat_id: 4,
      messages : [
        {
          id:1,
          messages:"test message ",
          user:{
            id: 1,
            name: "Yehia Elas",
            image:
              "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",

          }

        }, {
          id:1,
          messages:"test message ",
          user:{
            id: 1,
            name: "Yehia Elas",
            image:
              "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",

          }

        }, {
          id:1,
          messages:"test message ",
          user:{
            id: 2,
            name: "Yehia Elas",
            image:
              "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",

          }

        }, {
          id:1,
          messages:"test message ",
          user:{
            id: 1,
            name: "Yehia Elas",
            image:
              "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",

          }

        }, {
          id:1,
          messages:"test message ",
          user:{
            id: 2,
            name: "Yehia Elas",
            image:
              "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",

          }

        }, {
          id:1,
          messages:"test message ",
          user:{
            id: 1,
            name: "Yehia Elas",
            image:
              "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",

          }

        }, {
          id:1,
          messages:"test message ",
          user:{
            id: 1,
            name: "Yehia Elas",
            image:
              "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",

          }

        },
      ]

    }
  );


  const handleChatMessages = (data) =>{
console.log(data)
  }

  return (
    <div>
      {/* <Typography variant="h4" className="!my-2 !mt-5">
        Information Security
      </Typography>
      <Typography variant="h6" className="!my-2">
        desc desc desc desc
      </Typography> */}

      <Grid container className={[classes.root, "pt-2"]} spacing={2}>
        <Grid item xs={4} sm={4} md={3} lg={2}>
          <ListUserChat listUser={listUser} chat_id={chatMessages.chat_id}/>
            </Grid>

        <Grid item xs={8} sm={8} md={9}>


          <ChatMessages chat={chatMessages}/>
        </Grid>
      </Grid>
    </div>
  );
}
