import { Card, Divider, CardHeader } from "@material-ui/core";
import React, { useEffect } from "react";
import TableActionMenu from '../../../../../shared/components/table-menu';
import { Chip } from '@material-ui/core';
import { Typography } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { CardActionArea } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { Link } from "react-router-dom";


export default function TaskListItem(props) {



  useEffect(() => {

  }, []);

  return (
    <Card className="my-20">
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

          action={
          <>
          <Chip
            className="mt-5 "
            size="medium"
            color={!props.taskData.accept_solutions ? "secondary" : "primary"}
            label={<Typography variant="h6" >
              {!props.taskData.accept_solutions ? "closed" : "open"}
            </Typography>}
          />
             { window.localStorage.getItem("groups") == 1 ? <TableActionMenu styles={{ float: 'right',paddingTop: 10, margin: '0px 20px'}} items={props.action_menu_items} item_id={props.taskData.id} />:""}
          </>
          }
        />
        <Divider />
        <Link to={props.link}>
        <CardActionArea >

        <CardContent className="!mb-2 p-5">
          <Typography variant="h4" className="!mb-2">
            {props.taskData.title}
          </Typography>

          <Typography variant="h6" className="!my-2">
            {props.taskData.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      </Link>
    </Card>
  );
}
