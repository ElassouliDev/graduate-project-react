import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
      '& > * + *': {
         marginTop: theme.spacing(2),
      },
   },
}));
const RenderALert = (status, message) => {
   switch (status) {
      case 1:
         return (<Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            <strong>{message}</strong>
         </Alert>);
      case 2:
         return (<Alert severity="error" >
            <AlertTitle>Error</AlertTitle>
            <strong>{message}</strong>
         </Alert>);
      case 3:
         return (<Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            <strong>{message}</strong>
         </Alert>);
      case 4:
         return (<Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            <strong>{message}</strong>
         </Alert>);

      default: return <div>
      </div>
   }
}
export default function DescriptionAlerts({ status, message = '' }) {

   const classes = useStyles();
   return (
      <div className={classes.root}>
         {RenderALert(status, message)}
      </div>
   );
}