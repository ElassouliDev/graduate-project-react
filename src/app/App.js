import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import CustomPageLayout from "./shared/components/custom-page-layout";
import CoursesDashboardPage from "./pages/courses-dashboard-page";
import ParticipationClassroomPage from "./pages/participation/participation";
import Auth from "./pages/auth";
import CourseMaterial from "./pages/course-material";
import CustomClassroomLayout from "./shared/components/custom-classroom-layout";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <CustomPageLayout>
            <CoursesDashboardPage />
          </CustomPageLayout>
        </Route>
        <Route path="/participation">
          <CustomPageLayout>
            <ParticipationClassroomPage />
          </CustomPageLayout>
        </Route>
        <Route path="/auth">
          <CustomPageLayout>
            <Auth tabValue={0} />
          </CustomPageLayout>
        </Route>
        {/*<Route path="/sign-up">*/}
        {/*  <CustomPageLayout>*/}
        {/*    <Auth tabValue={1} />*/}
        {/*  </CustomPageLayout>*/}
        {/*</Route>*/}
        <Route path="/material">
          <CustomPageLayout>
            <CustomClassroomLayout>
              <CourseMaterial />
            </CustomClassroomLayout>
          </CustomPageLayout>
        </Route>
        {/*<Route path="/post/:slug">*/}
        {/*    <BlogPost />*/}
        {/*</Route>*/}
      </Switch>
    </Router>
  );
}

export default App;
