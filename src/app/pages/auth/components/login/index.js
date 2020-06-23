import { Typography, makeStyles } from "@material-ui/core";
import classnames from "classnames";
import React, { useEffect, useState } from "react";
import MyInput from "../../../../../shared/components/formasy-input";
import Formsy from "formsy-react";
import { Button } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { apiRequests } from "../../../../services/apiRequestes";

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

const LoginForm = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const classes = useStyles();

  const handelSubmitLoginForm = () => {
    console.log("submit form", values);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChangeCheckBox = () => (event) => {
    setValues({ ...values, [event.target.name]: event.target.checked });
  };

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
          value={values.email}
          name="email"
          type="email"
          fullWidth
          placeholder="Enter your email"
          label="Email"
          id="email"
          validations="isEmail"
          validationError="This is not a valid email"
          onChange={handleChange}
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
          value={values.password}
          name="password"
          type="password"
          fullWidth
          placeholder="Enter your password"
          label="Password"
          id="password"
          validations="minLength:6"
          validationError="This is not a valid password"
          onChange={handleChange}
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

        <FormControlLabel
          value="end"
          control={
            <Checkbox
              checked={values.remember_me}
              onChange={handleChangeCheckBox}
              name="rmember_me"
              oncolor="primary"
              color="primary"

            />
          }
          label="Remember me? "
          labelPlacement="end"
        />
      </Formsy>

      <CardActions className="!px-0 !mt-10">
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          className={classes.containedSizeLarge}
        >
          LOG IN
        </Button>
      </CardActions>
    </CardContent>
  );
};

export default LoginForm;
