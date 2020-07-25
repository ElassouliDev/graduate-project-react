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

const rows = [
  createData(
    "1",
    "yehia elassouli",
    "yehia@gmain.com",
    "https://kooledge.com/assets/default_medium_avatar-57d58da4fc778fbd688dcbc4cbc47e14ac79839a9801187e42a796cbd6569847.png"
  ),
  createData(
    "1",
    "yehia elassouli",
    "yehia@gmain.com",
    "https://kooledge.com/assets/default_medium_avatar-57d58da4fc778fbd688dcbc4cbc47e14ac79839a9801187e42a796cbd6569847.png"
  ),
  createData(
    "1",
    "yehia elassouli",
    "yehia@gmain.com",
    "https://kooledge.com/assets/default_medium_avatar-57d58da4fc778fbd688dcbc4cbc47e14ac79839a9801187e42a796cbd6569847.png"
  ),
  createData(
    "1",
    "yehia elassouli",
    "yehia@gmain.com",
    "https://kooledge.com/assets/default_medium_avatar-57d58da4fc778fbd688dcbc4cbc47e14ac79839a9801187e42a796cbd6569847.png"
  ),
];

function ClassroomStudentList(props) {
  const classes = useStyles();
  const classRoom = props.store.ClassRoomStore.getClassRoom(props.match.params.id);
  const [open, setOpen] = React.useState(false);

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
        if (classRoom)
          return
        let res = await props.store.apiRequests.getOneClassRoom(props.match.params.id);
        console.log("res", res);
        props.store.ClassRoomStore.setOneClassRoom(res.data);
      } catch (error) {
        console.log("mappedClassRooms", error.message);
      }
    }
    fetchData();
  }, []);
if (!classRoom) {
  return <Typography>class room not found</Typography>;
}


  const handleDelete = (id) => async (event) => {
    try {
      const res = await props.store.apiRequests.deleteMaterial(props.match.params.id, id)
      if (res.status == 204) {
        classRoom.material.delete(id)
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleDeleteFunction = (event)=>{

    console.log('handleDeleteFunction', event);
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
            {classRoom.student_objects.map((row) => (
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddStudent handleOpen={handleOpen} handleClose={handleClose} open={open}/>

    </div>
  );
}
export default inject('store')(withRouter(observer(ClassroomStudentList)))