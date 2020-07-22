import { Typography, withStyles, Grid } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
// import classnames from "classnames";
import React from "react";
import MyInput from "../../../../../shared/components/formasy-input";
import Formsy from "formsy-react";
import { Radio, RadioGroup, FormLabel, Button, CardActions, CardContent, FormControlLabel } from "@material-ui/core";
// import { apiRequests } from "../../../../services/apiRequestes";
import FormHelperText from '@material-ui/core/FormHelperText';
import { inject, observer } from 'mobx-react';
import { red } from "@material-ui/core/colors";
import { Redirect } from "react-router-dom";
import DescriptionAlerts from "../../../../../shared/components/alert"
import { withRouter } from "react-router-dom"
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

class SignUpForm extends React.Component {
  state = {
    isLoading: false,
    helperText: "",
    isLoggedIn: false,
    status: 0,
    message: ""
  }
  // handleChange1 = (event) => {
  //   this.props.store.UserStore.setNewUser({ ...values, [event.target.name]: event.target.value });
  // };

  // classes = useStyles();

  handelSubmitLoginForm = async (values) => {
    console.log("submit form", values);
    console.log(this.props.store)
    let body = this.props.store.UserStore;
    try {
      this.setState({ isLoading: true, helperText: "" })
      const res = await this.props.store.apiRequests.registerUser({ ...body, groups: [body.groups] });
      if (res.data.token) {
        this.setState({ isLoggedIn: true, status: 1, message: "You are registerd, you will be redirected in 5 secounds" })
        setTimeout(() => {
          console.log("props.history.push('/')");
          this.props.history.push("/")
        }, 6000);
        this.props.store.UserStore.setNewUser(values)
        window.localStorage.setItem('jwtToken', res.data.token)
      }
    } catch (err) {
      this.setState({ status: 2, message: err.message })

      this.setState({ isLoading: false, helperText: err.message })
      window.localStorage.clear()


    } finally {
      this.setState({ isLoading: false })

    }
  };

  handleChange = (prop) => (event) => {
    console.log("handel change", event);
    let value = event.target.value;
    if (prop === "groups") {
      value = value === "student" ? 1 : 2;
    }
    this.props.store.UserStore.setNewUserData({ key: prop, value });
  };


  render() {
    console.log(this.props.store, "dsdfdsfdsf")
    const { classes } = this.props;
    const { email = "", password = "", confirmPassword = "", username = "", groups = "", first_name = "", last_name = "" } = (this.props.store.UserStore);
    return (
      <CardContent>
        <Typography
          variant="h3"
          component="h3"
          className="text-center !mt-5 !mb-12"
        >
          Create new account
        </Typography>

        <Formsy className="mb-10" onSubmit={this.handelSubmitLoginForm}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <MyInput
                value={first_name}
                name="first_name"
                type="text"
                fullWidth
                placeholder="Enter your first name"
                label="First Name"
                id="first_name"
                validations="isExisty"
                validationError="first name not a valid"
                onChange={this.handleChange("first_name")}
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
            <Grid item xs={12} sm={6} md={6}>
              <MyInput
                value={last_name}
                name="last_name"
                type="text"
                fullWidth
                placeholder="Enter your last name"
                label="First Name"
                id="first_name"
                validations="isExisty"
                onChange={this.handleChange("last_name")}
                validationError="first name not a valid"
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
            <Grid item xs={12} sm={6} md={6}>
              <MyInput
                value={username}
                name="username"
                type="text"
                fullWidth
                placeholder="Enter your last name"
                label="User Name"
                id="user_name"
                validations="isExisty"
                onChange={this.handleChange("username")}
                validationError="user name is not a valid"
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

          <MyInput
            value={email}
            name="email"
            type="email"
            fullWidth
            placeholder="Enter your email"
            label="Email"
            id="email"
            validations="isEmail"
            validationError="This is not a valid email"
            onChange={this.handleChange("email")}
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
          <RadioGroup
            row
            aria-label="accountType"
            name="groups"
            value={groups === 2 ? "teacher" : "student"}
            onChange={this.handleChange("groups")}
          >
            {/* <FormLabel className={classes.labelRoot} component="legend">I'm a:</FormLabel> */}
            <FormControlLabel
              value="student"
              control={
                <FormLabel className={classes.labelRoot} component="legend">
                  I'm a:
                  </FormLabel>
              }
              className={"!ml-0"}
            />
            <FormControlLabel
              value="student"
              control={<Radio color="primary" />}
              label="Student"
              classes={{ label: classes.labelRoot }}
            />
            <FormControlLabel
              value="teacher"
              control={<Radio color="primary" />}
              label="Teacher"
              classes={{ label: classes.labelRoot }}
            />
          </RadioGroup>
          <MyInput
            value={password}
            name="password"
            type="password"
            fullWidth
            placeholder="Enter your password"
            label="Password"
            id="password"
            validations="minLength:6"
            validationError="This is not a valid password"
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
            onChange={this.handleChange("password")}
            required
          />
          <MyInput
            value={confirmPassword}
            name="confirmPassword"
            type="password"
            fullWidth
            placeholder="Confirm your password"
            label="Confirm Password"
            id="confirm_password"
            validations="equalsField:password"
            validationError="Confirm password not match with password"
            onChange={this.handleChange("confirmPassword")}
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
          <DescriptionAlerts status={this.state.status} message={this.state.message} />

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
              SIGN UP
              {this.state.isLoading && <CircularProgress />}
            </Button>
          </CardActions>

        </Formsy>
      </CardContent>
    );
  }

};

export default withStyles(styles)(inject('store')(withRouter(observer(SignUpForm))));
