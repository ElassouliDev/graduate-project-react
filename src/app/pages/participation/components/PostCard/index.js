import React from "react";
import { Card, Divider, CardHeader, Paper, Grid } from "@material-ui/core";
import { CardContent, Typography, Avatar } from "@material-ui/core";
import CommentList from '../CommentList';
import { inject, observer } from "mobx-react";
import CommentForm from "../CommentList/CommentForm";

function PostCard(props) {
  const { post, store } = props
  return (
    <Card className="my-20">
      <CardHeader
        avatar={
          <Avatar
            alt={post.createdBy.username}
            src={post.createdBy.image}
          ></Avatar>
        }
        title={
          <Typography variant="h6" className="!mb-2">
            {post.createdBy.username}
          </Typography>
        }
        subheader={post.created_at}
      />
      <Divider />

      <CardContent className="!mb-2 p-5">
        <Typography variant="h6" className="!my-2">
          {post.content}
        </Typography>
      </CardContent>

      <Divider />
      <CommentList post={post} comments={post.comments} />
      {/* 
      <div className={"px-10 py-10   "}>
        <Grid row container className=" mb-10 ">
          <Grid item md={1}>
            <Avatar
              alt={"user image goes here"}
              src={"post.user.image"}
            ></Avatar>
          </Grid>
          <Grid item md={11}>
            <Paper elevation={3} className="p-10">
              <Typography variant="h6" className="!my-2">
                {post.content}
              </Typography>

              <CommentForm post_id={1} />
            </Paper>
          </Grid>
        </Grid>
        <Grid row container className=" mb-10 ">
          <Grid item md={1}>
            <Avatar
              alt={"post.createdBy.username"}
              src={"post.user.image"}
            ></Avatar>
          </Grid>
          <Grid item md={11}>
            <Paper elevation={3} className="p-10">
              <Typography variant="h6" className="!my-2">
                {post.content}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div> */}

    </Card>
  );
}
export default inject('store')(observer(PostCard))