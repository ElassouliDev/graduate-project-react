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

   const handelSubmit = async () => {
      try {
         setLoading(true)
         setMessage("")
         const payload = props.store.LoginStore;
         console.log("login", payload);
         const res = await props.store.apiRequests.loginUser({ username: payload.username, password: payload.password })
         console.log(res);

         if (res.data.auth_token) {
            setStatus(1)
            setMessage("You are logged in, you will be redirected in 5 secounds")

            window.localStorage.setItem('jwtToken', res.data.auth_token)
            setTimeout(() => {
               console.log("props.history.push('/')");
               props.history.push("/")
            }, 6000);
         }
      } catch (err) {
         window.localStorage.clear()
         if (err.non_field_errors) {
            if (err.non_field_errors.length > 0) {
               setStatus(2)
               setMessage(err.non_field_errors[0])
               return;
            } else {
               setStatus(2)
               setMessage("The provided password and email is not correct")
               return;
            }
         } else {
            if (err.message) {
               setStatus(2)
               setMessage(err.message)
            }
         }
      } finally {
         setLoading(false)
      }
   };

   const handleChange = (key) => (event) => {
      const value = event.target.value;
      props.store.ClassRoomStore.getClassRoom(props.match.params.id).MaterialStore.setNewData({ key, value })
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
         name: "description",
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
         name: "vaildUntill",
         type: "date",
         validations: "isExisty",
         validationError: "This is not a valid",
         required: true
      },
      {
         name: "is_closed",
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
   if (!classRoom) {
      return <div>
         class room not found
      </div>
   }

   return (
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
                     value={classRoom.MaterialStore.newMaterial[field.name]}
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
            <DescriptionAlerts status={status} message={message} />

            <CardActions className="!px-0 !mt-10">
               <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  className={classes.containedSizeLarge}>
                  Add Material {isLoading && <CircularProgress />}
               </Button>
            </CardActions>
         </Formsy>
      </CardContent>
   );
}
export default inject('store')(withRouter(observer(AddMaterial)));
