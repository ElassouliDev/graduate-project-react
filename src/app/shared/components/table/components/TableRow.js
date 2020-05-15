import MaterialTableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import DropSettingMenu from './DropSettingMenu';

import React from "react";
import PropTypes from "prop-types";

const TableRow = ({
    row, handleClick, isItemSelected, labelId, emptyRows
    }) => {
    if (emptyRows > 0) {
       return  (
            <MaterialTableRow style={ {height: 53 * emptyRows} }>
                <TableCell colSpan={ 6 }/>
            </MaterialTableRow>
        )
    }

    return (
        <MaterialTableRow
            hover
            onClick={(event) => handleClick(event, row.name)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.id}
            selected={isItemSelected}
        >
            {/* <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell> */}
            <TableCell
                component="th"
                id={labelId}
                scope="row"
                padding="defualt"
            >
                {row.name}
            </TableCell>
            <TableCell align="right">{row.date}</TableCell>
            <TableCell align="right">


                <DropSettingMenu id={row.id} />
            </TableCell>
            {/* <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell> */}
        </MaterialTableRow>
    )
}
TableRow.propTypes = {
    row: PropTypes.object.isRequired,
    isItemSelected: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired,
    labelId: PropTypes.string.isRequired,
    emptyRows: PropTypes.number.isRequired,
};

export default TableRow;