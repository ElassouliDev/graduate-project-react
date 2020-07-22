import { Card, Divider, CardHeader } from "@material-ui/core";
import React, { useEffect } from "react";
import { Chip } from '@material-ui/core';
import { Typography } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { CardActionArea } from '@material-ui/core';
import { Avatar } from '@material-ui/core';


export default function TaskListItem(props) {
  useEffect(() => {

  }, []);

  return (
    <Card className="my-20">
      <CardActionArea href={props.link}>
        <CardHeader
          avatar={
            <Avatar
              alt={props.taskData.user_info.username}
              src={props.taskData.user_info.image}
            ></Avatar>
          }
          title={
            <Typography variant="h6" className="!mb-2">
              {props.taskData.user_info.username}
            </Typography>
          }
          subheader={props.taskData.created_at}

          action={<Chip
            className="mt-5"
            size="larg"
            color={props.taskData.is_closed ? "secondary" : "primary"}
            label={<Typography variant="h6" >
              {props.taskData.is_closed ? "closed" : "open"}
            </Typography>}
          />}
        />
        <Divider />

        <CardContent className="!mb-2 p-5">
          <Typography variant="h4" className="!mb-2">
            {props.taskData.title}
          </Typography>

          <Typography variant="h6" className="!my-2">
            {props.taskData.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
