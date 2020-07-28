import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import ClassCard from "../../../shared/components/class-card";
import { withStyles } from "@material-ui/core";
import { inject, observer } from 'mobx-react';
import Box from '@material-ui/core/Box';
import AddClassRoom from "./component/AddClassRoom";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
}));
const classRoom = (props) => {
    console.log(props.store.User.groups, "groups", typeof props.store.User.groups);
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
                {console.log("groups", window.localStorage.getItem("groups"), window.localStorage.getItem("groups") == 1)}
                {

                    // is teacher

                    window.localStorage.getItem("groups") == 1 ? <AddClassRoom></AddClassRoom> : "laskd"
                }

            </Box>

        </div>
    );
}
export default withStyles(useStyles)(inject('store')(observer(classRoom)));