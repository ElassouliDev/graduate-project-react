import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import ClassCard from "../../../shared/components/class-card";
import { withStyles } from "@material-ui/core";
import { inject, observer } from 'mobx-react';
import Box from '@material-ui/core/Box';
import AddClassRoom from "./component/AddClassRoom";
import Axios from "axios";
import LoadingProgressPage from '../../../shared/components/loading-progress-page';
import EnrollClassRoom from "./component/EnrollClassRoom";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
}));
function BlogPost(props) {
    const [isLoading, setLoading] = React.useState(false);

    useEffect(
        () => {
            async function fetchData() {
                try {
                    setLoading(true)

                    let res = await props.store.apiRequests.getClassRooms();
                    console.log("res", res);
                    props.store.ClassRoomStore.setClassRooms(res.data);
                } catch (error) {
                    setLoading(false)

                    console.log("mappedClassRooms", error.message);
                } finally {
                    setLoading(false)
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
                {isLoading ?
                    <LoadingProgressPage />
                    :
                    props.store.ClassRoomStore.classRooms.map((classRoom) => {
                        return <Box p={1} >
                            <ClassCard {...classRoom} />
                        </Box>
                    })
                }
                {
                    // is teacher
                    window.localStorage.getItem("groups") == 1 ? <AddClassRoom></AddClassRoom> : <EnrollClassRoom/>
                }

            </Box>

        </div>
    );
}
export default withStyles(useStyles)(inject('store')(observer(BlogPost)));