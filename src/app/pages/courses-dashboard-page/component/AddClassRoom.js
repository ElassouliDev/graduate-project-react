import { Typography, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import MyInput from "../../../../shared/components/formasy-input";
import Formsy from "formsy-react";
import { Button, CircularProgress } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { inject, observer } from 'mobx-react';
import { classRoom } from "../stores/ClassRoomStore"

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
const AddClassRoom = (props) => {
   const [isLoading, setLoading] = useState(false);
   const [helperText, setHelperText] = useState("");
   const [classRoomData, setClassRoomData] = useState({ ...classRoom.create({}).toJSON() })
   const handelSubmitAddClassRoom = async () => {
      try {
         setLoading(true)
         let formData = new FormData();
         delete classRoomData.id
         let cRData = (({ title, description, background_img }) => ({ title, description, background_img }))(classRoomData)
         for (var key in cRData) {
            formData.append(key, classRoomData[key]);
         }
         const res = await props.store.apiRequests.addClassRoom(formData)
         props.store.ClassRoomStore.addClassRoom(res.data);

      } catch (err) {

         setLoading(false)
         setHelperText(err.message)

      } finally {
         setLoading(false)
      }
   };

   const handleChange = (key) => (event) => {
      const value = event.target.value;
      let preClassRoomData = classRoomData;
      preClassRoomData[key] = value
      setClassRoomData(preClassRoomData)
      console.log(classRoomData);
   };

   const handleChangeFile = (key) => (event) => {
      if (event.target.files.length > 0) {
         const value = event.target.files[0];
         let preClassRoomData = classRoomData;
         preClassRoomData[key] = value
         setClassRoomData(preClassRoomData)
         console.log(classRoomData);
      }
   };
   const classes = useStyles();

   return (
      <CardContent>
         <Typography
            variant="h3"
            component="h3"
            className="text-center !mt-5 !mb-12"
         >
            Add new class room
        </Typography>

         <Formsy className="mb-10" onSubmit={handelSubmitAddClassRoom}>
            <MyInput
               value={classRoomData.title}
               name="title"
               type="text"
               fullWidth
               placeholder="Enter Title"
               label="Title"
               id="title"
               validations="isExisty"
               validationError="This is not a valid title"
               onChange={handleChange("title")}
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
            <MyInput
               value={classRoomData.description}
               name="description"
               type="text"
               fullWidth
               placeholder="Enter your description"
               label="Descrption"
               id="description"
               validations="isExisty"
               validationError="This is not a valid description"
               onChange={handleChange("description")}
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
            <MyInput
               value={classRoomData.logo_img}
               name="logo_img"
               type="file"
               fullWidth
               placeholder="Enter your logo_img"
               label="logo_img"
               id="logo_img"
               validationError="This is not a valid logo_img"
               onChange={handleChangeFile("logo_img")}
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
            />
            <MyInput
               value={classRoomData.background_img}
               name="background_img"
               type="file"
               fullWidth
               placeholder="Enter your username"
               label="background_img"
               id="background_img"
               validationError="This is not a valid background_img"
               onChange={handleChangeFile("background_img")}
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
            />
            <Typography>
               {helperText}
            </Typography>
            <CardActions className="!px-0 !mt-10">
               <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  className={classes.containedSizeLarge}>
                  Add Class Room {isLoading && <CircularProgress />}
               </Button>
            </CardActions>
         </Formsy>
      </CardContent>
   );
}
export default inject('store')(observer(AddClassRoom));
