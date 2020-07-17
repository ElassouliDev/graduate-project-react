import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames";
import { Chip } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { CardHeader } from "@material-ui/core";
import { Typography, Card, CardActionArea } from "@material-ui/core";
import { Security } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import ChatFrom from "../ChatFrom";
const useStyles = makeStyles((theme) => ({
  root: {
    height: 500,
    overflow: "scroll",
    padding: "1rem",
  },
  messagesRoot: {
    height: "90%",
    overflow: "scroll",
    marginBottom: "1rem",
    padding: "1rem 2rem",
  },
  avatar:{
    marginLeft: "-6px !important",
    marginRight: "5px !important"
  },
  rtl:{
      direction:"rtl"
  }
}));
export default function ChatMessages(props) {
  const classes = useStyles();
  const auth_user_id = 1;

  return (
    <Card className={classes.root}>
      <Card className={classes.messagesRoot}>
          {props.chat.messages.map(chat_message =>
            <div className={classNames("mb-1 clearfix",auth_user_id == chat_message.user.id? classes.rtl:"")}>
          <Chip

             avatar={<Avatar alt="Natacha" src={chat_message.user.image} className={auth_user_id == chat_message.user.id? classes.avatar:""} />}
            label={chat_message.messages}
            className={auth_user_id == chat_message.user.id? "float-right ":""}
            color={auth_user_id == chat_message.user.id? "primary":"secondry"}

          />
        </div>
          )}

      </Card>

      <ChatFrom />
    </Card>
  );
}
