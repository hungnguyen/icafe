import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  getAllCart,
  selectCart,
  deleteCart,
  deleteCartItem,
  getAllCartItem,
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
  Tooltip,
  IconButton,
} from "@material-ui/core";
import { Refresh, FilterList } from "@material-ui/icons";
import TablePaginationActions from "../../../components/TablePaginationActions";
import TableToolbar from "../../../components/TableToolbar";
import Loading from "../../../components/Loading";

import CartRow from "./CartRow";
import CartFilter from "./CartFilter";

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
  { id: "tableName", label: "Bàn", minWidth: 170 },
  { id: "totalAmount", label: "Tổng tiền", minWidth: 100 },
  { id: "dateTime", label: "Ngày lập", minWidth: 100 },
  { id: "completed", label: "Trạng thái", minWidth: 100 },
  { id: "action", label: "", minWidth: 100 },
];

function FoodPage({
  cart,
  //cartItem,
  cartFilter,
  getAllCart,
  deleteCart,
  deleteCartItem,
  getAllCartItem,
}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isFilter, setIsFilter] = React.useState(false);

  React.useEffect(() => {
    getAllCart(cartFilter);
  }, [getAllCart, cartFilter]);

  React.useEffect(() => {
    getAllCartItem();
  }, [getAllCartItem]);

  const handleRefresh = () => {
    getAllCart(cartFilter);
    getAllCartItem();
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, cart.list.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (e, cart) => {
    if (window.confirm(`Bạn có muốn xóa đơn hàng ${cart.tableName}`)) {
      deleteCart(cart._id);
      //   let cartItems = cartItem.list.filter((item) => item.cartId === cart._id);

      //   cartItems.forEach((item, index) => {
      //     deleteCartItem(item._id);
      //   });
    }
  };
  //   const getCartItem = (cartId) => {
  //     return cartItem.list.filter((item) => item.cartId === cartId);
  //   };

  return (
    <Paper className={classes.paper}>
      <TableToolbar title="Đơn hàng">
        <Tooltip title="Refresh">
          <IconButton aria-label="Refresh" onClick={handleRefresh}>
            <Refresh />
          </IconButton>
        </Tooltip>
        <Tooltip title="Lọc">
          <IconButton aria-label="Lọc" onClick={() => setIsFilter(!isFilter)}>
            <FilterList />
          </IconButton>
        </Tooltip>
      </TableToolbar>
      <CartFilter open={isFilter} onClose={() => setIsFilter(false)} />
      <TableContainer>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell />
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
              ? cart.list.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : cart.list
            ).map((row) => (
              <CartRow
                key={row._id}
                row={row}
                //cartItems={getCartItem(row._id)}
                onDelete={handleDelete}
              />
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
                count={cart.list.length}
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

      <Loading open={cart.loading} />
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  //cartItem: state.cartItem,
  cartFilter: state.cartFilter,
});

export default connect(mapStateToProps, {
  getAllCart,
  selectCart,
  deleteCart,
  deleteCartItem,
  getAllCartItem,
})(FoodPage);
