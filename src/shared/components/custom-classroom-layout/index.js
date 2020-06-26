import React from "react";
import ClassRoomHeader from '../classroom_header';
import { Container } from '@material-ui/core';

const CustomClassroomLayout = (props) => {
  return (
    <Container style={{ paddingTop: "1.5rem" }}>
      <ClassRoomHeader
        Title="information Security"
        code="123456"
        image="./../assets/images/backgrounds/header_classroom_default.png"
      />
      {props.children}
    </Container>
  );
};

export default CustomClassroomLayout;
