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
    newComment : {
        content:"",
        post_id:""
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
    resize:{
      fontSize:50
    },
    }
constructor(props){
  super(props);
  console.log('post_id',555);

}
  // handleChange1 = (event) => {
  //   this.props.store.UserStore.setNewUser({ ...values, [event.target.name]: event.target.value });
  // };

  // classes = useStyles();

  handelSubmitCommentForm = async (values) => {
    // console.log("submit form", values);
    // console.log(this.props.store)
    // let body = this.props.store.UserStore;
    // try {
    //   this.setState({ isLoading: true, helperText: "" })
    //   const res = await this.props.store.apiRequests.registerUser({ ...body, groups: [body.groups] });
    //   if (res.data.token) {
    //     this.props.store.UserStore.setNewUser(values)
    //     window.localStorage.setItem('jwtToken', res.data.token)
    //     this.setState({ isLoggedIn: true })
    //   }
    // } catch (err) {
    //   this.setState({ isLoading: false, helperText: err.message })
    //   window.localStorage.clear()


    // } finally {
    //   this.setState({ isLoading: false })

    // }
  };

  handleChange = (prop) => (event) => {
    console.log("handel change", event);
    let value = event.target.value;
    let oldComment = this.state.newComment;
    const newComment = {...oldComment,content: value};
    console.log('tag', newComment)
    this.setState({newComment:newComment});
    console.log("handel change", value);


  };


  render() {
    // console.log(this.props.store, "dsdfdsfdsf")
    const { classes } = this.props;
    //const { content = "" ,post_id ="" } = (this.state.newComment);
    console.log('post_id', this.state.newComment.content);

    // if (!this.state.isLoggedIn) {
    //   return <Redirect to={"/auth/login"} />
    // }
    return (

<>
        <Formsy className={'!mb-10'} onSubmit={this.handelSubmitCommentForm}>
          <Grid className={'!mt-10 !mb-2'} container spacing={1}>
            <Grid item xs={2} sm={2} md={1}>
            <Avatar
            alt={this.props.user.name}
            src={this.props.user.image}
          ></Avatar>
              </Grid>
            <Grid item xs={10} sm={10} md={11}>
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
          onChange ={this.handleChange("content")}
          inputProps={{
            style: {fontSize: 19}
          }}
          multiline
        />

            </Grid>
           </Grid>


           <Divider/>


        </Formsy>
  </>
    );
  }

};

export default  CommentForm;//withStyles(styles)(inject('store')(observer(CommentForm)));
