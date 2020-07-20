import React from "react";
import ClassRoomHeader from '../classroom_header';
import { inject, observer } from 'mobx-react';
import { withRouter } from "react-router";

const CustomClassroomLayout = (props) => {
  const classRoom = props.store.ClassRoomStore.getClassRoom(props.match.params.id);
  return (
    <div style={{ paddingTop: "1.5rem" }}>
      <ClassRoomHeader
        Title={classRoom ? classRoom.title : ""}
        code={"123456"}
        image={classRoom ? classRoom.background_img : ""}
      />
      {props.children}
    </div>
  );
};

export default inject('store')(withRouter(observer(CustomClassroomLayout)));
