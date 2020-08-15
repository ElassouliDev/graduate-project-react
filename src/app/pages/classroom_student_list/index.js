import React from "react";
import classNames from "classnames";
import TableActionMenu from '../../../shared/components/table-menu';
import { Fab } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import { DeleteForever, Add } from '@material-ui/icons';
import { Done } from '@material-ui/icons';
import { Cancel } from '@material-ui/icons';
import { ThumbUp } from '@material-ui/icons';
import { Grid } from "@material-ui/core";
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
import AddStudent from "./components/addStudent";
import { AlertTitle } from '@material-ui/lab';
import { Alert } from '@material-ui/lab';
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

function createData(id, name, email_or_user_name, image) {
  return { id, name, email_or_user_name, image };
}



function ClassroomStudentList(props) {
  const classes = useStyles();
  const classRoom = props.store.ClassRoomStore.getClassRoom(props.match.params.id);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    console.log('open modal ')
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(
  () => {
    async function fetchData() {
      try {
        if (classRoom) return;
        setLoading(true);
        let res = await props.store.apiRequests.getOneClassRoom(props.match.params.id);
        console.log("res", res);
        props.store.ClassRoomStore.setOneClassRoom(res.data);
      } catch (error) {
        console.log("mappedClassRooms", error.message);
        setLoading(false);
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




  const handleDeleteFunction = (std_id)=>async (event) =>{
    try {
      console.log(1);
      let  formData = new FormData();
      formData.append('student',std_id);
      console.log("id", std_id)
      console.log("classroom _id ", props.match.params.id)
      const res = await props.store.apiRequests.deleteStudent(formData, props.match.params.id);

      console.log('handleDeleteFunction', std_id);
       // if (res.status == 204) {
          classRoom.deleteStudent(std_id);

       // classRoom.material.delete(id)
     // }
    } catch (error) {
      console.log(error.message);
    }

  };

  const  action_menu_items = [
    {
      title:'delete',
      icon:<DeleteForever  fontSize="small"/>,
      action:handleDeleteFunction
    }
  ];

  return (
    <div className="mb-10">
      <Typography
        className={classNames(classes.title, "py-5 pl-3")}
        variant="h2"
        id="tableTitle"
        component="div"
      >
       Student List
        <Tooltip className="!mx-3" title="Add" aria-label="add" onClick={handleOpen}>
                <Fab color="primary" className={classes.fab}>
                  <Add />
                </Fab>
              </Tooltip>



    {/* <Alert severity="success">
  <AlertTitle>Success</AlertTitle>
  This is a success alert — <strong>check it out!</strong>
</Alert> */}
      </Typography>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell  component="th"  width="40"></TableCell>
              <TableCell  component="th"  className="!text-3xl" >Name</TableCell>
              <TableCell  component="th"  align="left" className="!text-3xl">Username</TableCell>
              <TableCell  component="th"  align="center" className="!text-3xl">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classRoom.student_objects.length > 0 ?
            classRoom.student_objects.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="left">
                  <Avatar
                    src={row.profile.avatar}
                    size="small"
                    className={classes.small}
                  ></Avatar>
                </TableCell>

                <TableCell component="th" scope="row " align="left" className="!text-2xl">
                  {row.fullName}
                </TableCell>
                <TableCell align="left"  className="!text-2xl">{row.username}</TableCell>

                <TableCell align="center"><TableActionMenu items={action_menu_items} item_id={row.id} /></TableCell>
              </TableRow>
            )):
            <TableRow >
          <TableCell align="center" colSpan={4} className='!text-2xl'>
               No data exist
            </TableCell>
          </TableRow>
          }
          </TableBody>
        </Table>
      </TableContainer>
      <AddStudent handleOpen={handleOpen} handleClose={handleClose} open={open}/>

    </div>
  );
}
export default inject('store')(withRouter(observer(ClassroomStudentList)))
