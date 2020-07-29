import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
// import { Icon } from "@material-ui/core/icons";
// import classNames from "classnames";
import DropSettingMenu from '../../../shared/components/three-dots-menu';
import { Sort, Add } from '@material-ui/icons';
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
import { Fade } from '@material-ui/core';
import { Backdrop } from '@material-ui/core';
import { Modal } from '@material-ui/core';
import { Fab } from '@material-ui/core';
import { Checkbox } from '@material-ui/core'
// import { Button } from "@material-ui/core";

// function createData({ id, title, file, created_at }) {
//   return { id, title, file, created_at };

// }

// function createData({ id, title,file, created_at }) {
//   //  title =file.split("/").reverse()[0];
//   return { id, title, file, created_at };
// }

function createData({ id,attachment_info:{ title, file}, created_at }) {

 console.log('tag', { id, title, file, created_at })
  ///title = attachment_info?attachment_info['title']:"";
  //file = attachment_info?attachment_info['file']:"";

  return { id, title, file, created_at } ;// { id: m.id, title:m.attachment_info.title, file:m.attachment_info.file, created_at:m.created_at };
}



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
   },
  {
    id: "file",
    numeric: false,
    disablePadding: false,
    label: "File Donwload Link",
  },
  {
    id: "created_at",
    numeric: false,
    disablePadding: false,
    label: "created at",
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
            direction={"asc"}>
            Actions
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
      className={clsx(classes.root)}
    >


    <Typography
              className={classes.title}
              variant="h6"
              id="tableTitle"
              component="div"
            >
            Materials

             <Tooltip title="Add" aria-label="add" onClick={props.onClick}>
                <Fab color="primary" className={classes.fab}>
                  <Add />
                </Fab>
              </Tooltip>
            </Typography>
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
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => async (event) => {
    try {
      const res = await props.store.apiRequests.deleteMaterial(props.match.params.id, id)
      if (res.status == 204) {
        classRoom.material.delete(id)
      }
    } catch (error) {
      console.log(error.message);
    }
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
    let Rows =Materials // Materials.map((m) => createData(m))
   // console.log("Rows", Rows);

    return (<TableBody>
      {Rows.length > 0  ? stableSort(Rows, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          const isItemSelected = isSelected(row.name);
          console.log('tag', row)
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
                <a href={row.file} target="blank">Download</a>
              </TableCell>
              <TableCell

                component="th"
                id={labelId}
                scope="row"
                padding="defualt"
              >
                {row.created_at}
              </TableCell>
              <TableCell align="left">
                <DropSettingMenu id={row.id} options={
                  [
                    { id: "delete", onClick: handleDelete(row.id) },
                    // { id: "update", onClick: handleUpdate(row.id) }
                  ]} />
              </TableCell>
              {/* <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          );
        }):
        <TableRow >
          <TableCell colSpan={4}  align="center" className="!text-2xl">No Data Exists</TableCell>
        </TableRow>
        }
      {/* {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )} */}
    </TableBody>);
  }
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const classRoom = props.store.ClassRoomStore.getClassRoom(props.match.params.id);

  React.useEffect(
    () => {
      async function fetchData() {
        try {
          if (classRoom)
            return
          let res = await props.store.apiRequests.getOneClassRoom(props.match.params.id);
          console.log("res", res);
          props.store.ClassRoomStore.setOneClassRoom(res.data);
        } catch (error) {
          console.log("mappedClassRooms", error.message);
        }finally{

        }
      }
      fetchData();
    }, []);
  if (!classRoom) {
    return <Typography>class room not found</Typography>;
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar  onClick={handleOpen}/>
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
            <TableRows
              Materials={
                classRoom.material.materials.toJSON().map(m => createData(m))
              }></TableRows>
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


      <AddMaterial handleOpen={handleOpen} handleClose={handleClose} open={open}/>

    </div>
  );
}
export default inject('store')(withRouter(observer(EnhancedTable)))
