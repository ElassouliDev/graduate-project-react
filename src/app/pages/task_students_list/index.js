import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import React, { useEffect, useState, Component } from "react";

import UserItem from "./component/UserItem";
import classNames from "classnames";
import { Select } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { CardContent, CardHeader, Grid } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { Typography } from "@material-ui/core";

import { CardActionArea, Button } from "@material-ui/core";
import { Card } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default class TaskStudentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dense: false,
      student_type: "Students answered",
      secondary: false,
      students_list_answoer: [
        {
          name: "Yehia Elas",
          image:
            "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
          file:
            "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",

          created_at: "September 14, 2016",
        },
        {
          name: "Yehia Elas",
          image:
            "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
          file:
            "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",

          created_at: "September 14, 2016",
        },
        {
          name: "Yehia Elas2",
          image:
            "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
          file:
            "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",

          created_at: "September 14, 2016",
        },
        {
          name: "Yehia Elas3",
          image:
            "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
          file:
            "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",

          created_at: "September 14, 2016",
        },
      ],
       students_list_not_answoer: [
        {
          name: "Yehia Elas",
          image:
            "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",

        },
        {
          name: "Yehia Elas",
          image:
            "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",

        },
        {
          name: "Yehia Elas2",
          image:
            "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
        },
        {
          name: "Yehia Elas3",
          image:
            "https://previews.123rf.com/images/triken/triken1608/triken160800029/61320775-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg",
        },
      ],
    };
    this.handleChange = this.handleChange.bind(this);

  }
  handleChange(event) {
    console.log(event.target.value);
    this.setState({ student_type: event.target.value });
  }
  componentDidMount() {}

  render() {
    return (
      <div className="container m-auto my-20  ">
        <Grid container>
          <Grid item xs={8}>
            {" "}
            <Typography variant="h2" className="!mb-5">
              {
                          this.state.student_type == "Students answered"?
"List of student that submited the solution"
 : "List of student that not submited the solution"
}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <FormControl className="float-right text-center">
              <InputLabel htmlFor="age-native-simple"></InputLabel>
              <Select
                native
                value={this.state.student_type}
                onChange={this.handleChange}
                // inputProps={{
                //   name: "S",
                //   id: "age-native-simple",
                // }}
              >
                <option value="Students answered">Students answered</option>
                <option value="Students not answered">
                  Students not answered
                </option>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Divider />
        <div className="my-10">
          {
          this.state.student_type == "Students answered"?(

          this.state.students_list_answoer.map((student,index) => (
            <UserItem student={student}  key={index}/>

          ))):
          (

            this.state.students_list_not_answoer.map((student,index) => (
              <UserItem student={student}  key={index} />

            )))

        }
        </div>
      </div>
    );
  }
}
