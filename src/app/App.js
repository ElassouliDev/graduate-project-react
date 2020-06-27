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
import CourseList from "./pages/course-list";
import TaskInfo from './pages/task_info';
import TaskList from './pages/task_list';
import TaskStudentsList from './pages/task_students_list';

function App() {
  return (
    <Router>

      <Switch>
        <Route exact path="/">
            <CoursesDashboardPage />
        </Route>
        <Route path="/participation">
          <CustomPageLayout>
            <ParticipationClassroomPage />
          </CustomPageLayout>
        </Route>
        <Route path="/videos">
          <CustomPageLayout>
            <Videos />
          </CustomPageLayout>
        </Route>
        <Route path="/auth">
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
        </Route>
        <Route path="/material">
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
        <Route path="/task/list">
          <CustomPageLayout>
              <TaskList />
          </CustomPageLayout>
        </Route>

        <Route path="/task/:id">
          <CustomPageLayout>
            <CustomClassroomLayout>
              <TaskInfo />
            </CustomClassroomLayout>
          </CustomPageLayout>
        </Route>

        <Route path="/classroon/:classroom_id/task/:task_id/student">
          <CustomPageLayout>
              <TaskStudentsList />
          </CustomPageLayout>
        </Route>

        <Route
          path="*"
          exact={true}
          component={() => <h2>Page Not Found 404</h2>}
        >
        </Route>

        {/*<Route path="/post/:slug">*/}
        {/*    <BlogPost />*/}
        {/*</Route>*/}
      </Switch>

    </Router>
  );
}

export default App;
