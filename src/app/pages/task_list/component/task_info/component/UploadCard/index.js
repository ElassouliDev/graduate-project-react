import { Card, Divider, Button, CardHeader } from "@material-ui/core";
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

export default function UploadCard(props) {
  const [listView, setListView] = useState("no file uploaded");
  const [uploadFile, setUploadFile] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }



  function handDeleteFile(id) {
    console.log("delete file ", id);
  }

  // function handleUploadFile(event) {
  //   event.preventDefault();

  //   setUploadFile(event.target.files[0]);
  //   // setUploadFile( );
  //   console.log("upload file ", event.target.files[0]);
  // }

  useEffect(() => {
    setListView(
      props.files>0?props.files.map(
        (file) => {
          return (
            <UploadFileListItem
              file={file}
              handDeleteFile={handDeleteFile}
              DeleteShow={true}
            />
          );
        }

        // React.cloneElement(element, {
        //   key: value,
        // })
      ):"No Solution Exists"
    );
  }, []);


  return (
    <>
    <Card>
      <CardHeader
        // action={
        //   <IconButton color="primary" aria-label="send"
        //     {...{ 'disabled': (uploadFile != null ? false : true) }}
        //   >
        //     <Send />
        //   </IconButton>

        // }
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
        <label htmlFor="upload-file"  className="w-full  text-center" onClick={handleOpen}>
          {/* <input
            style={{ display: "none" }}
            id="upload-file"
            name="upload-file"
            type="file"
            onChange={handleUploadFile}
          /> */}

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
        </label>


      </CardActions>
    </Card>

    <AddSolution handleOpen={handleOpen} handleClose={handleClose} open={open}/>
    </>
  );
}
