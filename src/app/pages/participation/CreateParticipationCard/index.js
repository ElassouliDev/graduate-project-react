import { Typography } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import CreateParticipationForm from '../CreateParticipationForm';
import { Cached } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { Avatar } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { ExpandMore } from '@material-ui/icons';
import { Send } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));
const CreateParticipationCard = (props) => {
  const classes = useStyles();
  const [showForm , setShowForm]= useState(false)

  function handleShowForm  (){
    setShowForm(!showForm);

  }
  return (
    <>
      <Card className={[classes.root, "px-10 p-5"]}>
        <Grid container className={[classes.root]} spacing={2} onClick={handleShowForm}>
          <Grid item md={1}>
            <Avatar src={props.store.User.image} />
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
              <ExpandMore fontSize="large"  onClick={handleShowForm}/>
            </IconButton>
          </Grid>

        </Grid>
      </Card>
      <CreateParticipationForm show={showForm} onClick={handleShowForm} />

    </>
  );
};

export default inject('store')(observer(CreateParticipationCard));
