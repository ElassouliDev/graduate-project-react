import React from "react";
import HorizontalNavigation from "../horizontal-navbar";
import TemporaryDrawer from '../temporary-drawer'
import { Container } from '@material-ui/core';

export default ({ children, navConfig, containerStyle, classes,aside_show=false,
  nav_item = false,
  add_calssroom = false,
  is_teacher = false,
  nav_action = true }) => {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const anchor = 'left';
  return (
    <div className={classes} style={{ overflowY: "auto", height: "100%", ...containerStyle }}>
      <HorizontalNavigation
        navConfig={navConfig}
        classes={classes}
        anchor={anchor}
        toggleDrawer={toggleDrawer}
        aside_show={aside_show}
      	        nav_item={nav_item}
   	        add_calssroom={add_calssroom}
            nav_action={nav_action}
            is_teacher={is_teacher}

      />
    {aside_show == true ? (
        <TemporaryDrawer
          state={state}
          anchor={anchor}
          toggleDrawer={toggleDrawer}
        />
      ) : (
        ""
      )}      <Container>
        {children}
      </Container>
    </div>
  );
}
