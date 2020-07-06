import { Card, Divider, Button, CardHeader, Paper } from "@material-ui/core";
import React from "react";
import classNames from "classnames";
import { Grid } from "@material-ui/core";
import { Chip } from "@material-ui/core";

import { Typography } from "@material-ui/core";
import { CardContent } from "@material-ui/core";

import { CardActionArea } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import CommentForm from "../CommentList/CommentForm";
import CommentList from '../CommentList';

export default function PostCard(props) {
  return (
    <Card className="my-20">
      <CardHeader
        avatar={
          <Avatar
            alt={props.post.user.name}
            src={props.post.user.image}
          ></Avatar>
        }
        title={
          <Typography variant="h6" className="!mb-2">
            {props.post.user.name}
          </Typography>
        }
        subheader={props.post.created_at}
      />
      <Divider />

      <CardContent className="!mb-2 p-5">
        <Typography variant="h6" className="!my-2">
          {props.post.content}
        </Typography>
      </CardContent>

      <Divider />
        <CommentList comments={props.post.comments} user={props.user}/>

      {/* <div className={"px-10 py-10   "}>
        <Grid row container className=" mb-10 ">
          <Grid item md={1}>
            <Avatar
              alt={props.post.user.name}
              src={props.post.user.image}
            ></Avatar>
          </Grid>
          <Grid item md={11}>
            <Paper elevation={3} className="p-10">
              <Typography variant="h6" className="!my-2">
                {props.post.content}
              </Typography>

              {/* <CommentForm post_id={1} /> */}
           {/*} </Paper>
          </Grid>
        </Grid>


        <Grid row container className=" mb-10 ">
          <Grid item md={1}>
            <Avatar
              alt={props.post.user.name}
              src={props.post.user.image}
            ></Avatar>
          </Grid>
          <Grid item md={11}>
            <Paper elevation={3} className="p-10">
              <Typography variant="h6" className="!my-2">
                {props.post.content}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
     */}
    </Card>
  );
}
