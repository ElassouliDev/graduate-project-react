/* eslint-disable eqeqeq */
import { Typography, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import Formsy from "formsy-react";
import { Button, CircularProgress } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import MyInput from "../../../../../shared/components/formasy-input"
import DescriptionAlerts from "../../../../../shared/components/alert";
import { Backdrop } from '@material-ui/core';
import { Modal } from '@material-ui/core';
import { Fade } from '@material-ui/core';
import { Card } from '@material-ui/core';

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
const AddSolution = (props) => {

   const [isLoading, setLoading] = useState(false);
   const [helperText, setHelperText] = useState("");
   let [status, setStatus] = useState(0);
   let [message, setMessage] = useState("");
   let classRoom = props.store.ClassRoomStore.getClassRoom(props.match.params.id);
   let [fileTOupload, setFileToUpload] = useState(null);
   let [title, setTitle] = useState('');
;
   const handelSubmit = async () => {
      try {
         setLoading(true)
         setMessage("")
         const payload = props.store.User;
         console.log("add task", payload);
         const attachment = new FormData();
         attachment.append('file', fileTOupload)
         attachment.append('title', title)
         attachment.append('_type', 2)

         const attachments = await props.store.apiRequests.addAttachment(attachment)

         const formData = new FormData();
         formData.append('notes', title)
         formData.append('attachment', attachments.data.id)

         const res = await props.store.apiRequests.addSolution(props.match.params.tId, formData)
        // classRoom.classroom_tasks_info.addNewTask(res.data)
         console.log(res);
         setStatus(1)
         setMessage("task added successully")
      } catch (err) {
         setStatus(2)
         setMessage(err.message)
        props.handleClose();
      } finally {
         setLoading(false)
         props.handleClose();

      }
   };

   const handleChange = (key) => (event) => {
      if (key == "solutionFile") {
         setFileToUpload(event.target.files[0])
         return
      }
         setTitle(event.target.value)

   };

   const classes = useStyles();

   const fields = [
      {
         title: "title",
         name: "title",
         type: "text",
         validations: "isExisty",
         validationError: "This is not a valid",
         required: true
      },
      {
         title: "Solution File",
         name: "solutionFile",
         type: "file",
         validations: "isExisty",
         validationError: "This is not a valid",
         required: true
      }

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
            Add Solution
        </Typography>

         <Formsy className="mb-10" onSubmit={handelSubmit}>
            {
               fields.map((field) =>
                  <MyInput
                     value={
                        field.name == "solutionFile" ? fileTOupload :
                           classRoom.material.newMaterial[field.name]}
                     name={field.name}
                     type={field.type}
                     fullWidth
                     placeholder={"Enter " + capitalizeFLetter(field.title)}
                     label={capitalizeFLetter(field.title)}
                     id={field.name}
                     validations={field.validations}
                     validationError={"This is not a valid " + field.name}
                     onChange={handleChange(field.name)}
                     InputProps={{ classes: { root: classes.inputRoot } }}
                     InputLabelProps={{
                        classes: {
                           root: classes.labelRoot,
                        },
                     }}
                     FormHelperTextProps={{
                        classes: {
                           root: classes.labelRoot,
                        },
                     }}
                     required
                  />
               )
            }
            <Typography>
               {helperText}
            </Typography>
            <DescriptionAlerts status={status} message={message} />

            <CardActions className="!px-0 !mt-10">
               <Button
                                    disabled={isLoading}

                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  className={classes.containedSizeLarge}>
                  Add{isLoading && <CircularProgress />}
               </Button>
               <Button
                  disabled={isLoading}
                  variant="contained"
                  color="secondary"
                  size="large"
                  type="button"
                  onClick={ props.handleClose}
                  className={classes.containedSizeLarge}>
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
export default inject('store')(withRouter(observer(AddSolution)));

