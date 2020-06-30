import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
const Protected = (props) => {

   if (window.localStorage.getItem('jwtToken')) {
      // token found redirect to main page
      return (<Fragment>
         {props.children}
      </Fragment>
      );
   }
   return <Redirect to={"/auth/login"} />
}

export default Protected;