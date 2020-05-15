import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { CardActionArea } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React from "react";
import { CardActions } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));
const ShowVideo = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {/* <CardActionArea> */}
      <CardContent>
        {/* <Typography variant="h4" color="textSecondary" component="h4">
            Tasks required soon
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            There is no task right now.
          </Typography> */}
        <iframe
          id="video"
          width="100%"
          // heigh="1000"
          src={"https://www.youtube.com/embed/" + "?autoplay=1"}
          style={{ height: "400px" }}
          frameBorder="1"
          allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </CardContent>
      <CardContent>
        <Typography variant="h2" component="h2">
          Learn Java Script
        </Typography>
        <Typography variant="h6" component="p">
          There is no task right now. There is no task right now. There is no
          task right now. There is no task right now.
        </Typography>
      </CardContent>
      {/* </CardActionArea> */}
    </Card>
  );
};

export default ShowVideo;
