import React from 'react';
import HorizontalNavigation from "../horizontal-navbar";

export  default  ({ children , navConfig, containerStyle, classes }) => {
    return (
        <div className={classes} style={{ overflowY: "auto", height: "100%", ...containerStyle }}>
            <HorizontalNavigation navConfig={navConfig} classes={classes}/>
            {children}
        </div>
    );
}