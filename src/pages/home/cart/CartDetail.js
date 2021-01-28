import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { Close } from "@material-ui/icons";
import { connect } from "react-redux";
import { IconButton, Typography } from "@material-ui/core";
import { deleteCartItem } from "../../../actions";

import NumberFormat from "react-number-format";

const useStyles = makeStyles({
  table: {
    width: "100%",
  },
});

function CartDetail({ cart, cartItem, deleteCartItem }) {
  const classes = useStyles();

  //const [cartItems, setCartItems] = React.useState([]);
  //const [totalAmount, setTotalAmount] = React.useState(0);

  // React.useEffect(() => {
  //   if (cart.item && Object.keys(cart.item).length > 0) {
  //     setCartItems(
  //       cartItem.list.filter((item) => item.cartId === cart.item._id)
  //     );
  //   }
  // }, [cart.item, cartItem.list]);

  // React.useEffect(() => {
  //   if (cartItems.length > 0) {
  //     let total = 0;

  //     cartItems.forEach((item, index) => {
  //       total += parseInt(item.amount);
  //     });
  //     setTotalAmount(total);
  //   }
  // }, [cartItems]);

  const handleDelete = (e, item) => {
    if (window.confirm(`Bạn có muốn xóa ${item.foodName} khỏi đơn hàng?`)) {
      deleteCartItem({
        id: cart._id,
        itemId: item._id,
      });
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>Tên món</TableCell>
            <TableCell>Số lượng</TableCell>
            <TableCell align="right">Giá (VND)</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.item?.items?.map((row) => (
            <TableRow key={row._id}>
              <TableCell>
                <Typography variant="h4">{row.foodName}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h4">{row.quantity}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h4">
                  <NumberFormat
                    thousandSeparator
                    displayType="text"
                    value={row.amount}
                  />
                </Typography>
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={(e) => handleDelete(e, row)}>
                  <Close />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell colSpan="2">
              <Typography variant="h4">Tổng tiền</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h4">
                <NumberFormat
                  thousandSeparator
                  displayType="text"
                  value={cart.item?.totalAmount}
                />
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, { deleteCartItem })(CartDetail);
