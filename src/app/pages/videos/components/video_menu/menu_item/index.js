import {  Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core";
import React from "react";
import { Box } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    minHeight:120,
    paddingLeft:10,
    marginBottom:20
  },
  bod_card_style: {
    fontSize: "1.2rem",
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: "100%",
    height: "100%",
  }
}));
export default function MenuItem(props) {
  const classes = useStyles();

  return (

          <Box boxShadow={3}>
          <Grid   container className={[classes.root, "px-2"]} spacing={2}>
            <Grid item xs={12} sm={7} md={7}>
              <Typography variant="h4"  className={[ '!mb-3' ]} color="textSecondary" component="h3">
              {props.title}
              </Typography>
              <Typography variant="body2"  className={[ classes.bod_card_style  ]} color="textSecondary" component="body2">
                {props.description}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5} md={5}>
              <CardMedia
                className={classes.cover}
                image={props.image}
                title={props.title}
              />

            </Grid>
          </Grid>
          </Box>

  );
}
