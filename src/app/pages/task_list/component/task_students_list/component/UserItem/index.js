import { Card, Divider, Button, CardHeader } from "@material-ui/core";
import React from "react";
import classNames from 'classnames';
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
          props.student.taskFile ?
            <a
              href={props.student.taskFile.file_path}
              download={props.student.taskFile.file_name}
            >
              <CloudDownload
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
