import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import './App.css';
import CustomPageLayout from "../shared/components/custom-page-layout";
import CoursesDashboardPage from "../app/pages/courses-dashboard-page";
import ParticipationClassroomPage from "./pages/participation/participation";

import Login from './pages/login';


function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <CustomPageLayout>
                        <CoursesDashboardPage />
                    </CustomPageLayout>
                </Route>
                <Route  path="/participation">
                    <CustomPageLayout>
                        <ParticipationClassroomPage />
                    </CustomPageLayout>
                </Route>
                <Route  path="/login">
                    <CustomPageLayout>
                        <Login />
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
