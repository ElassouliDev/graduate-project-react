import { Card, Divider } from "@material-ui/core";
import React, { useState } from "react";
import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { CardActions } from "@material-ui/core";
import { List } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { useEffect } from "react";
import UploadFileListItem from './UploadFileListItem';



export default function UploadCard(props) {
//   const [files, setFiles] = useState([
//     {
//       id: 1,
//       file_name: "file test",
//       file_path: "https://i.ytimg.com/vi/0KEv38tAWm4/maxresdefault.jpg",
//       created_at: "6/6/2020",
//     },
//     {
//       id: 2,
//       file_name: "file test",
//       file_path: "https://i.ytimg.com/vi/0KEv38tAWm4/maxresdefault.jpg",
//       created_at: "6/6/2020",
//     },
//     {
//       id: 3,
//       file_name: "file test",
//       file_path: "https://i.ytimg.com/vi/0KEv38tAWm4/maxresdefault.jpg",
//       created_at: "6/6/2020",
//     },
//     {
//       id: 4,
//       file_name: "file test",
//       file_path: "https://i.ytimg.com/vi/0KEv38tAWm4/maxresdefault.jpg",
//       created_at: "6/6/2020",
//     },
//   ]);

  const [listView, setListView] = useState('no file uploaded');

    function handDeleteFile(id){
        console.log('delete file ' , id);
    }

  useEffect(
    () => {
        setListView( props.files.map((file) =>{
            return  (
                    <UploadFileListItem file={file} handDeleteFile={handDeleteFile} DeleteShow={true} />
                );
        }

        // React.cloneElement(element, {
        //   key: value,
        // })
        ));
    }, []);
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" className="!mb-2">
          File list
        </Typography>
        <Divider />
        <div>
          <List >
              {listView}
          </List>
        </div>
      </CardContent>

      <Divider />

      <CardActions className="">
        <label htmlFor="upload-file" className="w-full  text-center">
          <input
            style={{ display: "none" }}
            id="upload-file"
            name="upload-file"
            type="file"
          />

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
  );
}
