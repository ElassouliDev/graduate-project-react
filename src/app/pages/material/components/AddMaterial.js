import { Typography, makeStyles, Card } from "@material-ui/core";
import React, { useState } from "react";
import MyInput from "../../../../shared/components/formasy-input";
import Formsy from "formsy-react";
import { Button, CircularProgress } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { Backdrop } from '@material-ui/core';
import { Fade } from '@material-ui/core';
import { Modal } from '@material-ui/core';
import materialStore from "../stores";
import { attachment } from '../../../../shared/store/Models';



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
   const { store: {
      ClassRoomStore: { getClassRoom },
   } } = props;
   let classRoom = getClassRoom(props.match.params.id);

   const [isLoading, setLoading] = useState(false);
   const [helperText, setHelperText] = useState("");
   const [materialData, setMaterialData] = useState({ ...materialStore.create({}).toJSON() })
   const [attachmentData, setAttachmentData] = useState({ ...attachment.create({}).toJSON() })

   const handelSubmit = async () => {
      try {
         setLoading(true)

         console.table('material new ',classRoom.material.newMaterial['file'] );
         let  formData = new FormData();
         let cRData = (({ file ,title}) => ({file,title}))(attachment)
         // let cRData = (({ file ,title}) => ({file,title}))(materialStore)
         for (var key in cRData) {
            formData.append(key, materialData[key]);
         }
         formData.append('_type', 2);

         const res_attachment = await props.store.apiRequests.addAttachment(formData);


           formData = new FormData();
         formData.append('attachment', res_attachment.data.id);

         const res = await props.store.apiRequests.addMaterial(formData, props.match.params.id);
         classRoom.material.addNewMaterial(res.data);


         // formData.append('file',classRoom.material.newMaterial['file']);
         // console.table('tests',formData );
         // const res = await props.store.apiRequests.addMaterial(formData, props.match.params.id);


         console.log('material ', res)


      } catch (err) {

         setLoading(false)
         setHelperText(err.message)

      } finally {
         setLoading(false)
         props.handleClose()

      }
   };



   const handleChange = (key) => (event) => {
      const value = event.target.value;
      let preMaterialData = materialData;
      if(key == 'file')
      preMaterialData[key] = event.target.files[0]

      else
         preMaterialData[key] = value
      setMaterialData(preMaterialData)
      console.log(materialData);
      // getClassRoom(props.match.params.id).material.setNewData({ key, value })
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
         name: "file",
         type: "file",
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
            Add New Material
        </Typography>

         <Formsy className="mb-10" onSubmit={handelSubmit}>
            {
               fields.map((field) =>
                  <MyInput
                     value={classRoom.material.newMaterial[field.name]}
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
                              disabled={isLoading}

                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  className={classes.containedSizeLarge}>
                  Add Material {isLoading && <CircularProgress />}
               </Button>
               <Button
                              disabled={isLoading}

                  variant="contained"
                  color="secondary"
                  size="large"
                  type="reset"
                  className={classes.containedSizeLarge}
                  onClick={props.handleClose}
                  >
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
