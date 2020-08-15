import React, { useState, useEffect } from "react";
import { Typography, makeStyles } from "@material-ui/core";
import MyInput from "../../../../shared/components/formasy-input";
import Formsy from "formsy-react";
import { Button, CircularProgress } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { inject, observer } from 'mobx-react';
import { withRouter } from "react-router";
import LoadingProgressPage from "../../../../shared/components/loading-progress-page";

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
const UpdateMaterial = (props) => {
   const [isLoading, setLoading] = useState(false);
   const [isLoadingCircle, setLoadingCircle] = useState(false);
   let [helperText, setHelperText] = useState("");
   let [material, setMaterial] = useState();
   let [file, setFile] = useState();
   let classRoom = props.store.ClassRoomStore.getClassRoom(props.match.params.id);

   const handelSubmit = async () => {
      try {
         setLoadingCircle(true)
         let formData = new FormData();
         Object.keys(material).forEach(key => {
            formData.append(key, material.key)
         });
         formData.append("url", file)
         classRoom.material.editMaterial((material.id, material));

      } catch (err) {

         setLoadingCircle(false)
         setHelperText(err.message)

      } finally {
         setLoadingCircle(false)
      }
   };
   useEffect(() => {
      try {
         const materialRes = classRoom.material.get(props.match.params.mId)
         setMaterial(materialRes)
         setLoading(true);
      } catch (error) {
         console.log("err message", error.message);
         setLoading(false);
      } finally {
         setLoading(false);
      }
   }, [])
   const handleChange = (key) => (event) => {
      if (event.type === "file") {
         if (event.target.files.length > 0) {
            setFile(event.target.files[0])
         }
      }
      setMaterial({ ...material, [key]: event.target.value })
   };
   const classes = useStyles();
   if (!material) {
      return <Typography>
         class room not found
      </Typography>
   }
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
      }

   ]

   function capitalizeFLetter(input) {
      if (input.length == 0)
         return ""
      return input[0].toUpperCase() +
         input.slice(1);
   }

   if (isLoading) {
      return <LoadingProgressPage />
   }

   if (!classRoom) {
      return <div>
         class room not found
      </div>
   }

   if (!material) {
      return <div>
         material not found
      </div>
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
            {
               fields.map((field) =>
                  <MyInput
                     value={material[field.name]}
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
                  Edit Material {isLoadingCircle && <CircularProgress />}
               </Button>
            </CardActions>
         </Formsy>
      </CardContent>
   );
}
export default inject('store')(withRouter(observer(UpdateMaterial)));
