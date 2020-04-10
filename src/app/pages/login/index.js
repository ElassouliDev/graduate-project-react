import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { Paper } from '@material-ui/core';
import { Tab } from '@material-ui/core';
import { Tabs } from '@material-ui/core';
import { InputAdornment } from "@material-ui/core";
import { OutlinedInput } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { VisibilityOff } from "@material-ui/icons";
import { Visibility } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

import { Button } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";
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
  }, auth_title: {
    padding:' 21px 0px'
  },
  MuiOutlinedInputInput: {
    fontSize: "14px",
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
      className={"pt-12 m-auto w-1/2 " + classes.auth_dev}
      spacing={2}
    >
      <Paper >
  <Tabs
   // value={value}
    indicatorColor="primary"
    textColor="primary"
   // onChange={handleChange}
   variant="fullWidth"

    aria-label=" tabs example"
  >
    <Tab label="SIGN IN"  />
    <Tab label="SIGN UP" />
  </Tabs>
</Paper>
        <Card className={classes.root}>
          <CardContent>
          <Typography variant="h2" component="h2" className={'text-center mt-30 mb-12 ' + classes.auth_title}>
          Sign in to your account
          </Typography>
            <div className="mb-10">
              <FormControl
                fullWidth
                className={classes.margin+' ' +classes.textFiel}
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
            <Typography ></Typography>
            <FormControl
              fullWidth
              className={classes.margin+' ' +classes.textFiel}
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
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
    </div>
  );
}
