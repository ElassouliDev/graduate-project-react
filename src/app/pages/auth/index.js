
import React, { useEffect } from "react";
import classnames from "classnames";
import { Paper } from "@material-ui/core";
import { Tab } from "@material-ui/core";
import { Tabs } from "@material-ui/core";
import { Card } from "@material-ui/core";
import LoginForm from "./components/login";
import SignUpForm from "./components/sign-up";
import { Box } from "@material-ui/core";
import useStyles from './styles';
import getConfig from "../../config";
import { apiRequests } from "../../services/apiRequestes";


function TabPanel(props) {
  console.log("tab panel ", props);
  const { value, index, children, ...other } = props;

  return (
    <div
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default function Auth(props) {
  const [tabValue, setTabValue] = React.useState(0);

  const classes = useStyles();

  useEffect(() => {
//   props.router.push('/foo')
    console.log('router ',props);
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
        <TabPanel value={tabValue} index={0}>
          <LoginForm />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <SignUpForm />
        </TabPanel>
      </Card>
    </div>
  );
}
