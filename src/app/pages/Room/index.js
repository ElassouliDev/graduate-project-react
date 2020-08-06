import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";
import { Typography, Grid, Card, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import LoadingProgressPage from '../../../shared/components/loading-progress-page';
import { Group } from '@material-ui/icons';
import { GroupAdd } from '@material-ui/icons';
import { ListAlt } from '@material-ui/icons';
import { OndemandVideo } from '@material-ui/icons';
import { Attachment } from '@material-ui/icons';
import { Chat } from '@material-ui/icons';
import { CardActionArea } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
const options = {
  "settings": "settings",
  "participations": "participations",
  "tutorials": 'tutorials',
  "matrerials": "matrerials",
  "tasks": "tasks",
  "join": "join",
  "students": "students"
}
const StudentRoom = {
  participations: options.participations,
  tutorials: options.tutorials,
  matrerials: options.matrerials,
  tasks: options.tasks,
}
const TeacherRoom = {
  settings: options.settings,
  participations: options.participations,
  tutorials: 'tutorials',
  matrerials: options.matrerials,
  tasks: options.tasks,
  join: options.join,
  students: options.students
}
const Room = (props) => {
  const [isLoading, setLoading] = React.useState(false);

  const classRoom = props.store.ClassRoomStore.getClassRoom(props.match.params.id);
  useEffect(
    () => {
      async function fetchData() {
        try {
          setLoading(true)
          if (classRoom)
            return
          let res = await props.store.apiRequests.getOneClassRoom(props.match.params.id);
          console.log("res", res);
          props.store.ClassRoomStore.setOneClassRoom(res.data);
        } catch (error) {
          console.log("mappedClassRooms", error.message);
          setLoading(false)

        } finally {
          setLoading(false)
        }
      }
      fetchData();
    }, []);
  if (!isLoading && !classRoom) {
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
  const displayedItems = (localStorage.getItem("groups") == 1 ? TeacherRoom : StudentRoom);

  const ConditionaRender = (Arr, Component, SelectedItem) => {
    if (Arr.includes(SelectedItem))
      return Component
    else
      return ""
  }
  const Settings = () => {
    return (
      <Grid item lg={3} md={3} sm={12} spacing={3}>
        <Card>
          <Link to={`./${classRoom.id}/settings`}>
            <CardActionArea className={"!py-6 "} style={classes.root}>
              <Settings style={classes.chat} />
              <Typography variant="h4" className={'text-center py-5'}> Room Settings </Typography>
            </CardActionArea>
          </Link>
        </Card>
      </Grid>)
  }
  const Participations = () => {
    return (<Grid item lg={3} md={3} sm={12} spacing={3}>
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
    </Grid>)
  }
  const Tutorials = () => <Grid item lg={3} md={3} sm={12} spacing={3}>
    <Card>
      <Link to={`./${classRoom.id}/videos/manage`}>

        <CardActionArea className={"!py-6 "} style={classes.root}>

          <OndemandVideo style={classes.chat} />
          <Typography variant="h4" className={'text-center py-5'}>
            Room tutorial videos
    </Typography>
        </CardActionArea>
      </Link>
    </Card>
  </Grid>
  const Materials = () => <Grid item lg={3} md={3} sm={12} spacing={3}>
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
  const Tasks = () => <Grid item lg={3} md={3} sm={12} spacing={3}>
    <Card>
      <Link to={`./${classRoom.id}/tasks`}>

        <CardActionArea className={"!py-6 "} style={classes.root}>

          <ListAlt style={classes.chat} />
          <Typography variant="h4" className={'text-center py-5'}>
            Room Tasks
    </Typography>
        </CardActionArea>
      </Link>
    </Card>
  </Grid>
  const Join = () => <Grid item lg={3} md={3} sm={12} spacing={3}>
    <Card>
      <Link to={`./${classRoom.id}/join-request`}>

        <CardActionArea className={"!py-6 "} style={classes.root}>

          <GroupAdd style={classes.chat} />
          <Typography variant="h4" className={'text-center py-5'}>
            Join Request
    </Typography>
        </CardActionArea>
      </Link>
    </Card>
  </Grid>
  const Students = () => <Grid item lg={3} md={3} sm={12} spacing={3}>
    <Card>
      <Link to={`./${classRoom.id}/students`}>

        <CardActionArea className={"!py-6 "} style={classes.root}>

          <Group style={classes.chat} />
          <Typography variant="h4" className={'text-center py-5'}>
            Students
   </Typography>
        </CardActionArea>
      </Link>
    </Card>
  </Grid>
  {/* 
  "join": "join",
  "students": "students" */}
  return (

    <div>
      {isLoading ? <LoadingProgressPage /> :
        <>
          <Typography variant="h2" className={"py-5  "}>{classRoom.title}</Typography>
          <Divider />
          <Grid container spacing={3} className={"py-5 !mt-5 "}>
            {
              displayedItems.settings && <Settings />
            }
            {
              displayedItems.participations && <Participations />
            }
            {
              displayedItems.tutorials && <Tutorials />
            }
            {
              displayedItems.matrerials && <Materials />
            }
            {
              displayedItems.tasks && <Tasks />
            }
            {
              displayedItems.join && <Join />
            }
            {
              displayedItems.students && <Students />
            }





          </Grid>
        </>
      }
    </div>

  )
}
export default inject('store')(withRouter(observer(Room)))
