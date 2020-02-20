import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from "react-router-dom";
import axios from 'axios';
import './App.css';
import getConfig from './config';



function BlogPost() {
    let { slug } = useParams();
    const [data, setData] = useState({ post: {} });
    useEffect(
        () => {
            async function fetchData() {
                // You can await here
                const result = await axios(
                    `${getConfig.apiUrl}/post/${slug}`
                );
                setData(result.data);
            }
            fetchData();
        });
    return <div>Now showing post {data.post.postTitle}</div>;
}



function App() {


    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <h1>React Home Page</h1>
                </Route>
                <Route path="/post/:slug">
                    <BlogPost />
                </Route>
            </Switch>
        </Router>
  );
}

export default App;
