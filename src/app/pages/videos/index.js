import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import getConfig from "../../config";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import CustomClassroomLayout from "../../../shared/components/custom-classroom-layout";
import ShowVideo from './components/show-video';
import VideoMenu from './components/video_menu';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));
export default function Videos() {
  let { slug } = useParams();
  const [data, setData] = useState({ post: {} });
  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      // You can await here
      console.log(getConfig().apiUrl, "sdsdsdsd");
      const result = await axios(`${getConfig().apiUrl}/post/${slug}`);
      setData(result.data);
    }
    fetchData();
  });

  return (
    <div>
      <CustomClassroomLayout>
        <Grid container className={[classes.root, "pt-12"]} spacing={2}>
        <Grid item xs={12} sm={5} md={4}>
            <VideoMenu />

          </Grid>
          <Grid item xs={12} sm={7} md={8}>
            {/* <CreateParticipationCard /> */}
            <ShowVideo/>

          </Grid>


        </Grid>
      </CustomClassroomLayout>
    </div>
  );
}
