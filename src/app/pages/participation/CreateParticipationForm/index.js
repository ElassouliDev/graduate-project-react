import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React from "react";
// import { TextField } from "@material-ui/core";
import MyInput from "../../../../shared/components/formasy-input";
import { Button, CardContent, CardActions, CardActionArea } from "@material-ui/core";
import { inject, observer } from "mobx-react"
import { withRouter } from "react-router";
import Formsy from "formsy-react";
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
  const handleSubmit = (event) => {
    classRoom.PostStore.addPost()
  }
  const handleChange = (key) => (event) => {
    classRoom.PostStore.setData({ key, value: event.target.value })
  };
  return (
    <>
      <Card className={classes.root} className='my-10'>
        <Formsy onSubmit={handleSubmit}>
          <CardContent className='mr-5'>
            <MyInput
              value={classRoom.PostStore.newPost.content}
              name="text"
              type="text"
              fullWidth
              placeholder="Post Content"
              label="Post Content"
              id="content"
              validations="isExisty"
              validationError="This is not a valid content"
              onChange={handleChange("content")}
              InputProps={{ classes: { root: classes.inputRoot } }}
              InputLabelProps={{
                classes: {
                  root: classes.labelRoot,
                },
              }}
              FormHelperTextProps={{
                classes: {
                  root: classes.labelRoot,
                },
              }}
              style={{ margin: 8 }}
              required
              variant="filled"
              multiline
            />
          </CardContent>
          <CardActionArea>

          </CardActionArea>
          <CardActions className="m-5 mt-0 float-right">
            <Button
              size="large"
              variant="contained"
              color="primary"
              type="submit"
            >
              Post
            </Button>
          </CardActions>

        </Formsy>
      </Card>

    </>
  );


}

export default inject('store')(withRouter(observer(CreateParticipationForm)));
