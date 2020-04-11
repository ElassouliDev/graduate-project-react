import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import classnames from "classnames";
import { Paper } from "@material-ui/core";
import { Tab } from "@material-ui/core";
import { Tabs } from "@material-ui/core";
import { Card } from "@material-ui/core";
import LoginForm from "./components/login";
import { Box } from '@material-ui/core';

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
    fontSize: "1.9375rem",
  },
  labelRoot: {
    fontSize: "1.75rem",
  },
  inputRoot: {
    fontSize: "1.75rem",
  },
}));



function TabPanel(props) {
  console.log('tab panel ',props);
  const {  value, index,children, ...other } = props;

  return (
    <div
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >

      {value === index&&<Box>{children}</Box>}
    </div>
  );
}

export default function Login(props) {
  const [tabValue, setTabValue] = React.useState(0);

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

  useEffect(() => {
    if (props.tabValue) {
      setTabValue(props.tabValue);
    }
  }, [tabValue]);






  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const tapPanelProps = (index) => {
    return {
      id: `simple-tabpanel-${index}`,
      "aria-labelledby": `simple-tab-${index}`,
    };
  };
  const handleChange = (event, value) => {
    setTabValue(value);
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
          value={tabValue}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          variant="fullWidth"
          aria-label=" tabs example"
        >
          <Tab
            label="SIGN IN"
            index={0}
            className={classnames(classes.muiTabRoot, "!py-5")}
            {...a11yProps(0)}
          />
          <Tab
            label="SIGN UP"
            index={1}
            className={classnames(classes.muiTabRoot, "!py-5")}
            {...a11yProps(1)}
          />
        </Tabs>
      </Paper>

      <Card className={classes.root}>

        <TabPanel value={tabValue}  index={0}>
           <LoginForm/>
        </TabPanel>
        <TabPanel value={tabValue} index={1} >
        <div hidden={tabValue !== 1} {...tapPanelProps(1)}>
          register form ksdksa;ldk
        </div>
        </TabPanel>
        {/* <LoginForm hidden={tabValue !== 0} {...tapPanelProps(0)} />
        <div hidden={tabValue !== 1} {...tapPanelProps(1)}>
          register form ksdksa;ldk
        </div> */}

        {/* <CardContent>
          <Typography
            variant="h3"
            component="h3"
            className="text-center !mt-5 !mb-12"
          >
            Sign in to your account
          </Typography>

            <Formsy onSubmit={handelSubmitLoginForm()}>
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
            </Formsy>

          <div className="mb-10">
            {/* <Formsy>
              <CardContent>
                <MyInput
                  value="2"
                  fullWidth
                  onChange={handleChange}
                  name="username"
                  type="password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </CardContent>

              <div className="mb-10">
                <FormControl
                  fullWidth
                  className={classes.margin + " " + classes.textField}
                  variant=""
                >
                  <FormasyInput
                    label="Username or email"
                    placeholder="Username or email"
                    name="username"
                    id="standard"
                    onChange={handleChange}
                    value={values.username}
                    fullWidth
                    validations="isEmail"
                    validationError="This is not a valid email"
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
                    required
                  />
                </FormControl>
              </div>
            </Formsy>
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
                validations="isEmail"
                onChange={handleChange("username")}
                labelWidth={125}
              />
            </FormControl>

          </div>

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
       */}
      </Card>
    </div>
  );
}
