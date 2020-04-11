import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import DrawerList from './SidebarList';



export default function TemporaryDrawer({ state, anchor, toggleDrawer }) {

    return (
        <div>
            <React.Fragment key={anchor}>
                <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                    {<DrawerList anchor={anchor} toggleDrawer={toggleDrawer} />}
                </Drawer>
            </React.Fragment>
        </div>
    );
}