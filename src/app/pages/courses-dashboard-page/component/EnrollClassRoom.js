import { Typography, makeStyles, Card } from "@material-ui/core";
import React, { useState } from "react";
import MyInput from "../../../../shared/components/formasy-input";
import Formsy from "formsy-react";
import { Button, CircularProgress } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { inject, observer } from 'mobx-react';
import { classRoom } from "../stores"
import { Alert } from '@material-ui/lab';
import { Fab } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import { Fade } from '@material-ui/core';
import { Backdrop } from '@material-ui/core';
import { Modal } from '@material-ui/core';
import { Add } from "@material-ui/icons";

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
   addIconStyle:{
      position: 'fixed',
      right: 50,
      bottom: 50
   }
}));
const EnrollClassroom = (props) => {
   const [isLoading, setLoading] = useState(false);
   const [helperText, setHelperText] = useState("");
   const [classRoomCode, setClassRoomCode] = useState("");

   const [open, setOpen] = React.useState(false);

   const handleOpen = () => {
     setOpen(true);
   };

   const handleClose = () => {
     setOpen(false);
     setClassRoomCode("")
     setHelperText("")
   };

   const handelSubmitAddClassRoom = async () => {
      try {
         setLoading(true)
         let res_jpin = await props.store.apiRequests.enrollClassRoom(classRoomCode)
         let res = await props.store.apiRequests.getClassRooms();
         console.log("res", res);
         props.store.ClassRoomStore.setClassRooms(res.data);
         // if(res.data){
         //    props.store.ClassRoomStore.addClassRoom(res.data);

         // }
         setHelperText(res_jpin.data.message)
         setTimeout(()=> {handleClose()},6000)


      } catch (err) {

         setLoading(false)
         setHelperText(err.message)

      } finally {
         setLoading(false)
      }
   };

   const handleChange = (key) => (event) => {
      const value = event.target.value;
      setClassRoomCode(value)
   };

   const classes = useStyles();

   return (
      <>

   <Tooltip className={classes.addIconStyle} title="Add" aria-label="add" onClick={handleOpen}>
                <Fab color="primary" className={classes.fab}>
                  <Add />
                </Fab>
              </Tooltip>
      <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
      <Card className="w-1/2 mx-auto mt-20">
      <CardContent>
         <Typography
            variant="h3"
            component="h3"
            className="text-center !mt-5 !mb-12"
         >
            Enroll Classroom
        </Typography>

         <Formsy className="mb-10" onSubmit={handelSubmitAddClassRoom}>
            <MyInput
               value={classRoomCode}
               name="classroom_code"
               type="text"
               fullWidth
               placeholder="Enter Classroom Code"
               label="Classroom Code"
               id="classroom_code"
               validations="isExisty"
               validationError="This is not a Classroom Code"
               onChange={handleChange("classroom_code")}
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

            {helperText!=""?<Alert severity="success">{helperText}</Alert>:""}


            <CardActions className="!px-0 !mt-10">

            <Button
               disabled={isLoading}

                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  className={classes.containedSizeLarge}>
                  Send {isLoading && <CircularProgress />}
               </Button>
               <Button

               disabled={isLoading}
                  variant="contained"
                  color="secondary"
                  size="large"
                  type="reset"
                  onClick={handleClose}
                  className={classes.containedSizeLarge}>
                     Cancel
               </Button>
            </CardActions>
         </Formsy>
      </CardContent>

      </Card>
      </Fade>
      </Modal>



      </>
   );
}
export default inject('store')(observer(EnrollClassroom));
