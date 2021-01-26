import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  getAllFood,
  selectFood,
  deleteFood,
  unselectFood,
} from "../../../actions";
import { connect } from "react-redux";
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
  TableHead,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { Delete, Edit, Add } from "@material-ui/icons";
import TablePaginationActions from "../../../components/TablePaginationActions";
import TableToolbar from "../../../components/TableToolbar";
import Loading from "../../../components/Loading";
import FoodModal from "./FoodModal";
import NumberFormat from "react-number-format";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
}));

const columns = [
  { id: "name", label: "Tên", minWidth: 170 },
  { id: "price", label: "Giá", minWidth: 100 },
  { id: "action", label: "", minWidth: 100 },
];

function FoodPage({ food, getAllFood, selectFood, deleteFood, unselectFood }) {
  React.useEffect(() => {
    getAllFood();
  }, [getAllFood]);

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, food.list.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClose = () => {
    setIsEdit(false);
    setOpen(false);
    unselectFood();
  };

  const handleEdit = (e, id) => {
    selectFood(id);
    setIsEdit(true);
    setOpen(true);
  };
  const handleDelete = (e, item) => {
    if (window.confirm(`Bạn có muốn xóa ${item.name}`)) {
      deleteFood(item._id);
    }
  };
  const handleAdd = () => {
    setOpen(true);
  };
  return (
    <Paper className={classes.paper}>
      <TableToolbar title="Thực đơn">
        <Tooltip title="Thêm mới">
          <IconButton aria-label="Thêm mới" onClick={handleAdd}>
            <Add />
          </IconButton>
        </Tooltip>
      </TableToolbar>
      <TableContainer>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? food.list.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : food.list
            ).map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>
                  <NumberFormat
                    displayType="text"
                    thousandSeparator
                    value={row.price}
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={(e) => handleEdit(e, row._id)}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={(e) => handleDelete(e, row._id)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={food.list.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <FoodModal open={open} onClose={handleClose} isEdit={isEdit} />
      <Loading open={food.loading} />
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  food: state.food,
});

export default connect(mapStateToProps, {
  getAllFood,
  selectFood,
  deleteFood,
  unselectFood,
})(FoodPage);
