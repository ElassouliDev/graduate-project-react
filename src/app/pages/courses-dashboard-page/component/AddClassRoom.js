import { Typography, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import MyInput from "../../../../shared/components/formasy-input";
import Formsy from "formsy-react";
import { Button, CircularProgress } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
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

         props.store.ClassRoomStore.addNewClassRoom();

      } catch (err) {

         setLoading(false)
         setHelperText(err.message)

      } finally {
         setLoading(false)
      }
   };

   const handleChange = (key) => (event) => {
      const value = event.target.value;
      props.store.ClassRoomStore.setClassRoomData({ key, value })
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
               value={props.store.ClassRoomStore.newClassRoom.title}
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
               value={props.store.ClassRoomStore.newClassRoom.description}
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
               value={props.store.ClassRoomStore.newClassRoom.thumbnail}
               name="thumbnail"
               type="file"
               fullWidth
               placeholder="Enter your thumbnail"
               label="Thumbnail"
               id="thumbnail"
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
               value={props.store.ClassRoomStore.newClassRoom.coverImage}
               name="coverImage"
               type="file"
               fullWidth
               placeholder="Enter your username"
               label="coverImage"
               id="coverImage"
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
                  className={classes.containedSizeLarge}>
                  Add Class Room {isLoading && <CircularProgress />}
               </Button>
            </CardActions>
         </Formsy>
      </CardContent>
   );
}
export default inject('store')(observer(AddClassRoom));
