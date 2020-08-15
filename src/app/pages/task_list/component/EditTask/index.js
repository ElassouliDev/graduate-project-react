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
import { FormControlLabel } from '@material-ui/core';
import { Switch } from '@material-ui/core';
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
const EditTask = (props) => {

   const [isLoading, setLoading] = useState(false);
   const [helperText, setHelperText] = useState("");
   let [status, setStatus] = useState(0);
   let [message, setMessage] = useState("");
   // const [open, setOpen] = React.useState(true);
   let [classRoom, setClassRoom] = useState();

   let [task,setTask] = useState();
   let [fileTOupload, setFileToUpload] = useState(null);

   React.useEffect(() => {
      setTask(props.task)
            setClassRoom(props.store.ClassRoomStore.getClassRoom(props.match.params.id))
            // setOpen(true)
            setMessage("")
            setHelperText("")

   },[props.task])


    // const handleClose = () => {
    //   setOpen(false);
    // }
   const handelSubmit = async () => {
      try {
         setLoading(true)
         setMessage("")
         const payload = props.store.User;
         // console.log("add task", payload);
         // const task = classRoom.classroom_tasks_info.newTask;
         // const attachment = new FormData();
         // attachment.append('file', fileTOupload)
         // attachment.append('title', task.title)
         // attachment.append('_type', 2)

         // const attachments = await props.store.apiRequests.addAttachment(attachment)
         let cRData = (({ title, content,accept_solutions }) => ({ title, content, accept_solutions }))(task)
         let formData = new FormData;
         for (var key in cRData) {
            formData.append(key, task[key]);
         }
         // const formData = new FormData();
         // formData.append('title', task.title)
         // formData.append('content', task.content)
         // formData.append('accept_solutions', task.accept_solutions)
         // // formData.append('attachments', attachments.data.id)

         const res = await props.store.apiRequests.editTask(task.id, formData)
         classRoom.classroom_tasks_info.editTask(task)
         console.log(res);
         setStatus(1)
         setMessage("task added successully")
      } catch (err) {
         setStatus(2)
         setMessage(err.message)
      } finally {
         setTimeout(()=>{
            setLoading(false)
            props.onClose();
         },3000)


      }
   };

   const handleChange = (key) => (event) => {
      let value = event.target.value;

      // if (key == "taskFile") {
      //    setFileToUpload(event.target.files[0])
      //    return
      // }
      if (key == "accept_solutions") {
          value = event.target.checked;
      }

      setTask({ ...task, [key]: value })
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
      // {
      //    name: "taskFile",
      //    type: "file",
      //    validations: "isExisty",
      //    validationError: "This is not a valid",
      //    required: true
      // },
      // {
      //    name: "accept_solutions_due",
      //    type: "date",
      //    validations: "isExisty",
      //    validationError: "This is not a valid",
      //    required: true
      // },
       {
          name: "accept_solutions",
          type: "checkbox",
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

   if (!task) {
      return <Typography>
         Task not found
      </Typography>
   }
   console.log('task', task)

   return (
              <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.editFormVisible}
        onClose={props.onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
                <Fade in={props.editFormVisible}>
      <Card className="w-1/2 mx-auto mt-20">
      <CardContent>
         <Typography
            variant="h3"
            component="h3"
            className="text-center !mt-5 !mb-12"
         >
            Edit Task
        </Typography>

         <Formsy className="mb-10" onSubmit={handelSubmit}>
            {
               fields.map((field) =>
               field.type != "checkbox"  ?<MyInput
                     value={
                        field.name == "taskFile" ? fileTOupload :
                           task[field.name]}
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
                  />:  <FormControlLabel
                  control={ <Switch
                     checked={ task[field.name]}
                    onChange={handleChange(field.name)}
                    color="primary"
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                   />}
                  label={capitalizeFLetter(field.name)}
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
                  Edit {isLoading && <CircularProgress />}
               </Button>
               <Button
                  disabled={isLoading}
                  variant="contained"
                  color="secondary"
                  size="large"
                  type="button"
                  onClick={props.onClose}
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
export default inject('store')(withRouter(observer(EditTask)));

