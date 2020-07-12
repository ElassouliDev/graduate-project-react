import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React from "react";
import { TextField } from "@material-ui/core";
import { Button, CardContent, CardActions, CardActionArea } from "@material-ui/core";
import { inject, observer } from "mobx-react"
import { withRouter } from "react-router";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));
const CreateParticipationForm = (props) => {

  const classes = useStyles();
  const classRoom = props.store.ClassRoomStore.getClassRoom(props.match.params.id);
  if (!classRoom) {
    return <div>
      class room not found
  </div>
  }

  if (!classRoom.PostStore) {
    return <div>
      faild to load post addition form
  </div>
  }
  const handleClick = (event) => {
    const newPostContent = classRoom.PostStore.newPost;
    props.store.ClassRoomStore.getClassRoom(props.match.params.id).PostStore.addPost(newPostContent)
  }
  const handleChange = (key) => (event) => {
    props.store.ClassRoomStore.getClassRoom(props.match.params.id).PostStore.setData({ key, value: event.target.value })
  };
  return (
    <>
      <Card className={classes.root} className='my-10'>
        <CardContent className='mr-5'>
          <TextField
            id="filled-full-width"
            label="Post Content"
            style={{ margin: 8 }}
            placeholder="Post Content"
            helperText=""
            name="content"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            variant="filled"
            multiline
            rows="7"
            value={props.store.ClassRoomStore.getClassRoom(props.match.params.id).PostStore.content}
            onChange={handleChange("content")}
            autoFocus
          />
        </CardContent>
        <CardActionArea>

        </CardActionArea>
        <CardActions className="m-5 mt-0 float-right">
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            Post
            </Button>
        </CardActions>
      </Card>

    </>
  );


}

export default inject('store')(observer(withRouter(CreateParticipationForm)));
