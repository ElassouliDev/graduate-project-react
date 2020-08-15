import React from "react";
import classNames from "classnames";
import TableActionMenu from '../../../shared/components/table-menu';
import {  Add } from '@material-ui/icons';

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography, Avatar } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";
import { Fab } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { Sync } from '@material-ui/icons';
import AddCourse from "./components/addCourse";
import LoadingProgressPage from "../../../shared/components/loading-progress-page";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  title: {
    flex: "1 1 100%",
  },
  small: {
    width: 40,
    height: 30,
  },
});


 function CourseList(props) {
  const classes = useStyles();
  const classRoom = props.store.ClassRoomStore.getClassRoom(props.match.params.id);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(
    () => {
      async function fetchData() {
        try {
          if (classRoom)
            return
            setLoading(true);
            let res = await props.store.apiRequests.getOneClassRoom(props.match.params.id);
          console.log("res", res);
          props.store.ClassRoomStore.setOneClassRoom(res.data);
        } catch (error) {
            setLoading(true);
            console.log("mappedClassRooms", error.message);
        } finally {
            setLoading(false);
        }
      }
      fetchData();
    }, []);

     if (isLoading) {
         return <LoadingProgressPage />
     }

      if (!classRoom) {
        return <Typography className={'text-center !text-4xl !my-20 bg-gray-400 !py-10'}>class room not found</Typography>;
      }




   const handleDeleteFunction = async(crs_id)=> {

    try {
      console.log(1);


      const res = await props.store.apiRequests.deleteCourse(crs_id);
      console.log("delete ", crs_id);

       // if (res.status == 204) {
          classRoom.course.delete(crs_id);

     // }
    } catch (error) {
      console.log(error.message);
    } finally {
      console.log('finally');

    }


  };

  const  action_menu_items = [
     {
      title:'Delete',
      icon:<Delete  fontSize="small"/>,
      action:handleDeleteFunction
    },
  ];

  return (
    <div className="mb-10">
      <Typography
        className={classNames(classes.title, "py-5 pl-3")}
        variant="h2"
        id="tableTitle"
        component="div"
      >
       Course List
       <Tooltip title="Add" aria-label="add" className="!mx-4 " onClick={handleOpen}>
                <Fab color="primary" className={classes.fab}>
                  <Add />
                </Fab>
              </Tooltip>
      </Typography>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell  component="th"  className="!text-3xl"  align="center"> Title</TableCell>
              <TableCell  component="th"  className="!text-3xl"  >Url</TableCell>
              <TableCell  component="th"  className="!text-3xl"   align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

           { classRoom.course.videos.length>0?
           classRoom.course.videos.map((row) => (
              <TableRow key={row.id}>


                <TableCell  className="!text-2xl" component="th" scope="row "  align="center">
                  {row.title}
                </TableCell>
                <TableCell className="!text-2xl" align="left">{row.description}</TableCell>

                <TableCell className="!text-2xl" align="center"><TableActionMenu items={action_menu_items} item_id={row.id} /></TableCell>
              </TableRow>
            )) :
            <TableRow >
            <TableCell align="center" colSpan={4} className='!text-2xl'>
                 No data exist
              </TableCell>
            </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <AddCourse handleClose={handleClose} handleOpen ={handleOpen} open={open}/>
    </div>
  );
}
export default inject('store')(withRouter(observer(CourseList)))

