import React from "react";
import ClassRoomHeader from '../classroom_header';
import { Container } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-route';

const CustomClassroomLayout = (props) => {
  return (
    <Container style={{ paddingTop: "1.5rem" }}>
      <ClassRoomHeader
        Title="information Security"
        code="123456"
        image={props.store.ClassRoomStore.classRooms.find((classR) => {
          return classR.id === props.match.params.id;
        })?.coverImage}
      />
      {props.children}
    </Container>
  );
};

export default inject('store')(observer(withRouter(CustomClassroomLayout)));
