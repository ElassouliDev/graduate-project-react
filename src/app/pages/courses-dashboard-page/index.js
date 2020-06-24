import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import getConfig from "../../config";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ClassCard from "../../../shared/components/class-card";
import { apiRequests } from "../../services/apiRequestes";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
}));
export default function BlogPost() {
    let { slug } = useParams();
    const [data, setData] = useState({ post: {} });
    const classes = useStyles();

    useEffect(
        () => {
            async function fetchData() {
                await apiRequests.getClassRooms()
            }
            fetchData();
        }, []);
    return (
        <div>
            <Container style={{ paddingTop: '7.5rem' }}>
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={6} sm={3}>
                        <ClassCard />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <ClassCard />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <ClassCard />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <ClassCard />
                    </Grid>
                </Grid>
            </Container>

        </div>
    );
}
