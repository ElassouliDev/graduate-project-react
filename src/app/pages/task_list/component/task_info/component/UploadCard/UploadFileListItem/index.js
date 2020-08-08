import React from "react";

import { Delete } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { ListItemSecondaryAction } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { ListItemAvatar } from "@material-ui/core";
import { ListItem } from "@material-ui/core";

import { Attachment } from '@material-ui/icons';

export default function UploadFileListItem(props) {
console.log('tag', props.file)


  return (
    <ListItem className="w-full" key={props.file.id}>
      <ListItemAvatar>
        <Avatar>
          <Attachment />
        </Avatar>
      </ListItemAvatar>
      <a
        href={props.file.file}
        download={props.file.file}
        target="_blank"
      >
        <ListItemText
          primary={props.file.title}
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
