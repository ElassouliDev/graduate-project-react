import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";
import { Typography, Container, Grid, Icon, Card, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { Attachment } from '@material-ui/icons';
import { OndemandVideo } from '@material-ui/icons';
import { Chat } from '@material-ui/icons';
import { IconButton } from "@material-ui/core";
import { CardActionArea } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
const Room = (props) => {

  const [classRoom, setClassRoom] = useState({});
  useEffect(() => {
    setClassRoom(
      props.store.ClassRoomStore.getClassRoom(+props.match.params.id)
    );
  }, []);
  if (!classRoom) {
    return <Typography>class room not found</Typography>;
  }
  const classes = {
    root: {
      textAlign: 'center'

    },
    chat: {
      fontSize: 100
    }
  };
  return (
    <div>
      <Typography variant="h2" className={"py-5  "}>{classRoom.title}</Typography>
      <Divider />
      <Grid container spacing={3} className={"py-5 !mt-5 "}>
        <Grid item lg={3} md={3} sm={12} spacing={3}>
          <Card>
            <Link to={`./${classRoom.id}/settings`}>

              <CardActionArea className={"!py-6 "} style={classes.root}>

                <Settings style={classes.chat} />
                <Typography variant="h4" className={'text-center py-5'}>

                  Room Settings

                </Typography>
              </CardActionArea>
            </Link>

          </Card>
        </Grid>
        <Grid item lg={3} md={3} sm={12} spacing={3}>
          <Card>
            <Link to={`./${classRoom.id}/participation`}>

              <CardActionArea className={"!py-6 "} style={classes.root}>

                <Chat style={classes.chat} />
                <Typography variant="h4" className={'text-center py-5'}>

                  Room participation space

                </Typography>
              </CardActionArea>
            </Link>

          </Card>
        </Grid>
        <Grid item lg={3} md={3} sm={12} spacing={3}>
          <Card>
            <Link to={`./${classRoom.id}/videos`}>

              <CardActionArea className={"!py-6 "} style={classes.root}>

                <OndemandVideo style={classes.chat} />
                <Typography variant="h4" className={'text-center py-5'}>

                  Room tutorial videos
                </Typography>
              </CardActionArea>
            </Link>

          </Card>
        </Grid>
        <Grid item lg={3} md={3} sm={12} spacing={3}>
          <Card>
            <Link to={`./${classRoom.id}/material`}>

              <CardActionArea className={"!py-6 "} style={classes.root}>

                <Attachment style={classes.chat} />
                <Typography variant="h4" className={'text-center py-5'}>

                  Room materials
                </Typography>
              </CardActionArea>
            </Link>

          </Card>
        </Grid>


      </Grid>

    </div>
  );
};
export default inject("store")(observer(withRouter(Room)));
