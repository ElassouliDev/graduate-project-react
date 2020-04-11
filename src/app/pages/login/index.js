import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import CustomPageLayout from "../../../shared/components/custom-page-layout";
import ThreeDotsMenu from "../../../shared/components/three-dots-menu";
import classnames from "classnames";
import { AppBar } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Tab } from "@material-ui/core";
import { Tabs } from "@material-ui/core";
import { InputAdornment } from "@material-ui/core";
import { OutlinedInput } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { VisibilityOff } from "@material-ui/icons";
import { Visibility } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Typography, MuiThemeProvider } from "@material-ui/core";
import { CardActionArea } from "@material-ui/core";
import { Card } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  MuiInputLabelOutlined: {
    fontSize: "15px",
    fontWeight: 700,
  },
  auth_dev: {
    marginTop: "4rem",
  },
  form_label: {
    fontSize: "14px",
    fontWeight: 600,
  },
  auth_title: {
    padding: " 21px 0px",
  },
  MuiOutlinedInputInput: {
    fontSize: "14px",
  },
  muiTabRoot: {
    fontSize: "1.875rem",
    fontWeight: "600",
    backgroundColor: "#f1f1f1",
  },
  containedSizeLarge: {
    fontSize: '1.9375rem'
  },
}));

export default function Login() {
  let { slug } = useParams();
  const [values, setValues] = React.useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);

  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      // You can await here
      //  console.log(getConfig().apiUrl, "sdsdsdsd");
      //   const result = await axios(`${getConfig().apiUrl}/post/${slug}`);
      //   setData(result.data);
    }
    fetchData();
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };



  return (
    <div
      container
      className={classnames(
        "pt-12 m-auto  md:w-1/2 sm:w-full lg:w-1/2 xl:w-1/2 ",
        classes.auth_dev
      )}
      spacing={2}
    >
      <Paper>
        <Tabs
          value={0}
          indicatorColor="primary"
          textColor="primary"
          // onChange={handleChange}
          variant="fullWidth"
          aria-label=" tabs example"
        >
          <Tab
            label="SIGN IN"
            className={classnames(classes.muiTabRoot, "!py-5")}
          />
          <Tab
            label="SIGN UP"
            className={classnames(classes.muiTabRoot, "!py-5")}
          />
        </Tabs>
      </Paper>


      <Formsy>
      <CardContent>
        <div className="mb-10">
          <FormControl
            fullWidth
            className={classes.margin + " " + classes.textField}
            variant="outlined"
          >
            <FormasyInput
              label="Username or email"
              placeholder="Username or email"
              name="username"
              id="standard"
              onChange={handleChange}
              value={values.username}
              validations="isEmail"
              validationError="This is not a valid email"
              required
            />
          </FormControl>
        </div>
        <div className="mb-10">
          <FormControl
            fullWidth
            className={classes.margin + " " + classes.textFiel}
            variant="outlined"
          >
            <FormasyInput
              label="Password"
              placeholder="Enter your password"
              name="password"
              id="password"
              onChange={handleChange}
              type="password"
              value={values.password}
              validations="isEmail"
              validationError="This is not a valid password"
              required
            />
          </FormControl>
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Login
        </Button>
      </CardActions>
      </Formsy>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            variant="h3"
            component="h3"
            className="text-center !mt-5 !mb-12"
          >
            Sign in to your account
          </Typography>
          <div className="mb-10">
            <FormControl
              fullWidth
              className={classes.margin + " " + classes.textFiel}
              variant="outlined"
            >
              <InputLabel
                className={classes.form_label}
                htmlFor="outlined-adornment-username"
              >
                Username or email
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-username"
                type="text"
                value={values.email}
                onChange={handleChange("username")}
                labelWidth={125}
              />
            </FormControl>
          </div>
          <Typography></Typography>
          <FormControl
            fullWidth
            className={classes.margin + " " + classes.textFiel}
            variant="outlined"
          >
            <InputLabel
              className={classes.form_label}
              htmlFor="outlined-adornment-password"
            >
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
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
      </Card>
    </div>
  );
}
