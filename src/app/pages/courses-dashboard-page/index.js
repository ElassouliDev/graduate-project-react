import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import getConfig from "../../config";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ClassCard from "../../../shared/components/class-card";
import { apiRequests } from "../../services/apiRequestes";
import { getSnapshot } from "mobx-state-tree";
import { withStyles } from "@material-ui/core";
import { inject, observer } from 'mobx-react';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
}));
function BlogPost(props) {

    useEffect(
        () => {
            async function fetchData() {
                // await apiRequests.getClassRooms()
            }
            // fetchData();
        }, []);
    return (
        <div style={{ width: '100%' }}>
            <Box
                display="flex"
                flexWrap="wrap"
                p={1}
                m={1}
                bgcolor="background.paper"
                css={{ width: '100%' }}
            >
                {
                    getSnapshot(props.store.ClassRoomStore).classRooms.map((classRoom) => {
                        return <Box p={1} >
                            <ClassCard {...classRoom} />
                        </Box>
                    })
                }
            </Box>

        </div>
    );
}
export default withStyles(useStyles)(inject('store')(observer(BlogPost)));