import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import './App.css';
import CustomPageLayout from "../shared/components/custom-page-layout";
import CoursesDashboardPage from "../app/pages/courses-dashboard-page";
import ParticipationClassroomPage from "../app/pages/courses-dashboard-page/participation/participation";
import Test from "../app/pages/courses-dashboard-page/participation/test";


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
                <Route  path="/test">
                    <CustomPageLayout>
                        <Test />
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
