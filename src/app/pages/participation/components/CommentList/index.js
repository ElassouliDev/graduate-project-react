import { Card, Divider, Button, CardHeader, Paper } from "@material-ui/core";
import React from "react";
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';
import { observer } from "mobx-react";

function CommentList({ comments, post }) {
  return (
    <div className="px-10 py-10">
      <CommentForm post={post} />
      {comments ?
        comments.map((comment) =>
          <CommentCard comment={comment} />
        )
        : ""}

    </div>
  );
}

export default observer(CommentList)