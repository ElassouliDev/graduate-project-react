import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { useParams, withRouter } from 'react-router';
import DescriptionAlerts from "../../../shared/components/alert"
import EditClassRoom from './component/EditClassRoom';
import { getSnapshot } from 'mobx-state-tree';
const Settings = (props) => {
   let { id } = useParams();
   let [classRoom, setClassRoom] = useState();
   let [deleted, setDeleted] = useState(false);
   let [status, setStatus] = useState(0);
   let [message, setMessage] = useState("");
   useEffect(() => {
      setClassRoom(
         getSnapshot(props.store.ClassRoomStore.getClassRoom(id))
      )
   }, [])
   const HandleDeleteClass = () => {
      try {
         const res = props.store.ClassRoomStore.deleteClassRoom(id);
         if (res) {
            // process success
            setDeleted(true)
            setStatus(1)
            setMessage("Class Room Deleted")
         } else {
            setStatus(2)
            setDeleted(false)
            setMessage("Class Room Faild To delete")
         }
      } catch (err) {
         // process faild
         setDeleted(false)
         setStatus(2)
         setMessage(err.message)

      } finally {
         // process reset status
         setTimeout(() => {
            setStatus(0)
         }, 5000);
         setTimeout(() => {
            console.log(deleted, "props.history.push('/')");

            if (deleted)
               props.history.push('/')
         }, 200);
      }
   }
   if (!classRoom) {
      return <Typography>
         class room not found
      </Typography>
   }
   return (
      <div style={{ padding: "20px", maxWidth: "500px" }}>
         <h1>Settings</h1>
         <EditClassRoom classRoom={classRoom} ></EditClassRoom>
         <hr></hr>
         <h2>Critical Options</h2>
         <DescriptionAlerts status={status} message={message} />
         <Button disabled={deleted} onClick={HandleDeleteClass}>Delete Class Room</Button>

      </div>
   );
}

export default inject('store')(observer(withRouter(Settings)));
