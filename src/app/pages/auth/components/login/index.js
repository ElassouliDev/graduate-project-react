import { Typography, makeStyles, withStyles } from "@material-ui/core";
import React, { Component, useState } from "react";
import MyInput from "../../../../../shared/components/formasy-input";
import Formsy from "formsy-react";
import { Button, CircularProgress } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { useHistory } from "react-router-dom"
import { getSnapshot } from "mobx-state-tree"
import { inject, observer } from 'mobx-react';

const useStyles = makeStyles((theme) => ({
  labelRoot: {
    fontSize: "1.75rem",
  },
  inputRoot: {
    fontSize: "1.75rem",
  },
  containedSizeLarge: {
    fontSize: "1.75rem",
  },
}));
const LoginForm = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [helperText, setHelperText] = useState("");
  let history = useHistory();


  const handelSubmitLoginForm = async () => {
    try {
      setLoading(true)
      setHelperText("")
      const payload = getSnapshot(props.store.LoginStore);
      console.log("login", payload);
      const res = await props.store.apiRequests.loginUser({ username: payload.username, password: payload.password })
      console.log(res);

      if (res.data.auth_token) {
        window.localStorage.setItem('jwtToken', res.data.auth_token)
        history.push("/")
      }
    } catch (err) {
      window.localStorage.clear()
      if (err.non_field_errors) {
        if (err.non_field_errors.length > 0) {
          setHelperText(err.non_field_errors[0])
          return;
        } else {
          setHelperText("The provided password and email is not correct")
          return;
        }
      } else {
        if (err.message) {
          setHelperText(err.message)

        }
      }
    } finally {
      setLoading(false)
    }
  };

  const handleChange = (key) => (event) => {
    props.store.LoginStore.setUserData({ key, value: event.target.value })
  };

  const classes = useStyles();

  return (
    <CardContent>
      <Typography
        variant="h3"
        component="h3"
        className="text-center !mt-5 !mb-12"
      >
        Sign in to your account
        </Typography>

      <Formsy className="mb-10" onSubmit={handelSubmitLoginForm}>
        <MyInput
          value={getSnapshot(props.store.LoginStore).email}
          name="text"
          type="text"
          fullWidth
          placeholder="Enter your username"
          label="Email"
          id="username"
          validations="isSpecialWords"
          validationError="This is not a valid username"
          onChange={handleChange("username")}
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
          value={getSnapshot(props.store.LoginStore).password}
          name="password"
          type="password"
          fullWidth
          placeholder="Enter your password"
          label="Password"
          id="password"
          validations="minLength:6"
          validationError="This is not a valid password"
          onChange={handleChange("password")}
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
        {helperText}
        <CardActions className="!px-0 !mt-10">
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            className={classes.containedSizeLarge}
          >
            LOG IN {isLoading && <CircularProgress />}
          </Button>
        </CardActions>
      </Formsy>
    </CardContent>
  );
}

export default withStyles(useStyles)(inject('store')(observer(LoginForm)));
