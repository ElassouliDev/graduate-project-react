import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { Typography, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Settings } from '@material-ui/icons';
const Room = (props) => {
   const [classRoom, setClassRoom] = useState({});
   useEffect(() => {
      setClassRoom(
         props.store.ClassRoomStore.getClassRoom(
            +props.match.params.id
         ))
   }, [])
   if (!classRoom) {
      return <Typography>
         class room not found
      </Typography>
   }
   return (
      <div>
         <Typography variant="h3">
            {classRoom.title}
         </Typography>

         <Typography variant="button">
            <Link to={`./${classRoom.id}/settings`}>
               <strong>
                  Room Settings <Settings />
               </strong>
            </Link>
         </Typography>
         <hr></hr>
         <Typography variant="button">
            <Link to={`./${classRoom.id}/participation`}>
               <strong>
                  Room participation space <Settings />
               </strong>
            </Link>
         </Typography>
         <hr></hr>
         <Typography variant="button">
            <Link to={`./${classRoom.id}/videos`}>
               <strong>
                  Room tutorial videos <Settings />
               </strong>
            </Link>
         </Typography>
         <hr></hr>
         <Typography variant="button">
            <Link to={`./${classRoom.id}/material`}>
               <strong>
                  Room materials <Settings />
               </strong>
            </Link>
         </Typography>
         <hr></hr>
         <Typography variant="button">
            <Link to={`./${classRoom.id}/tasks`}>
               <strong>
                  Room Tasks <Settings />
               </strong>
            </Link>
         </Typography>
      </div>
   )
}
export default inject('store')(observer(withRouter(Room)))