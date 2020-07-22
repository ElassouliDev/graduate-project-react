import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import ClassCard from "../../../shared/components/class-card";
import { withStyles } from "@material-ui/core";
import { inject, observer } from 'mobx-react';
import Box from '@material-ui/core/Box';
import AddClassRoom from "./component/AddClassRoom";
import Axios from "axios";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
}));
function BlogPost(props) {

    useEffect(
        () => {
            async function fetchData() {
                try {
                    let res = await props.store.apiRequests.getClassRooms();
                    console.log("res", res);
                    props.store.ClassRoomStore.setClassRooms(res.data);
                } catch (error) {
                    console.log("mappedClassRooms", error.message);
                }
            }
            fetchData();
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
                    props.store.ClassRoomStore.classRooms.map((classRoom) => {
                        return <Box p={1} >
                            <ClassCard {...classRoom} />
                        </Box>
                    })
                }

                <AddClassRoom></AddClassRoom>
            </Box>

        </div>
    );
}
export default withStyles(useStyles)(inject('store')(observer(BlogPost)));