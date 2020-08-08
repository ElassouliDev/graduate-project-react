import { Typography, Divider } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React from "react";
import MenuItem from "./menu_item";
import { FormControlLabel } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Switch } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    MaxHeight:800,
    overflowY:'scroll'
  },
  details: {
    // display: 'flex',
    // flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    height: 90,
  },
  active : {
    background: '#e7e7e7'
  }
}));
export default function VideoMenu(props) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    "auto_run_video": true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  return (
    <Card >
      <Typography variant="h3" className={['!mb-3']} color="textSecondary" component="h3">

      </Typography>
      <CardHeader
        /*action={

          <FormControlLabel
            value="Auto Play"
            control={<Switch
              color="primary"
              checked={state.checkedA}
              onChange={handleChange}
            />}
            label="auto-play"
            labelPlacement="start"
          />
        }*/
        title={props.videos.length + " Video"}
      />
      <Divider></Divider>

      <CardContent className={classes.root}>
        {props.videos.map(video => <MenuItem onClick={props.handleOpenVideo.bind(this, video.id)} key={video.id}
        classes={video.id==props.activeVideoID?classes.active:""}

title={video.title}
description= {video.description}
image= {video.media[0].thumbnail}/>)}

      </CardContent>
      {/* <CardActions className="m-5 mt-20 float-right">
        <Button
          size="large"
          variant="contained"
          color="primary"
          href={props.link ? props.link : "#"}
        >
          Show All
        </Button>
      </CardActions> */}
    </Card>
  );
}
