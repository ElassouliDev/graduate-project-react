import { Card, Divider, Button, CardHeader, Paper } from "@material-ui/core";
import React from "react";
import classNames from "classnames";
import { Grid } from "@material-ui/core";
import { Chip } from "@material-ui/core";

import { Typography } from "@material-ui/core";
import { CardContent } from "@material-ui/core";

import { CardActionArea } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';

export default function CommentList(props) {
  return (
      <div className={"px-10 py-10   "}>
        <CommentForm  user={props.user}/>
             {props.comments?

                        props.comments.map((comment)=>
                        <CommentCard comment = {comment}/>
                        )

        :""  }

      </div>
  );
}
