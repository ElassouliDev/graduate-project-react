import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
const IsLoggedIn = (props) => {

   if (window.localStorage.getItem('jwtToken')) {
      // token found redirect to main page
      return <Redirect to={"/"} />
   }
   return (<Fragment>
      {props.children}
   </Fragment>);
}

export default IsLoggedIn;