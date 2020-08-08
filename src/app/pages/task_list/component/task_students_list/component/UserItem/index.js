import { Card, Divider, Button, CardHeader } from "@material-ui/core";
import React from "react";
import classNames from 'classnames';
import { Visibility } from '@material-ui/icons';
import { CloudDownload } from '@material-ui/icons';
import { Chip } from '@material-ui/core';

import { Typography } from "@material-ui/core";
import { CardContent } from "@material-ui/core";

import { CardActionArea } from '@material-ui/core';
import { Avatar } from '@material-ui/core';


export default function UserItem(props) {

  return (
    <Card className="my-5">
      <CardHeader
        avatar={
          <Avatar
            alt={props.student.username}
            src={props.student.image}
          ></Avatar>
        }
        title={
          <Typography variant="h5" className="!mb-2">
            {props.student.username}
          </Typography>
        }
        subheader={props.student.created_at}

        action={
          props.hasSolution ?
            <a
              href={`/Room/${props.classroom.id}/tasks/${props.task.id}/?user_id=${props.student.id}`}
            >
              <Visibility
                color="primary"
                size="larg"
                className="mt-8  mx-20"
              />
            </a>
            : ""

        }
      />

    </Card>
  );
}
