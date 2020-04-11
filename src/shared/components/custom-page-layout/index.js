import React from 'react';
import HorizontalNavigation from "../horizontal-navbar";
import TemporaryDrawer from '../temporary-drawer'

export  default  ({ children , navConfig, containerStyle, classes }) => {
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
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
            />
            <TemporaryDrawer state={state} anchor={anchor} toggleDrawer={toggleDrawer} />
            {children}
        </div>
    );
}