import React from "react";
import { Card, Divider, CardHeader, Paper, Grid } from "@material-ui/core";
import { CardContent, Typography, Avatar } from "@material-ui/core";
import CommentList from '../CommentList';
import { inject, observer } from "mobx-react";
import CommentForm from "../CommentList/CommentForm";

function PostCard(props) {
  const { post, store } = props
  console.log('psot', post.toJSON());
  return (
    <Card className="my-20">
      <CardHeader
        avatar={
          <Avatar
            alt={post.user_info.fullName}
            src={post.user_info.image}
          ></Avatar>
        }
        title={
          <Typography variant="h6" className="!mb-2">
            {post.user_info.fullName}
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


    </Card>
  );
}
export default inject('store')(observer(PostCard))