import React from "react";
import { Typography, Grid, Avatar, Paper } from "@material-ui/core";

export default function CommentCard(props) {
  return (
    <Grid row container className=" mb-10 ">
      <Grid item md={1}>
        <Avatar
          alt={props.comment.commenter?.user.name}
          src={props.comment.commenter?.image}
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
