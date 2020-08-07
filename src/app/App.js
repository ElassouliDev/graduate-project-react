import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import CustomPageLayout from "../shared/components/custom-page-layout";
import CoursesDashboardPage from "./pages/courses-dashboard-page";
import ParticipationClassroomPage from "./pages/participation";
import Auth from "./pages/auth";
import Material from "./pages/material";
import CustomClassroomLayout from "../shared/components/custom-classroom-layout";
import Videos from "./pages/videos";
import Protected from "../shared/components/Protected/Protected"
import IsLoggedIn from "../shared/components/Protected/IsLoggedIn"
import CourseList from "./pages/course-list";
import TaskInfo from "./pages/task_list/component/task_info";
import TaskList from "./pages/task_list";
import TaskStudentsList from "./pages/task_list/component/task_students_list";
import Settings from "./pages/Room/settings"
import Room from "./pages/Room/index.js"
import UpdateMaterial from "./pages/material/components/UpdateMaterial";
import Chat from './pages/chat';
import RequestSubscribeToClassRoom from './pages/request_subscribe-list';
import ClassroomStudentList from './pages/classroom_student_list';
import { inject, observer } from "mobx-react";

const keys = {
  groups: 'groups',
  username: "username"
}


function App(props) {
  React.useEffect(() => {
    console.log("App useEffect");
    // ? find out user groups and store it in the User
    if (window.localStorage.getItem(keys.groups) != null) {
      const groups = +window.localStorage.getItem(keys.groups)
      props.store.User.setUserData(keys.groups, groups);
    }
    if (window.localStorage.getItem(keys.username) != null) {
      const username = +window.localStorage.getItem(keys.username)
      props.store.User.setUserData(keys.username, username);
    }


  }, [])
  console.log("groups", props.store.User.groups);
  console.log("groups", window.localStorage.getItem(keys.groups));
  return (
    <Router>
      <Switch>
        <Route path="/auth">
          <IsLoggedIn>
            <Route path="/auth/login">
              <CustomPageLayout
               aside_show={false}
               nav_item={false}
               add_calssroom={false}
              >
                <Auth tabValue={0} />
              </CustomPageLayout>
            </Route>
            <Route path="/auth/register">
              <CustomPageLayout
               aside_show={false}
               nav_item={false}
               add_calssroom={false}
              >
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
              <CustomClassroomLayout>

                <Settings />
              </CustomClassroomLayout>
            </CustomPageLayout>
          </Route>
          <Route path="/Room/:id/videos/manage">
            <CustomPageLayout>
              <CustomClassroomLayout>
                <CourseList />
              </CustomClassroomLayout>
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
          <Route exact path="/Room/:id/join-request">
            <CustomPageLayout>
              <CustomClassroomLayout>
                <RequestSubscribeToClassRoom />
              </CustomClassroomLayout>
            </CustomPageLayout>
          </Route>
          <Route exact path="/Room/:id/students">
            <CustomPageLayout>
              <CustomClassroomLayout>
                <ClassroomStudentList />
              </CustomClassroomLayout>
            </CustomPageLayout>
          </Route>
          <Route path="/chat">
            <CustomPageLayout>
              <Chat />
            </CustomPageLayout>
          </Route>
          <Route exact path="/Room/:id/tasks">
            <CustomPageLayout
              aside_show={false}
              nav_item={false}
              add_calssroom={false}
              is_teacher={"teacher" == "teacher"} // check if user is tracher
              nav_action={true}
            >
              <CustomClassroomLayout>
                <TaskList />
              </CustomClassroomLayout>
            </CustomPageLayout>
          </Route>
          <Route exact path="/Room/:id/tasks/:tId">
            <CustomPageLayout
              aside_show={false}
              nav_item={false}
              add_calssroom={false}
              is_teacher={"teacher" == "teacher"} // check if user is tracher
              nav_action={true}
            >
              <CustomClassroomLayout>
                <TaskInfo />
              </CustomClassroomLayout>
            </CustomPageLayout>
          </Route>
          <Route exact path="/classroon/:classroom_id/task/:task_id/student">
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
export default inject("store")(observer(App));
