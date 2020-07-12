import { Typography } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React from "react";
import CreateParticipationForm from '../CreateParticipationForm';
import { Cached } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { Avatar } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { inject, observer } from "mobx-react";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));
const CreateParticipationCard = (props) => {
  const classes = useStyles();

  return (
    <>
      <Card className={[classes.root, "px-10 p-5"]}>
        <Grid container className={[classes.root]} spacing={2}>
          <Grid item md={1}>
            <Avatar src={props.store.LoginStore.image} />
          </Grid>

          <Grid item md={10}>
            <Typography
              variant="h4"
              className={"leading-10 pt-3 "}
              color="textSecondary"
              component="h4"
            >
              Share with your friends
          </Typography>
          </Grid>

          <Grid item md={1}>
            <IconButton>
              <Cached fontSize="large" />
            </IconButton>
          </Grid>

        </Grid>
      </Card>
      <CreateParticipationForm />

    </>
  );
};

export default inject('store')(observer(CreateParticipationCard));
