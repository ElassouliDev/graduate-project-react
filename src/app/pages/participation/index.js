import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import React from "react";
import Grid from "@material-ui/core/Grid";
import CreateParticipationCard from "./CreateParticipationCard";
import CustomClassroomLayout from "../../../shared/components/custom-classroom-layout";
import PostCard from './components/PostCard';
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";
import { useEffect } from "react"
import { Typography } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));
function BlogPost(props) {
  const classRoom = props.store.ClassRoomStore.getClassRoom(props.match.params.id)
  let { slug } = useParams();
  // const [data, setData] = useState({ post: {} });
  const classes = useStyles();
  useEffect(
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

  }
  return (
    <div>
      <CustomClassroomLayout
      // background_img={props.store.ClassRoomStore.getCover(props.match.params.id)}
      >
        <Grid container className={[classes.root, "pt-12"]} spacing={2}>
          <Grid item xs={12}>
            <CreateParticipationCard />
            {
              props.store.ClassRoomStore.getClassRoom(props.match.params.id).posts.Posts.map((post) => {
                return <PostCard post={post} />
              })
            }
          </Grid>
        </Grid>
      </CustomClassroomLayout>
    </div>
  );
}
export default inject('store')(withRouter(observer(BlogPost)));
