import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from 'classnames';
import { Event } from '@material-ui/icons';
import { Send } from '@material-ui/icons';
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
}));

export default function ChatFrom(props) {
  const  classes  = useStyles();
  const  [message, setMessage]   = useState('');
  const  [enableBotton, setEnableBotton]   = useState(false);


  const onChange =(event)=>{
    setMessage(event.target.value);
    setEnableBotton(event.target.value.trim().length>0);
  }
  return (
    <Paper  className={classes.root}>
      <InputBase placeholder="Enter your message" className={classes.input} value={message} onChange={onChange}/>
      <Divider  className={classes.divider} />
      <IconButton color="primary"   className={classes.iconButton} aria-label="Directions" disabled={enableBotton?false:true}>
     <Send />
   </IconButton>
    </Paper>
  );
}


