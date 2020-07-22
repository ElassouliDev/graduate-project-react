import React, { Component, useEffect } from "react";
import PostCard from '../PostCard';
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";


const PostListCard = (props) => {
  const classRoom = props.store.ClassRoomStore.getClassRoom(props.match.params.id);
  if (!classRoom) {
    return <div>
      class room not found
      </div>
  }
  return (
    <>
      {
        props.store.ClassRoomStore.getClassRoom(props.match.params.id).PostStore.Postslength
      }
      {
        props.store.ClassRoomStore.getClassRoom(props.match.params.id).PostStore.Posts.map((post) => {
          return <PostCard post={post} />
        })
      }
    </>
  );
}

export default inject('store')(withRouter(observer(PostListCard)));