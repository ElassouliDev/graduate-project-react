import { Typography, withStyles, Grid } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
// import classnames from "classnames";
import React from "react";
import MyInput from "../../../../../../shared/components/formasy-input";
import Formsy from "formsy-react";
import { Radio, RadioGroup, FormLabel, Button, CardActions, CardContent, FormControlLabel } from "@material-ui/core";
// import { apiRequests } from "../../../../services/apiRequestes";
import FormHelperText from '@material-ui/core/FormHelperText';
import { inject, observer } from 'mobx-react';
import { red } from "@material-ui/core/colors";
import { Redirect } from "react-router-dom";

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


constructor(props){
  super(props);
  alert(1)
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
      <CardContent>


        <Formsy className="mb-10" onSubmit={this.handelSubmitCommentForm}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <MyInput
                value={this.state.newComment.content}
                name="content"
                type="text"
                fullWidth
                placeholder="Enter your comment here"
                label="Enter your comment"
                id="content"
                validations="isSpecialWords"
                validationError="comment is required"
                onChange={this.handleChange("contents")}
                InputProps={{ classes: { root: classes.inputRoot } }}
                InputLabelProps={{
                  classes: {
                    root: classes.labelRoot,
                    // focused: classes.labelFocused
                  },
                }}
                FormHelperTextProps={{
                  classes: {
                    root: classes.labelRoot,
                    // focused: classes.labelFocused
                  },
                }}
                required
              />
            </Grid>
           </Grid>


          {/* <FormHelperText color={red[200]}>{this.state.helperText}</FormHelperText> */}
          <CardActions className="!px-0 !mt-10">
            <Button
              fullWidth
              variant="contained"
              type="submit"
              color="primary"
              size="large"
              disabled={this.state.isLoading}
              className={classes.containedSizeLarge}
            >
              Send
              {this.state.isLoading && <CircularProgress />}
            </Button>
          </CardActions>

        </Formsy>
      </CardContent>
    );
  }

};

export default  CommentForm;//withStyles(styles)(inject('store')(observer(CommentForm)));
