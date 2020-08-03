import { Typography, makeStyles, Card } from "@material-ui/core";
import React, { useState } from "react";
import MyInput from "../../../../shared/components/formasy-input";
import Formsy from "formsy-react";
import { Button, CircularProgress } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { Backdrop } from '@material-ui/core';
import { Fade } from '@material-ui/core';
import { Modal } from '@material-ui/core';
import { video } from "../store";


const useStyles = makeStyles((theme) => ({
   labelRoot: {
      fontSize: "1.75rem",
   },
   inputRoot: {
      fontSize: "1.75rem",
   },
   containedSizeLarge: {
      fontSize: "1.75rem",
   },
}));
const AddCourse = (props) => {
   const { store: {
      ClassRoomStore: { getClassRoom },
   } } = props;
   let classRoom = getClassRoom(props.match.params.id);

   const [isLoading, setLoading] = useState(false);
   const [helperText, setHelperText] = useState("");
   const [videoData, setVideoData] = useState({ ...video.create({}).toJSON() })

   const handelSubmit = async () => {
      try {
         setLoading(true)


         let  formData = new FormData();
         let cRData = (({ title,description}) => ({title , description}))(video)
          for (var key in cRData) {
            formData.append(key, videoData[key]);
          }


    //    const res = await props.store.apiRequests.addCourse(formData);
       // console.log('res', res.data)
        cRData = (({ media_data}) => ({media_data}))(video)

        console.log('res11', cRData)
        console.log('path',classRoom.courses.newVideo.media_data);

        formData = new FormData();
        formData.append('path',classRoom.courses.newVideo.media_data['path']);

       // formData.append('course',res.data.id);
        formData.append('provider',1);
      //  console.log('id course', res.data.id)
      //  const res1 = await props.store.apiRequests.addMedia(formData);
      //  console.log('res1', res1.data)

   //     setVideoData(res.data);
          let preVideoData =  videoData['apiRequests'];
       //   preVideoData['apiRequests'] =res1.data;
          setVideoData(preVideoData )

       //   if(res.status == 200 && res.data )
       //   classRoom.course.addNewVideo(res.data);


      } catch (err) {

         setLoading(false)
         setHelperText(err.message)

      } finally {
         setLoading(false)
         props.handleClose()

      }
   };



   const handleChange = (key) => (event) => {
      const value = event.target.value;
      let preVideoData = videoData;
      if(key == 'file')
      videoData[key] = event.target.files[0]
      else
      preVideoData[key] = value

      setVideoData(preVideoData)

   };
   const classes = useStyles();
   const fields = [

       {
        title: "Title",
          name: "title",
          value: classRoom.course.newVideo['title'],
          type: "text",
          validations: "isExisty",
          validationError: "This is not a valid",
          required: true
       },
        {
            title: "description",

          name: "description",
          value: classRoom.course.newVideo['description'],

          type: "text",
          validations: "isExisty",
          validationError: "This is not a valid",
          required: true
       },
        {
          title: "Url",
          name: "path",
          value: classRoom.course.newVideo.media_data['path'],

          type: "url",
          validations: "isExisty",
          validationError: "This is not a valid",
          required: true
       },


   ]
   function capitalizeFLetter(input) {
      if (input.length == 0)
         return ""
      return input[0].toUpperCase() +
         input.slice(1);
   }
   if (!classRoom) {
      return <div>
         class room not found
      </div>
   }

   return (
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
                <Fade in={props.open}>
      <Card className="w-1/2 mx-auto mt-20">
      <CardContent>
         <Typography
            variant="h3"
            component="h3"
            className="text-center !mt-5 !mb-12"
         >
            Add  Course
        </Typography>

         <Formsy className="mb-10" onSubmit={handelSubmit}>
            {
               fields.map((field) =>
                  <MyInput
                    key={field.name}
                     value={field.value}
                     name={field.name}
                     type={field.type}
                     fullWidth
                     placeholder={"Enter " + capitalizeFLetter(field.title)}
                     label={capitalizeFLetter(field.name)}
                     id={field.name}
                     validations={field.validations}
                     validationError={"This is not a valid " + field.name}
                     onChange={handleChange(field.name)}
                     InputProps={{ classes: { root: classes.inputRoot } }}
                     InputLabelProps={{
                        classes: {
                           root: classes.labelRoot,
                           // focused: classes.labelFocused
                        },
                     }}
                     FormHelperTextProps={{
                        classes: {
                           root: classes.labelRoot,
                           // focused: classes.labelFocused
                        },
                     }}
                     required
                  />
               )
            }
            <Typography>
               {helperText}
            </Typography>
            <CardActions className="!px-0 !mt-10">
               <Button
                              disabled={isLoading}

                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  className={classes.containedSizeLarge}>
                  Save  {isLoading && <CircularProgress />}
               </Button>
               <Button
                              disabled={isLoading}

                  variant="contained"
                  color="secondary"
                  size="large"
                  type="reset"
                  className={classes.containedSizeLarge}
                  onClick={props.handleClose}
                  >
                  Cancel
               </Button>
            </CardActions>
         </Formsy>
      </CardContent>
      </Card>
      </Fade>

      </Modal>

   );
}
export default inject('store')(withRouter(observer(AddCourse)));
