import { Typography, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import MyInput from "../../../../shared/components/formasy-input";
import Formsy from "formsy-react";
import { Button, CircularProgress } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';



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
   let classRoom = props.store.ClassRoomStore.getClassRoom(props.match.params.id);

   const handelSubmitAdd = async () => {
      try {
         setLoading(true)

         props.store.ClassRoomStore.getClassRoom(props.match.params.id).MaterialStore.addNewMaterial();

         props.onAddition(props.store.ClassRoomStore.getClassRoom(props.match.params.id).MaterialStore.materials)
      } catch (err) {

         setLoading(false)
         setHelperText(err.message)

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
         name: "url",
         type: "file",
         validations: "isExisty",
         validationError: "This is not a valid",
         required: true
      },
      {
         name: "uploadedAt",
         type: "date",
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
      <CardContent>
         <Typography
            variant="h3"
            component="h3"
            className="text-center !mt-5 !mb-12"
         >
            Add New Material
        </Typography>

         <Formsy className="mb-10" onSubmit={handelSubmitAdd}>
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
export default inject('store')(observer(withRouter(AddMaterial)));
