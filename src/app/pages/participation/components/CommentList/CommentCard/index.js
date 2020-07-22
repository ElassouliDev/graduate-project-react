import React from "react";
import { Typography, Grid, Avatar, Paper } from "@material-ui/core";

export default function CommentCard(props) {
  return (
    <Grid row container className=" mb-10 ">
      <Grid item md={1}>
        <Avatar
          alt={props.comment.user_info.fullName}
          src={props.comment.user_info.image}
        ></Avatar>
      </Grid>
      <Grid item md={11}>
        <Paper elevation={3} className="">

        <Typography variant="h6" className="!px-3 py-5">
            {props.comment.user_info.fullName}
          </Typography>
          <hr/>
          <Typography variant="h6"className="!my-2 p-10" >
            {props.comment.content}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
