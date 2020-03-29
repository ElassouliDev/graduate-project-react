import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import getConfig from "../../../config";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ClassCard from "../../../../shared/components/class-card";
import { CardMedia } from '@material-ui/core';
import { Card } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
}));
export default function BlogPost() {
    let { slug } = useParams();
    const [data, setData] = useState({ post: {} });
    const classes = useStyles();
const styles = {
  card: {
    margin: "120px auto 50px",
    maxWidth: 345,
    overflow: "visible"
  },
  media: {
    margin: "-70px auto 0",
    width: "80%",
    height: 140,
    borderRadius: "4px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
    position: "relative",
    zIndex: 1000
  }
};
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
        <div>


            <Container style={{ paddingTop: '7.5rem'}}>

                <Card>
                <CardMedia
                   className={classes.media}
                    image="/static/images/cards/paella.jpg"
                    title="Paella dish"
                    />
                </Card>
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