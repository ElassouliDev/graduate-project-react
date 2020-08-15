import { Typography, makeStyles, Card } from "@material-ui/core";
import React, { useState } from "react";
import MyInput from "../../../../shared/components/formasy-input";
import Formsy from "formsy-react";
import { Button, CircularProgress } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";
import MenuItem from '../../videos/components/video_menu/menu_item';
import classNames from 'classnames';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { Backdrop } from "@material-ui/core";
import { Fade } from "@material-ui/core";
import { Modal } from "@material-ui/core";

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
  formControl: {
   margin: theme.spacing(1),
   minWidth: 120,
   fontSize: "1.75rem",

 },
 selectEmpty: {
   marginTop: theme.spacing(2),
   fontSize: "1.75rem",

 },
}));
const AddMedia = (props) => {
  const {
    store: {
      ClassRoomStore: { getClassRoom },
    },
  } = props;
  let classRoom = getClassRoom(props.match.params.id);

  const [isLoading, setLoading] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [data, setData] = useState({
    course: 0,
    path: "",
    description: "",
    title: "",
  });

  const handelSubmit = async () => {
    try {
      setLoading(true);

      console.log('data', data);
      let formData = new FormData();
        for (var key in data) {
           if(data[key] != ""){
            formData.append(key, data[key]);

           }
        }

    const res = await props.store.apiRequests.addMedia(formData);
    const section  = classRoom.course.get(parseInt(data['course']))
    console.log('section', section)
    section.addMedia(res.data);
    setData({
      course: 0,
      path: "",
      description: "",
      title: "",
    });

    } catch (err) {
      setLoading(false);
      setHelperText(err.message);
    } finally {
      setLoading(false);
      props.handleClose();
    }
  };

  const handleChange = (key) => (event) => {
    const value = event.target.value;
    setData({
      ...data,
      [key]: value,
    });
    //    if(key == 'path'){
    //       setVideoUrl(value)

    //       return ;
    //    }
    //    let preVideoData = videoData;

    //   if(key == 'file')
    //    videoData[key] = event.target.files[0]
    //    else
    //    preVideoData[key] = value

    //    setVideoData(preVideoData)
  };
  const classes = useStyles();
  const fields = [
    {
      title: "Title",
      name: "title",
      value: data["title"],
      type: "text",
      validations: "isExisty",
      validationError: "This is not a valid",
      required: false,
    },
    {
      title: "description",

      name: "description",
      value: data["description"],

      type: "text",
      validations: "isExisty",
      validationError: "This is not a valid",
      required: false,
    },
    {
      title: "Url",
      name: "path",
      value: data["path"],

      type: "url",
      validations: "isExisty",
      validationError: "This is not a valid",
      required: true,
    },
  ];
  function capitalizeFLetter(input) {
    if (input.length == 0) return "";
    return input[0].toUpperCase() + input.slice(1);
  }
  if (!classRoom) {
    return <div>class room not found</div>;
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
              Add Video
            </Typography>

            <Formsy className="mb-10" onSubmit={handelSubmit}>
            <FormControl className={classes.formControl} fullWidth>
        {/* <InputLabel htmlFor="age-native-simple" className={classes.labelRoot}>Course</InputLabel> */}
        <Select
          native
          value={data.course}
          onChange={handleChange('course')}
          fullWidth
          classN
          name="course"
          inputProps={{
            name: 'course',
            id: 'age-native-simple',
          }}
          required
          className={classes.labelRoot}
        >
                     <option>Select Course</option>

           {
           classRoom.course.videos.map((row) => (
               <option value={row.id} className={classes.labelRoot}>{row.title}</option>

           ))}

        </Select>
      </FormControl>
              {fields.map((field) => (
                <MyInput
                  key={field.name}
                  value={field.value}
                  name={field.name}
                  type={field.type}
                  fullWidth
                  placeholder={"Enter " + capitalizeFLetter(field.title)}
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
                  required={field.required}
                />
              ))}
              <Typography>{helperText}</Typography>
              <CardActions className="!px-0 !mt-10">
                <Button
                  disabled={isLoading}
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  className={classes.containedSizeLarge}
                >
                  Save {isLoading && <CircularProgress />}
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
};
export default inject("store")(withRouter(observer(AddMedia)));
