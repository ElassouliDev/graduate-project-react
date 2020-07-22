import { Card, Divider } from "@material-ui/core";
import React, { useState } from "react";
import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { CardActions } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { ListItemSecondaryAction } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { Folder } from "@material-ui/icons";
import { ListItemAvatar } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { List } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { useEffect } from "react";
import { Event } from '@material-ui/icons';

export default function UploadFileListItem(props) {



  return (
    <ListItem className="w-full" key={props.file.id}>
      <ListItemAvatar>
        <Avatar>
          <Folder />
        </Avatar>
      </ListItemAvatar>
      <a
        href={props.file.file_path}
        download={props.file.file_name}
      >
        <ListItemText
          primary={props.file.file_name}
          secondary={props.file.created_at}
        />
      </a>
      {props.DeleteShow ?
        (<ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={(event) => props.handDeleteFile(props.file.id)}>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>)
        : ""}

    </ListItem>
  );
}
