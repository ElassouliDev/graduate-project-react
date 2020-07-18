import { CardActions, Button, Typography, CardContent, CardActionArea, Card, makeStyles } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));
const CardTask = props => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h4" color="textSecondary" component="h4">
            Tasks required soon
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            There is no task right now.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="m-5 mt-20 float-right">
        <Button
          size="large"
          variant="contained"
          color="primary"
          href={props.link ? props.link : "#"}
        >
          Show All
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardTask;
