import React, { useState, useEffect } from "react";
import { Typography, makeStyles } from "@material-ui/core";
import MyInput from "../../../../shared/components/formasy-input";
import Formsy from "formsy-react";
import { Button, CircularProgress } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { inject, observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree'

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
const EditClassRoom = (props) => {
   let [isLoading, setLoading] = useState(false);
   let [helperText, setHelperText] = useState("");
   let [classRoom, setClassRoom] = useState();
   const handelSubmit = async () => {
      try {
         setLoading(true)
         props.store.ClassRoomStore.editClassRoom((classRoom.id, classRoom));

      } catch (err) {

         setLoading(false)
         setHelperText(err.message)

      } finally {
         setLoading(false)
      }
   };
   useEffect(() => {
      setClassRoom(props.store.ClassRoomStore.getClassRoom(props.classRoom.id))
   }, [])
   const handleChange = (key) => (event) => {
      setClassRoom({ ...classRoom, [key]: event.target.value })
   };
   const classes = useStyles();
   if (!classRoom) {
      return <Typography>
         class room not found
      </Typography>
   }
   return (
      <CardContent>
         <Typography
            variant="h4"
            component="h4"
            className="text-center !mt-5 !mb-12"
         >
            Edit Class Room
        </Typography>

         <Formsy className="mb-10" onSubmit={handelSubmit}>
            <MyInput
               value={classRoom.title}
               name="title"
               type="text"
               fullWidth
               placeholder="Enter Title"
               label="Title"
               id="title"
               validations="isSpecialWords"
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
               value={classRoom.description}
               name="description"
               type="text"
               fullWidth
               placeholder="Enter your description"
               label="Descrption"
               id="description"
               validations="isSpecialWords"
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
            {/* 
            <MyInput
               value={classRoom.thumbnail}
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
               value={classRoom.coverImage}
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
            /> */}
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
                  Edit Class Room {isLoading && <CircularProgress />}
               </Button>
            </CardActions>
         </Formsy>
      </CardContent>
   );
}
export default inject('store')(observer(EditClassRoom));
