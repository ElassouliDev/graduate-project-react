import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
// import { TextField } from "@material-ui/core";
import MyInput from "../../../../shared/components/formasy-input";
import { Button, CardContent, CardActions, CardActionArea } from "@material-ui/core";
import { inject, observer } from "mobx-react"
import { withRouter } from "react-router";
import Formsy from "formsy-react";
import { Post } from "../stores/index"
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));
const CreateParticipationForm = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [postData, setPostData] = useState({ ...Post.create({}).toJSON() })

  const [content, setContent] = useState("")
  const classes = useStyles();
  const classRoom = props.store.ClassRoomStore.getClassRoom(props.match.params.id);
  if (!classRoom) {
    return <div>
      class room not found
    </div>
  }
  const handleSubmit = async (event) => {
    try {
      setLoading(true)
      let formData = new FormData();
      delete postData.id
      let cRData = (({ content }) => ({ content }))(postData)
      for (var key in cRData) {
        formData.append(key, postData[key]);
      }
      const res = await props.store.apiRequests.addPost(formData, props.match.params.id)
      classRoom.posts.addPost(res.data)

    } catch (err) {

      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  const handleChange = (key) => (event) => {
    const value = event.target.value;
    let prePostData = postData;
    prePostData[key] = value
    setPostData(prePostData)
    console.log(prePostData);
  };
  return (
    <>
      <Card className={classes.root} className='my-10'>
        <Formsy onSubmit={handleSubmit}>
          <CardContent className='mr-5'>
            <MyInput
              value={postData.content}
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
              disabled={isLoading}
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
