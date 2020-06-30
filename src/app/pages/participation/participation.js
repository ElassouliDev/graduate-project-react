import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import getConfig from "../../config";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import CardTask from "../../../shared/components/task-card";
import CreateParticipationCard from "../../../shared/components/Participation/CreateParticipationCard";
import CustomClassroomLayout from "../../../shared/components/custom-classroom-layout";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));
export default function BlogPost(props) {
  let { slug } = useParams();
  // const [data, setData] = useState({ post: {} });
  const classes = useStyles();

  // useEffect(() => {
  //   async function fetchData() {
  //     // You can await here
  //     const result = await axios(`${getConfig().apiUrl}/post/${slug}`);
  //     setData(result.data);
  //   }
  //   fetchData();
  // }, []);

  return (
    <div>
      <CustomClassroomLayout
      // coverImage={props.store.ClassRoomStore.getCover(props.match.params.id)}
      >
        <Grid container className={[classes.root, "pt-12"]} spacing={2}>
          <Grid item xs={12} sm={8} md={9}>
            <CreateParticipationCard />
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <CardTask link={"#data"} />
          </Grid>
        </Grid>
      </CustomClassroomLayout>
    </div>
  );
}
