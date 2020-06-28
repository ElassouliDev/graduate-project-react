import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import CustomPageLayout from "../shared/components/custom-page-layout";
import CoursesDashboardPage from "./pages/courses-dashboard-page";
import ParticipationClassroomPage from "./pages/participation/participation";
import Auth from "./pages/auth";
import Material from "./pages/material";
import CustomClassroomLayout from "../shared/components/custom-classroom-layout";
import Videos from "./pages/videos";
import Protected from "../shared/components/Protected/Protected"
import IsLoggedIn from "../shared/components/Protected/IsLoggedIn"
import CourseList from "./pages/course-list";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/auth">
          <IsLoggedIn>
            <Route path="/auth/login">
              <CustomPageLayout>
                <Auth tabValue={0} />
              </CustomPageLayout>
            </Route>
            <Route path="/auth/register">
              <CustomPageLayout>
                <Auth tabValue={1} />
              </CustomPageLayout>
            </Route>
          </IsLoggedIn>
        </Route>
        <Protected>
          <Route exact path="/">
            <CustomPageLayout>
              <CoursesDashboardPage />
            </CustomPageLayout>
          </Route>
          <Route exact path="/Room/:id">
            <CustomPageLayout>
              <ParticipationClassroomPage />
            </CustomPageLayout>
          </Route>
          <Route exact path="/Room/:id/participation">
            <CustomPageLayout>
              <ParticipationClassroomPage />
            </CustomPageLayout>
          </Route>
          <Route path="/Room/:id/videos">
            <CustomPageLayout>
              <Videos />
            </CustomPageLayout>
          </Route>
          <Route path="/Room/:id/material">
            <CustomPageLayout>
              <CustomClassroomLayout>
                <Material />
              </CustomClassroomLayout>
            </CustomPageLayout>
          </Route>
          <Route path="/course/list">
            <CustomPageLayout>
              <CustomClassroomLayout>
                <CourseList />
              </CustomClassroomLayout>
            </CustomPageLayout>
          </Route>
        </Protected>

        <Route path='*' exact={true} component={
          () => <h2>
            Page Not Found 404
            </h2>}
        >
        </Route>
        {/*<Route path="/post/:slug">*/}
        {/*    <BlogPost />*/}
        {/*</Route>*/}
      </Switch>
    </Router >
  );
}

export default App;
