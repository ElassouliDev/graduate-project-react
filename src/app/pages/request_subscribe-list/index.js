import React from "react";
import classNames from "classnames";
import TableActionMenu from '../../../shared/components/table-menu';
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
import { Sync } from '@material-ui/icons';
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

 function RequestSubscribeToClassRoom(props) {
  const classes = useStyles();
  const classRoom = props.store.ClassRoomStore.getClassRoom(props.match.params.id);


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



  const handleOnAcceptFunction = (std_id)=> async (event) => {

    try {
      console.log(1);
      let  formData = new FormData();
      formData.append('student',std_id);

      const res = await props.store.apiRequests.acceptEnrollRequest(formData, props.match.params.id);

      console.log('handleDeleteFunction', std_id);
      console.log('res', res)
       // if (res.status == 204) {
          //classRoom.deleteStudent(std_id);

     // }
    } catch (error) {
      console.log(error.message);
    } finally {
      console.log('finally');

    }


  };
   const handleOnRejectFunction = (std_id)=> async (event) => {

    try {
      console.log(1);
      let  formData = new FormData();
      formData.append('student',std_id);

      const res = await props.store.apiRequests.rejectEnrollRequest(formData, props.match.params.id);

      console.log('handleDeleteFunction', std_id);
      console.log('res', res)
       // if (res.status == 204) {
          classRoom.rejectJoinRequest(std_id);

     // }
    } catch (error) {
      console.log(error.message);
    } finally {
      console.log('finally');

    }


  };

  const  action_menu_items = [
    {
      title:'accept',
      icon:<Done  fontSize="small"/>,
      action:handleOnAcceptFunction
    },  {
      title:'reject',
      icon:<Cancel  fontSize="small"/>,
      action:handleOnRejectFunction
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
       Join  Request
        {/* <Tooltip title="Add" aria-label="add">
                <Fab color="primary" className={classes.fab}>
                  <Add />
                </Fab>
              </Tooltip> */}
      </Typography>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell  component="th"  width="40"></TableCell>
              <TableCell  component="th"  className="!text-3xl"  >Name</TableCell>
              <TableCell  component="th"  className="!text-3xl"   align="left">Username</TableCell>
              <TableCell  component="th"  className="!text-3xl"   align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {classRoom.student_requests_objects.length> 0?
           classRoom.student_requests_objects.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="left" >
                  <Avatar
                    src={row.profile.avatar}
                    size="small"
                    className={classes.small}
                  ></Avatar>
                </TableCell>

                <TableCell  className="!text-2xl" component="th" scope="row " align="left">
                  {row.fullName}
                </TableCell>
                <TableCell className="!text-2xl" align="left">{row.username}</TableCell>

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
    </div>
  );
}
export default inject('store')(withRouter(observer(RequestSubscribeToClassRoom)))
