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
const AddMaterial = (props) => {

   const [isLoading, setLoading] = useState(false);
   const [helperText, setHelperText] = useState("");
   let [status, setStatus] = useState(0);
   let [message, setMessage] = useState("");
   let classRoom = props.store.ClassRoomStore.getClassRoom(props.match.params.id);
   let [fileTOupload, setFileToUpload] = useState(null);
;
   const handelSubmit = async () => {
      try {
         setLoading(true)
         setMessage("")
         const payload = props.store.User;
         console.log("add task", payload);
         const task = classRoom.classroom_tasks_info.newTask;
         const attachment = new FormData();
         attachment.append('file', fileTOupload)
         attachment.append('title', task.title)
         attachment.append('_type', 2)

         const attachments = await props.store.apiRequests.addAttachment(attachment)

         const formData = new FormData();
         formData.append('title', task.title)
         formData.append('content', task.content)
         formData.append('attachments', attachments.data.id)

         const res = await props.store.apiRequests.addTask(classRoom.id, formData)
         classRoom.classroom_tasks_info.addNewTask(res.data)
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
      if (key == "taskFile") {
         setFileToUpload(event.target.files[0])
         return
      }
      if (key == "accept_solutions") {
         const value = event.target.checked;
         classRoom.classroom_tasks_info.newTask.setNewData({ key, value })
         return
      }
      const value = event.target.value;
      classRoom.classroom_tasks_info.newTask.setNewData({ key, value })
   };

   const classes = useStyles();

   const fields = [
      {
         name: "title",
         type: "text",
         validations: "isExisty",
         validationError: "This is not a valid",
         required: true
      },
      {
         name: "content",
         type: "text",
         validations: "isExisty",
         validationError: "This is not a valid",
         required: true
      },
      {
         name: "taskFile",
         type: "file",
         validations: "isExisty",
         validationError: "This is not a valid",
         required: true
      },
      {
         name: "accept_solutions_due",
         type: "date",
         validations: "isExisty",
         validationError: "This is not a valid",
         required: true
      },
      // {
      //    name: "accept_solutions",
      //    type: "checkbox",
      //    validations: "isExisty",
      //    validationError: "This is not a valid",
      //    required: true
      // }
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
            Add New Task
        </Typography>

         <Formsy className="mb-10" onSubmit={handelSubmit}>
            {
               fields.map((field) =>
                  <MyInput
                     value={
                        field.name == "taskFile" ? fileTOupload :
                           classRoom.material.newMaterial[field.name]}
                     name={field.name}
                     type={field.type}
                     fullWidth
                     placeholder={"Enter " + capitalizeFLetter(field.name)}
                     label={capitalizeFLetter(field.name)}
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
export default inject('store')(withRouter(observer(AddMaterial)));

/**
 * [mobx-state-tree] Error while converting
 *  `{"id":24,"user_info":{"id":3,
 * "username":"amintest123","first_name":"amin",
 * "last_name":"alakhras","groups":[{"id":1,"name":"teachers"}],
 * "profile":{"avatar":null}},
 * "attachments_info":[{"id":14,"attachment_type":"task solution",
 * "created_at":"2020-07-28T17:08:53.973128Z","mo......":[14]}`
 *  to `AnonymousModel`: at path "/user_info/groups" snapshot `[{"id":1,"name":"teachers"}]` is not assignable to type: `(string | null)` (No type is applicable for the union). at path "/user_info/groups" snapshot `[{"id":1,"name":"teachers"}]` is not assignable to type: `(string | null)` (Value is not a string). at path "/user_info/groups" snapshot `[{"id":1,"name":"teachers"}]` is not assignable to type: `(string | null)` (Value is not a null).
 */