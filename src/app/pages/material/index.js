import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
// import { Icon } from "@material-ui/core/icons";
// import classNames from "classnames";
import DropSettingMenu from '../../../shared/components/three-dots-menu';
import { Sort } from '@material-ui/icons';
import { Add } from '@material-ui/icons';
import { Fab } from '@material-ui/core';
// import { AddCircle } from "@material-ui/icons";
// import { Cached } from "@material-ui/icons";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
// import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router";
import AddMaterial from "./components/AddMaterial"
import { Checkbox } from '@material-ui/core'
// import { Button } from "@material-ui/core";

function createData({ id, title, description, url, uploadedAt }) {
  return { id, title, description, url, uploadedAt };
}

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "id", numeric: false, disablePadding: false, label: "Material No." },
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "Title",
  }, {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "url",
    numeric: false,
    disablePadding: false,
    label: "File Donwload Link",
  },
  {
    id: "uploadedAt",
    numeric: false,
    disablePadding: false,
    label: "uploadedAt",
  },


  // { id: "fat", numeric: true, disablePadding: false, label: "Fat (g)" },
  // { id: "carbs", numeric: true, disablePadding: false, label: "Carbs (g)" },
  // { id: "protein", numeric: true, disablePadding: false, label: "Protein (g)" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell
          key={"Actions"}
          align={"left"}
          padding={"none"}
          sortDirection={false}
        >
          <TableSortLabel
            active={false}
            direction={"asc"}
          >
            "Actions"
            </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: "1 1 100%",
  },
  fab: {
    margin: theme.spacing(2),
  },
}));

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
              Materials
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  button: {
    borderRadius: "84%",
    textAlign: "center",
    height: "50px",
    width: "50px",
    margin: "10px",
  },

}));

function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelected(newSelected);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleDelete = (id) => (event) => {
    classRoom.MaterialStore.delete(id)

  }
  const handleUpdate = (id) => (event) => {
    const pathname = props.history.location.pathname;
    if (pathname.length > 0) {
      if (pathname[pathname.length - 1] === "/") {
        props.history.push("./" + id);
      } else {
        props.history.push(pathname + "/" + id);

      }
    }
  }
  const TableRows = ({ Materials }) => {
    let Rows = Materials.map((m) => createData(m))
    console.log("Rows", Rows);

    return (<TableBody>
      {stableSort(Rows, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          const isItemSelected = isSelected(row.name);
          const labelId = `enhanced-table-checkbox-${row.id}`;
          return (
            <TableRow
              hover
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row.id}
              selected={isItemSelected}
            >

              <TableCell
                component="th"
                id={labelId}
                scope="row"
                padding="defualt"
              >
                {row.id}
              </TableCell>
              <TableCell
                component="th"
                id={labelId}
                scope="row"
                padding="defualt"
              >
                {row.title}
              </TableCell>
              <TableCell
                component="th"
                id={labelId}
                scope="row"
                padding="defualt"
              >
                {row.description}
              </TableCell>
              <TableCell
                component="th"
                id={labelId}
                scope="row"
                padding="defualt"
              >
                <a href={row.url}>Download</a>
              </TableCell>
              <TableCell
                component="th"
                id={labelId}
                scope="row"
                padding="defualt"
              >
                {row.uploadedAt}
              </TableCell>
              <TableCell align="left">
                <DropSettingMenu id={row.id} options={
                  [
                    { id: "delete", onClick: handleDelete(row.id) }
                    , { id: "update", onClick: handleUpdate(row.id) }
                  ]} />
              </TableCell>
              {/* <TableCell align="right">{row.carbs}</TableCell>
            <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          );
        })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>);
  }
  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const classRoom = props.store.ClassRoomStore.getClassRoom(props.match.params.id);
  if (!classRoom) {
    return (<div>
      classRoom not found
    </div>
    )
  }
  /**x
   *       id: types.optional(types.identifierNumber, 0),
     url: types.optional(types.string, ''),
     uploadedAt: types.optional(types.string, ''),
     title: types.optional(types.string, ''),
     description:types.optional(types.string,'')
   */
  const getRows = function () {
    const id = +props.match.params.id;
    if (id === undefined) {
      return []
    }
    let classRoom = props.store.ClassRoomStore.getClassRoom(id);
    if (!classRoom)
      return [];

    const Rows = classRoom.MaterialStore.materials.map((m) => createData(m));
    return Rows
  }
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableRows Materials={getRows()}></TableRows>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Paper>
        <AddMaterial />
      </Paper>
    </div >
  );
}
export default inject('store')(observer(withRouter(EnhancedTable)))
