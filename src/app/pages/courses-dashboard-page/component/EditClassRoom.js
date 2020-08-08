import React, { useState, useEffect } from "react";
import { Typography, makeStyles } from "@material-ui/core";
import MyInput from "../../../../shared/components/formasy-input";
import Formsy from "formsy-react";
import { Button, CircularProgress } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { inject, observer } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree'
import { Switch } from '@material-ui/core';

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
   const [backgroundImg, setBackgroundImg] = useState("");
   const [logoImg, setLogoImg] = useState("");

   let [classRoom, setClassRoom] = useState();
   const handelSubmit = async () => {
      try {
         setLoading(true)
         let cRData = (({ title, description,auto_accept_students }) => ({ title, description, auto_accept_students }))(classRoom)
         let formData = new FormData;
         for (var key in cRData) {
            formData.append(key, classRoom[key]);
         }
         if(backgroundImg != "")
         formData.append('background_img', backgroundImg);

         if(logoImg != "")
         formData.append('logo_img', logoImg);
         console.log('classRoom', classRoom)
         const res = await props.store.apiRequests.editClassRoom(formData,classRoom.id)
         //classRoom['logo_img'] =   res.data.logo_img ;
         //classRoom['background_img'] =   res.data.background_img ;
         if(logoImg != "")
         classRoom.setClassData({key:'logo_img', value: res.data.logo_img }) ;
         if(backgroundImg != "")
         classRoom.setClassData({key:'background_img', value: res.data.background_img });
         //console.log('res update', res.data)
         props.store.ClassRoomStore.editClassRoom((classRoom.id, classRoom));

      } catch (err) {

         setLoading(false)
         setHelperText(err.message)

      } finally {
         setLoading(false)
         setLogoImg("")
         setBackgroundImg("")
      }
   };

   useEffect(() => {
      setClassRoom(props.store.ClassRoomStore.getClassRoom(props.classRoom.id))
   }, [])

   const handleChange = (key) => (event) => {
      setClassRoom({ ...classRoom, [key]: event.target.value })
   };
   const handleFileChange = (key) => (event) => {
      if (event.target.files.length > 0) {
         const value = event.target.files[0];
         if(key == 'backgroundImg')
         setBackgroundImg(value)
         else if(key == 'logoImg')
         setLogoImg(value)

         console.log('chang '+  key , value)
      }
     };
   const handleChangeSwitch =(event) => {

      setClassRoom({ ...classRoom, [event.target.name]: event.target.checked  })
   };
   const classes = useStyles();
   if (!classRoom) {
      return <Typography>
         class room not found
      </Typography>
   }
   return (
      < >
         <h2> Edit Class Room </h2>

         <Formsy className="mb-10" onSubmit={handelSubmit}>
            <MyInput
               value={classRoom.title}
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
               value={classRoom.description}
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
               value={backgroundImg}
               name="backgroundImg"
               type="file"
               fullWidth
               placeholder="Enter your background img"
               label="background image"
               id="backgroundImg"
               validations="isExisty"
               validationError="This is not a valid "
               onChange={handleFileChange("backgroundImg")}
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

            /> <MyInput
               value={logoImg}
               name="logoImg"
               type="file"
               fullWidth
               placeholder="Enter your logo img"
               label="logo"
               id="logoImg"
               validations="isExisty"
               validationError="This is not a valid "
               onChange={handleFileChange("logoImg")}
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
             <Switch
        checked={classRoom.auto_accept_students}
        onChange={handleChangeSwitch}
        name="auto_accept_students"
        color="primary"
        label="auto accept students"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />

            <Typography>
               {helperText}
            </Typography>
            <CardActions className="!px-0 !mt-10">
               <Button
                  disabled={isLoading  }
                  variant="contained"
                  color="primary"
                  size="small"
                  type="submit"
                  className={classes.containedSizeLarge}>
                  Edit Class Room {isLoading && <CircularProgress />}
               </Button>
            </CardActions>
         </Formsy>
      </>
   );
}
export default inject('store')(observer(EditClassRoom));
