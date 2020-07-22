import { Typography, withStyles, Grid, Divider } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
// import classnames from "classnames";
import React from "react";
import MyInput from "../../../../../../shared/components/formasy-input";
import Formsy from "formsy-react";
import classNames from 'classnames';
import { Avatar } from '@material-ui/core';
import { Radio, RadioGroup, FormLabel, Button, CardActions, CardContent, FormControlLabel } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { observer, inject } from "mobx-react";
import { withRouter } from "react-router";


const styles = (theme) => ({
  labelRoot: {
    fontSize: "1.75rem",
  },
  inputRoot: {
    fontSize: "1.75rem",
  },
  containedSizeLarge: {
    fontSize: "1.75rem",
  },
});

class CommentForm extends React.Component {
  state = {
    isLoading: false,
    helperText: "",
    isLoggedIn: false,
    newComment: {
      content: "",
      post_id: ""
    }
  }

  styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      width: 300,
      margin: 100,
    },
    //style for font size
    resize: {
      fontSize: 50
    },
  }
  constructor(props) {
    super(props);
    console.log('post_id', 555);

  }
  // handleChange1 = (event) => {
  //   this.props.store.UserStore.setNewUser({ ...values, [event.target.name]: event.target.value });
  // };

  // classes = useStyles();

  handelSubmitCommentForm = async (values) => {
    try {
      this.setState({ isLoading: true, helperText: "" })
      let formData = new FormData();
      formData.append("content", this.state.newComment.content)
      const res = await this.props.store.apiRequests.addComment(formData, this.props.post.id);
      const classRoom = this.props.store.ClassRoomStore.getClassRoom(this.props.match.params.id)
      classRoom.getPostById(res.data.post).addComment(res.data)
    } catch (err) {
      this.setState({ isLoading: false, helperText: err.message })
    } finally {
      this.setState({ isLoading: false })
    }
  };

  handleChange = (prop) => (event) => {
    let value = event.target.value;
    let oldComment = this.state.newComment;
    const newComment = { ...oldComment, content: value };
    this.setState({ newComment: newComment });
  };


  render() {
    const { classes } = this.props;
    console.log('post_id', this.state.newComment.content);
    return (
      <>
        <Formsy className={'!mb-10'} onSubmit={this.handelSubmitCommentForm}>
          <Grid className={'!mt-10 !mb-2'} container spacing={1}>
            <Grid item xs={2} sm={2} md={1}>
              <Avatar
                alt={this.props.store.User.username}
                src={this.props.store.User.image}
              ></Avatar>
            </Grid>
            <Grid item xs={8} sm={8} md={9}>
              <TextField
                label=""
                placeholder="Enter your comment here"
                fullWidth
                id="content"
                required
                className={'!text-5xl'}
                validationError="comment is required"
                value={this.state.newComment.content}
                name="content"
                onChange={this.handleChange("content")}
                inputProps={{
                  style: { fontSize: 19 }
                }}
                multiline
              />

            </Grid>
            <Grid item xs={2} sm={2} md={2}>
              <Button onClick={this.handelSubmitCommentForm}>comment</Button>
            </Grid>
          </Grid>
          <Divider />


        </Formsy>
      </>
    );
  }

};

export default inject('store')(withRouter(observer(CommentForm)));//withStyles(styles)(inject('store')(observer(CommentForm)));
