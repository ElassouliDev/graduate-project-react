import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from "react-router-dom";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import './App.css';
import getConfig from './config';
import HorizontalNavbar from "../shared/components/horizontal-navbar";
import ClassCard from "../shared/components/class-card";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
}));
function BlogPost() {
    let { slug } = useParams();
    const [data, setData] = useState({ post: {} });
    const classes = useStyles();

    useEffect(
        () => {
            async function fetchData() {
                // You can await here
                console.log(getConfig().apiUrl, 'sdsdsdsd')
                const result = await axios(
                    `${getConfig().apiUrl}/post/${slug}`
                );
                setData(result.data);
            }
            fetchData();
        });
    return (
        <div style={{ overflowY: "scroll", height: "100%" }}>
            <HorizontalNavbar />
            <Container>
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12}>
                        <h1 className="text-blue-400 text-green-500">Now showing post {data.post.postTitle}</h1>
                    </Grid>
                    <Grid item>
                        <ClassCard />
                    </Grid>
                    <Grid item>
                        <ClassCard />
                    </Grid>
                    <Grid item>
                        <ClassCard />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}



function App() {


    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <BlogPost />
                </Route>
                {/*<Route path="/post/:slug">*/}
                {/*    <BlogPost />*/}
                {/*</Route>*/}
            </Switch>
        </Router>
  );
}

export default App;
