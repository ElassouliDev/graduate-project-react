import { Typography, makeStyles, withStyles } from "@material-ui/core";
import React, { Component, useState } from "react";
import MyInput from "../../../../shared/components/formasy-input";
import Formsy from "formsy-react";
import { Button, CircularProgress } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { useHistory } from "react-router-dom"
import { getSnapshot } from "mobx-state-tree"
import { inject, observer } from 'mobx-react';

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

   const handelSubmitAddClassRoom = async () => {
      try {
         setLoading(true)
         let payload = getSnapshot(props.store.ClassRoomStore).newClassRoom;
         console.log(payload);

         props.store.ClassRoomStore.addNewClassRoom(payload);

      } catch (err) {

         setLoading(false)
         setHelperText(err.message)

      } finally {
         setLoading(false)
      }
   };

   const handleChange = (key) => (event) => {
      const value = event.target.value;
      props.store.ClassRoomStore.newClassRoom.setClassRoomData({ key, value })
   };
   const classes = useStyles();

   // id: types.identifierNumber,
   // title: types.optional(types.string, ''),
   // description: types.optional(types.string, ''),
   // coverImage: types.optional(types.string, ''),
   // thumbnail: types.optional(types.string, '')
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
               value={getSnapshot(props.store.ClassRoomStore.newClassRoom).title}
               name="title"
               type="text"
               fullWidth
               placeholder="Enter Title"
               label="Title"
               id="title"
               validations="isEmptyString"
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
               value={getSnapshot(props.store.ClassRoomStore.newClassRoom).descrption}
               name="descrption"
               type="text"
               fullWidth
               placeholder="Enter your descrption"
               label="Descrption"
               id="descrption"
               validations="isEmptyString"
               validationError="This is not a valid descrption"
               onChange={handleChange("descrption")}
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
               value={getSnapshot(props.store.ClassRoomStore.newClassRoom).thumbnail}
               name="thumbnail"
               type="file"
               fullWidth
               placeholder="Enter your thumbnail"
               label="Thumbnail"
               id="thumbnail"
               validations="isEmptyString"
               validationError="This is not a valid thumbnail"
               onChange={handleChange("thumbnail")}
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
               value={getSnapshot(props.store.ClassRoomStore.newClassRoom).coverImage}
               name="coverImage"
               type="file"
               fullWidth
               placeholder="Enter your username"
               label="coverImage"
               id="coverImage"
               validations="isEmptyString"
               validationError="This is not a valid coverImage"
               onChange={handleChange("coverImage")}
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
                  className={classes.containedSizeLarge}
               >
                  Add Class Room {isLoading && <CircularProgress />}
               </Button>
            </CardActions>
         </Formsy>
      </CardContent>
   );
}
export default inject('store')(observer(AddClassRoom));
