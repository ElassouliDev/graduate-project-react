import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import getConfig from "../../config";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import CustomClassroomLayout from "../../../shared/components/custom-classroom-layout";
import ShowVideo from './components/show-video';
import VideoMenu from './components/video_menu';
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));
 function Videos(props) {
  let { slug } = useParams();
  const classes = useStyles();

  const classRoom = props.store.ClassRoomStore.getClassRoom(props.match.params.id);
  const [openVideoId, setOpenVideoId] = React.useState(0);
  const [activeVideo, setActiveVideo] = React.useState({});

  const handleOpenVideo = (id) => {
    console.log('openVideoId  fun ', id)

    setOpenVideoId(id);

  };


  React.useEffect(
    () => {
      async function fetchData() {
        try {
          if (classRoom)
            return
          let res = await props.store.apiRequests.getOneClassRoom(props.match.params.id);
          console.log("res", res);
          props.store.ClassRoomStore.setOneClassRoom(res.data);

        } catch (error) {
          console.log("mappedClassRooms", error.message);
        }
      }
      fetchData();
    }, []);
  if (!classRoom) {
     return <Typography className={'text-center !text-4xl !my-20 bg-gray-400 !py-10'}>class room not found</Typography>;
  }else if(classRoom.course.videos==0){
    return <Typography className={'text-center !text-4xl !my-20 bg-gray-400 !py-10'}>No Video Exist</Typography>;

  }
  else{
    if(openVideoId && openVideoId != 0 && openVideoId!=activeVideo.id ){
      console.log('openVideoId', openVideoId)
     setActiveVideo(classRoom.course.get(openVideoId))

    }
    else if( openVideoId!=activeVideo.id){

     setActiveVideo(classRoom.course.videos[0]);
      console.log('course', classRoom.course.videos[0])

      setOpenVideoId(activeVideo.id);

    }
  }

  return (
    <div>
      <CustomClassroomLayout>
        <Grid container className={[classes.root, "pt-12"]} spacing={2}>
        <Grid item xs={12} sm={5} md={4}>
            <VideoMenu videos={classRoom.course.videos}   activeVideoID={openVideoId} handleOpenVideo={handleOpenVideo}/>

          </Grid>
          <Grid item xs={12} sm={7} md={8}>
            {/* <CreateParticipationCard /> */}
            <ShowVideo video={activeVideo}/>

          </Grid>


        </Grid>
      </CustomClassroomLayout>
    </div>
  );
}
export default inject('store')(withRouter(observer(Videos)))
