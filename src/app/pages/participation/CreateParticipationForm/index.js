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
import classNames from 'classnames';
import { Grid } from '@material-ui/core';
import { Send } from "@material-ui/icons";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  inputRoot:{
    fontSize:'2rem'
  },
  hide:{
    display:'none !important'
  }
}));
const CreateParticipationForm = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [postData, setPostData] = useState({ ...Post.create({}).toJSON() })
  const [hide, setHide] = useState(true)

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
      //delete postData.id
      // let cRData = (({ content }) => ({ content }))(postData)
      // for (var key in cRData) {
      //   formData.append(key, postData[key]);
      // }
      formData.append('content',content);

      const res = await props.store.apiRequests.addPost(formData, props.match.params.id)
      classRoom.posts.addPost(res.data)
      setContent('')

    } catch (err) {

      setLoading(false)
    } finally {
      setLoading(false)
    setHide( true)

    setContent('')
    }
  }


 const handleChange = (key) => (event) => {
    const value = event.target.value;
    setContent(value)
    //let prePostData = postData;
    // prePostData[key] = value
    // setPostData(prePostData)
    // console.log(prePostData);
    // console.log('postData.content==""||!postData.content', postData.content==""||!postData.content)
     setHide( content=="")
  };
  return (
    <>
              <Grid item md={11}>

         <Formsy onSubmit={handleSubmit}>
            <MyInput
              value={content}
              name="content"
              type="text"
              fullWidth
              placeholder="Share with your friends"
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

          <CardActions className={classNames("m-5 mt-0 float-right ",hide?classes.hide:"")}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              type="submit"
              disabled={isLoading}
            >
              Post <Send/>
            </Button>
          </CardActions>

        </Formsy>
        </Grid>



    </>
  );


}

export default inject('store')(withRouter(observer(CreateParticipationForm)));
