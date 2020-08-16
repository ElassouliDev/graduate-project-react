import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import getConfig from "../../config";
import Grid from "@material-ui/core/Grid";
import CustomClassroomLayout from "../../../shared/components/custom-classroom-layout";
import ShowVideo from './components/show-video';
import VideoMenu from './components/video_menu';
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";
import { Typography } from '@material-ui/core';
import LoadingProgressPage from "../../../shared/components/loading-progress-page";

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
  const [isLoading, setLoading] = React.useState(false);

  const handleOpenVideo = (id) => {
    console.log('openVideoId  fun ', id)

    setOpenVideoId(id);

  };


  React.useEffect(
    () => {
      async function fetchData() {
        try {
          if (classRoom) return;
            setLoading(true);
            let res = await props.store.apiRequests.getOneClassRoom(props.match.params.id);
          console.log("res", res);
          props.store.ClassRoomStore.setOneClassRoom(res.data);

        } catch (error) {
            setLoading(false);
            console.log("mappedClassRooms", error.message);
        } finally {
            setLoading(false);
        }
      }
      fetchData();
    }, []);

   if (isLoading) {
     return <LoadingProgressPage />
   }

  if (!classRoom) {
     return <Typography className={'text-center !text-4xl !my-20 bg-gray-400 !py-10'}>class room not found</Typography>;
  } else if(classRoom.course.videos==0){
     return <Typography className={'text-center !text-4xl !my-20 bg-gray-400 !py-10'}>No Video Exist</Typography>;
  }
  else{
    if(openVideoId && openVideoId != 0 && openVideoId!=activeVideo.id ){
     // console.log('openVideoId', openVideoId)
     setActiveVideo(classRoom.course.getMedia(openVideoId))

    }
    else if( openVideoId!=activeVideo.id){

     setActiveVideo(classRoom.course.getFirstMedia());
    //  console.log('course', classRoom.course.videos[0].media[0])
      console.log('find video', classRoom.course.videos[0])
          setOpenVideoId(activeVideo?activeVideo.id:0);

    }
 // console.log('media ', '')
  }

  if (!activeVideo) {
    return <Typography className={'text-center !text-4xl !my-20 bg-gray-400 !py-10'}>No Video Exist</Typography>;
 }
  return (
    <div>
      <CustomClassroomLayout>
        <Grid container className={[classes.root, "pt-12"]} spacing={2}>
        <Grid item xs={12} sm={5} md={4}>
            <VideoMenu videos={classRoom.course.videos} videoCount={classRoom.course.getMediaCount()}  activeVideoID={openVideoId} handleOpenVideo={handleOpenVideo}/>

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
