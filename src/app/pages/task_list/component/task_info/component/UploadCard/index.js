import { Card, Divider, Button, CardHeader, Chip } from "@material-ui/core";
import React, { useState } from "react";
import { Fab } from "@material-ui/core";
import { Add, Send } from "@material-ui/icons";
import { CardActions } from "@material-ui/core";
import { List } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { useEffect } from "react";
import UploadFileListItem from "./UploadFileListItem";
import { IconButton } from '@material-ui/core';
import { Save } from "@material-ui/icons";
import AddSolution from "../../../AddSolution";
import classNames from 'classnames';
import { CircularProgress } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { CheckCircle } from '@material-ui/icons';
import { useLocation } from "react-router";
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function UploadCard(props) {
  const [listView, setListView] = useState("no file uploaded");
  const [uploadFile, setUploadFile] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const query  =  useQuery();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }



  function handDeleteFile(id) {
    console.log("delete file ", id);
  }

 const handleSubmitTaskStatus = async (status) => {
  try {
     setLoading(true)
     setMessage("")
     //const payload = props.store.User;
   //  console.log("handleSubmitTaskStatus", payload);
     const formData = new FormData();
     const sol_id = props.files[props.files.length-1].id;
     formData.append('accepted', status)
     console.log('status', status)
     const classRoom = props.store.ClassRoomStore.getClassRoom(props.match.params.id);

     const Task = classRoom.classroom_tasks_info.get(props.match.params.tId)

     const res = await props.store.apiRequests.AcceptOrRejctSolution(sol_id,formData)

      const user_id =query.has("user_id")?query.get("user_id"):0;
     //const res = await props.store.apiRequests.addSolution(props.match.params.tId, formData)
     Task.task_solutions.getUserSolution(user_id).setData({key:"accepted" ,value:status})
      console.log(res);
      //setMessage(res.data.message)
  } catch (err) {
    // setStatus(2)
    setMessage(err.message)
  } finally {
     setLoading(false)

  }
};


  useEffect(() => {
    console.log('props.files', props.files)
    setListView(
      props.files.length>0?props.files.map(
        (file) => {
          return (
            <UploadFileListItem
              file={file.attachment_info}
              handDeleteFile={handDeleteFile}
              DeleteShow={false}
            />
          );
        }


      ):"No Solution Exists"
    );
  },[props.files]);
  console.log('tagttt',   props.task)


  return (
    <>
    <Card>
      <CardHeader
         action={
          props.files.length>0 ?
            <Chip
              color={props.accepted==null? 'default' :props.accepted? "primary":"scondary"}
              label={props.accepted==null? 'Not Review' : props.accepted? "Accepted": "Rejected"}
            ></Chip>
            :""

         }
        title={<Typography variant="h6" className="!mb-2 !text-3xl">
          Solution list
      </Typography>}
      />
      <Divider />

      <CardContent>

        <div>
          <List>{listView}</List>
        </div>
      </CardContent>

      <Divider />

      <CardActions className={'hidden'}>
        {window.localStorage.getItem("groups") != 1 ?
        props.task.accept_solutions?
        <label htmlFor="upload-file"  className="w-full  text-center" onClick={handleOpen}>
          <Fab
            color="primary"
            size="small"
            component="span"
            className="w-full !px-20"
            aria-label="add"
            variant="extended"
          >
            <Add /> Upload File
          </Fab>
          <br />
          <br />
        </label>:""


        :
             props.files.length>0 && props.accepted ==null ?

        <>
        <label htmlFor="upload-file"  className="w-full  text-center" onClick={handleSubmitTaskStatus.bind(this,1)}>
          <Fab
            color="primary"
            size="small"
            component="span"
            className="w-full !px-10"
            aria-label="Accept"
            variant="extended"
          >
            <CheckCircle /> Accept
          </Fab>
          <br />
          <br />
        </label> <label htmlFor="upload-file"  className="w-full  text-center" onClick={handleSubmitTaskStatus.bind(this,0)}>
          <Fab
            color="secondary"
            size="small"
            component="span"
            className="w-full !px-10"
            aria-label="Reject"
            variant="extended"
          >
            <Close /> Reject
          </Fab>
          <br />
          <br />
        </label>
        {loading && <CircularProgress />}
        </>
        :""
      }


      </CardActions>
    </Card>

    <AddSolution handleOpen={handleOpen} handleClose={handleClose} open={open}/>
    </>
  );
}
export default inject('store')(withRouter(observer(UploadCard)));

