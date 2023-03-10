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
import TaskInfo from "./pages/task_info";
import TaskList from "./pages/task_list";
import TaskStudentsList from "./pages/task_students_list";
import Settings from "./pages/courses-dashboard-page/settings"
import Room from "./pages/Room/index.js"
import UpdateMaterial from "./pages/material/components/UpdateMaterial";
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
              <Room />
            </CustomPageLayout>
          </Route>
          <Route exact path="/Room/:id/participation">
            <CustomPageLayout>
              <ParticipationClassroomPage />
            </CustomPageLayout>
          </Route>
          <Route path="/Room/:id/settings">
            <CustomPageLayout>
              <Settings />
            </CustomPageLayout>
          </Route>
          <Route path="/Room/:id/videos">
            <CustomPageLayout>
              <Videos />
            </CustomPageLayout>
          </Route>
          <Route exact path="/Room/:id/material">
            <CustomPageLayout>
              <CustomClassroomLayout>
                <Material />
              </CustomClassroomLayout>
            </CustomPageLayout>
          </Route>
          <Route exact path="/Room/:id/material/:mId">
            <CustomPageLayout>
              <CustomClassroomLayout>
                <UpdateMaterial />
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
          <Route path="/course/list">
            <CustomPageLayout

              aside_show={false}
              nav_item={true}
              add_calssroom={false}
              is_teacher={"teacher" == "teacher"} // check if user is tracher
              nav_action={true}
            >
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
            <CustomPageLayout
              aside_show={false}
              nav_item={true}
              add_calssroom={false}
              is_teacher={"teacher" == "teacher"} // check if user is tracher
              nav_action={true}
            >
              <CustomClassroomLayout>
                <TaskInfo />
              </CustomClassroomLayout>
            </CustomPageLayout>
          </Route>
          <Route path="/classroon/:classroom_id/task/:task_id/student">
            <CustomPageLayout

              aside_show={false}
              nav_item={true}
              add_calssroom={false}
              is_teacher={"teacher" == "teacher"} // check if user is tracher
              nav_action={true}
            >
              <TaskStudentsList />
            </CustomPageLayout>
          </Route>
        </Protected>

        <Route path='*' exact={true} component={
          () => <h2>
            Page Not Found 404
            </h2>}
        >
        </Route>
      </Switch>
    </Router >
  );
}
export default App;
