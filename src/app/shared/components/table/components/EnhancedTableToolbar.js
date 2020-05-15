import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import clsx from "classnames";
import { Fab } from "@material-ui/core";
import { Add, Sort } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import PropTypes from "prop-types";
import React from "react";
import useToolbarStyles from './styles/styles';


const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography
                    className={classes.title}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <>
                    <Typography
                        className={classes.title}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Material

                        <Tooltip title="Add" aria-label="add">
                            <Fab color="primary" className={classes.fab}>
                                <Add />
                            </Fab>
                        </Tooltip>
                    </Typography>


                    {/* <Button>
            <AddCircle color="secondary" / >
          </Button> */}
                </>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>

            ) : (
                <>
                    <Tooltip title="Filter list">
                        <IconButton aria-label="filter list">
                            <FilterListIcon />
                        </IconButton>

                    </Tooltip>
                    <Tooltip title="Sort ">
                        <IconButton aria-label="Sort">
                            <Sort />
                        </IconButton>

                    </Tooltip>
                </>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default  EnhancedTableToolbar;