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
import MyInput from "../../../../shared/components/formasy-input";
import Formsy from "formsy-react";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  inputRoot:{
    fontSize:'2rem'
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
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
            <Avatar src={props.store.User.image} className={classes.large} />
          </Grid>
          <CreateParticipationForm show={showForm} onClick={handleShowForm} />




        </Grid>
      </Card>

    </>
  );
};

export default inject('store')(observer(CreateParticipationCard));
