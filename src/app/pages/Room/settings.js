import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { useParams, withRouter } from 'react-router';
import DescriptionAlerts from "../../../shared/components/alert"
import EditClassRoom from '../courses-dashboard-page/component/EditClassRoom';
import { getSnapshot } from 'mobx-state-tree';
import { red } from "@material-ui/core/colors";
const Settings = (props) => {
   let { id } = useParams();
   const classRoom = props.store.ClassRoomStore.getClassRoom(props.match.params.id);
   let [deleted, setDeleted] = useState(false);
   let [status, setStatus] = useState(0);
   let [message, setMessage] = useState("");
   useEffect(
      () => {
        async function fetchData() {
          try {
            if (classRoom)
              return
            let res = await props.store.apiRequests.getOneClassRoom(props.match.params.id);
            console.log("res", res);

            props.store.ClassRoomStore.setOneClassRoom(res.data);
          } catch (error) {
            console.log("mappedClassRooms", error.message);
          }
        }
        fetchData();
      }, []);

   const HandleDeleteClass = async () => {
      try {
         await props.store.apiRequests.deleteClassRoom(id);

         const res = props.store.ClassRoomStore.deleteClassRoom(id);

         if (res) {
            // process success


            setDeleted(true)
            setStatus(1)
            setMessage("Class Room Deleted, you will be redirected in 5sec...")

            setTimeout(() => {
               console.log("props.history.push('/')");
               props.history.push('/')
            }, 6000);
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
      }
   }
   if (!classRoom) {
      return <Typography className={'text-center !text-4xl !my-20 bg-gray-400 !py-10'}>class room not found</Typography>;

   }
   return (
      <div style={{ padding: "20px", maxWidth: "500px" }}>
         <h1>Settings</h1>
         <EditClassRoom classRoom={classRoom} ></EditClassRoom>
         <hr></hr>
         <h2>Critical Options</h2>
         <DescriptionAlerts status={status} message={message} />
         <Button size="large" color="secondary" variant="contained" disabled={deleted} onClick={HandleDeleteClass}>Delete Class Room</Button>

      </div>
   );
}

export default inject('store')(withRouter(observer(Settings)));
