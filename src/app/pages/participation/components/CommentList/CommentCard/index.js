import { Card, Divider, Button, CardHeader, Paper } from "@material-ui/core";
import React from "react";
import classNames from "classnames";
import { Grid } from "@material-ui/core";
import { Chip } from "@material-ui/core";

import { Typography } from "@material-ui/core";
import { CardContent } from "@material-ui/core";

import { Avatar } from "@material-ui/core";

export default function CommentCard(props) {
  return (

        <Grid row container className=" mb-10 ">
          <Grid item md={1}>
            <Avatar
              alt={props.comment.user.name}
              src={props.comment.user.image}
            ></Avatar>
          </Grid>
          <Grid item md={11}>
            <Paper elevation={3} className="p-10">
              <Typography variant="h6" className="!my-2">
                {props.comment.content}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
  );
}
