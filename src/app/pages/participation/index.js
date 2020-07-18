import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import React from "react";
import Grid from "@material-ui/core/Grid";
import CardTask from "../../../shared/components/task-card";
import CreateParticipationCard from "./CreateParticipationCard";
import CustomClassroomLayout from "../../../shared/components/custom-classroom-layout";
import PostCard from './components/PostCard';
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));
function BlogPost(props) {
  let { slug } = useParams();
  // const [data, setData] = useState({ post: {} });
  const classes = useStyles();

  return (
    <div>
      <CustomClassroomLayout
      // coverImage={props.store.ClassRoomStore.getCover(props.match.params.id)}
      >
        <Grid container className={[classes.root, "pt-12"]} spacing={2}>
          <Grid item xs={12} sm={8} md={9}>
            <CreateParticipationCard />
            {
              props.store.ClassRoomStore.getClassRoom(props.match.params.id).PostStore.Posts.map((post) => {
                return <PostCard post={post} />
              })
            }
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <CardTask link={"#data"} />
          </Grid>
        </Grid>
      </CustomClassroomLayout>
    </div>
  );
}
export default inject('store')(withRouter(observer(BlogPost)));
