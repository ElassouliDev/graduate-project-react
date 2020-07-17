import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames";
import { Chip } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { CardHeader } from "@material-ui/core";
import { Typography, Card, CardActionArea } from "@material-ui/core";
import { Security } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 500,
    overflow: "scroll",
  },
}));
export default function ListUserChat(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} >
      {props.listUser.map((user) => (
        <CardActionArea className="my-2 !p-2 ">
          <Grid spacing={2} className="pb-2 border-b">
            <CardHeader
              avatar={<Avatar alt={user.name} src={user.image}></Avatar>}
              className="!p-0"
              title={
                <Typography variant="h6" className="!mb-2">
                  {user.name}
                </Typography>
              }
            />
          </Grid>
        </CardActionArea>
      ))}



    </Card>
  );
}
