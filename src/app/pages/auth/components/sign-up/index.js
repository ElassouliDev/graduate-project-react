import { Typography, makeStyles, Grid } from "@material-ui/core";
import classnames from "classnames";
import React, { useEffect, useState } from "react";
import MyInput from "../../../../../shared/components/formasy-input";
import Formsy from "formsy-react";
import { Radio } from "@material-ui/core";
import { RadioGroup } from "@material-ui/core";
import { FormLabel } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
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

const SignUpForm = () => {
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    accountType: "teacher",
    password: "",
    confirm_password: "",
  });

  const handleChange1 = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const classes = useStyles();

  const handelSubmitLoginForm = () => {
    console.log("submit form", values);
  };

  const handleChange = (prop) => (event) => {
    console.log("handel change", event);
    // setValues({ ...values, [prop]: event.target.value });
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <CardContent>
      <Typography
        variant="h3"
        component="h3"
        className="text-center !mt-5 !mb-12"
      >
        Create new account
      </Typography>

      <Formsy className="mb-10" onSubmit={handelSubmitLoginForm()}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <MyInput
              value={values.email}
              name="first_name"
              type="text"
              fullWidth
              placeholder="Enter your first name"
              label="First Name"
              id="first_name"
              validations="isSpecialWords"
              validationError="first name not a valid"
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
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <MyInput
              value={values.email}
              name="last_name"
              type="text"
              fullWidth
              placeholder="Enter your last name"
              label="Last Name"
              id="last_name"
              validations="isSpecialWords"
              validationError="last name not a valid"
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
          </Grid>
        </Grid>
        <MyInput
          value={values.email}
          name="email"
          type="email"
          fullWidth
          placeholder="Enter your email"
          label="Email"
          id="email"
          validations="isEmail"
          validationError="This is not a valid email  "
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
          value={values.phone}
          name="phone"
          type="number"
          fullWidth
          placeholder="Enter your phone number"
          label="Phone Number"
          id="phone"
          validations="isLength:10"
          validationError="This is not a valid phone number"
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
          value={values.date_of_birth}
          name="date_of_birth"
          type="date"
          fullWidth
          placeholder="Enter your date of birth"
          label="Date of Birth"
          id="date_of_birth"
          validationError="This is not a valid date of birth"
          onChange={handleChange}
          InputProps={{ classes: { root: classes.inputRoot } }}
          InputLabelProps={{
            shrink: true,
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
          name="accountType"
          value={values.accountType}
          onChange={handleChange1}
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
        <MyInput
          value={values.confirm_password}
          name="confirm_password"
          type="password"
          fullWidth
          placeholder="Confirm your password"
          label="Confirm Password"
          id="confirm_password"
          validations="equalsField:password"
          validationError="Confirm password not match with password"
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
};

export default SignUpForm;
