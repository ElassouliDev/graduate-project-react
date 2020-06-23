import { Typography, withStyles, Grid } from "@material-ui/core";
import classnames from "classnames";
import React, { useEffect, useState } from "react";
import MyInput from "../../../../../shared/components/formasy-input";
import Formsy from "formsy-react";
import { Radio, RadioGroup, FormLabel, Button, CardActions, CardContent, FormControlLabel  } from "@material-ui/core";
import { apiRequests } from "../../../../services/apiRequestes";
import { inject, observer } from 'mobx-react';

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
   registerUser = async () => {
    //
    // const res = await apiRequests.registerUser(data)
    // console.log(res)
    // if (res && window.localStorage.getItem('jwtToken') ) window.localStorage.setItem('jwtToken', res.data.token)
    // else window.localStorage.clear()
    // console.log(res, 'resres')
  }
  // handleChange1 = (event) => {
  //   this.props.store.userStore.setNewUser({ ...values, [event.target.name]: event.target.value });
  // };

  // classes = useStyles();

  handelSubmitLoginForm = (values) => {
    console.log("submit form", values);
    console.log(this.props.store)
    // this.props.store.userStore.setNewUser(values)

  };

  handleChange = (prop) => (event) => {
    console.log("handel change", event);

      this.props.store.userStore.setNewUserData({ key: [event.target.name], value: event.target.value });
  };
render() {
    console.log(this.props.store.toJSON(), "dsdfdsfdsf")
  const { classes, store: {userStore: { email, password, confirmPassword, username, groups, firstName, lastName} }} = this.props;
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
                  value={firstName}
                  name="firstName"
                  type="text"
                  fullWidth
                  placeholder="Enter your first name"
                  label="First Name"
                  id="first_name"
                  validations="isSpecialWords"
                  validationError="first name not a valid"
                  onChange={this.handleChange}
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
                      value={lastName}
                      name="lastName"
                      type="text"
                      fullWidth
                      placeholder="Enter your first name"
                      label="First Name"
                      id="first_name"
                      validations="isSpecialWords"
                      onChange={this.handleChange}
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
                  label="Last Name"
                  id="last_name"
                  validations="isSpecialWords"
                  onChange={this.handleChange}
                  validationError="last name not a valid"
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
              onChange={this.handleChange}
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
              value={groups}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
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
        </Formsy>

        <CardActions className="!px-0 !mt-10">
          <Button
              fullWidth
              variant="contained"
              type="submit"
              color="primary"
              size="large"
              className={classes.containedSizeLarge}
          >
            SIGN UP
          </Button>
        </CardActions>
      </CardContent>
  );
}

};

export default withStyles(styles)(inject('store')(observer(SignUpForm)));
