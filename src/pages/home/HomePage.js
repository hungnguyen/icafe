import React from "react";
import clsx from "clsx";

import { Grid, Paper, Typography, ButtonBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Loading from "../../components/Loading";
import CartModal from "./cart/CartModal";

import {
  getAllTable,
  createCart,
  deleteCart,
  updateTable,
  selectTable,
  unselectTable,
  getAllCart,
} from "../../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(3),
  },
  paper: {
    textAlign: "center",
    padding: theme.spacing(5),
    width: 200,
    height: 200,
    borderRadius: "50%",
    color: theme.palette.text.secondary,
  },
  hightlight: {
    backgroundColor: theme.palette.warning.light,
  },
  item: {
    marginBottom: theme.spacing(3),
  },
}));

function HomePage({
  table,
  getAllTable,
  cart,
  //cartItem,
  createCart,
  deleteCart,
  getAllCart,
  updateTable,
  selectTable,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    getAllCart({ completed: false });
  }, [getAllCart]);

  React.useEffect(() => {
    getAllTable();
  }, [getAllTable]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    let cartOnTable = cart.list.find(
      (item) => item.tableId === table.item._id && !item.completed
    );

    if (cartOnTable) {
      //   let cartItems = cartItem.list.filter(
      //     (item) => item.cartId === cartOnTable._id
      //   );

      if (cartOnTable.items.length === 0) {
        deleteCart(cartOnTable._id);
        updateTable({
          id: table.item._id,
          body: {
            ...table.item,
            using: false,
          },
        });
      } else {
        updateTable({
          id: table.item._id,
          body: {
            ...table.item,
            using: true,
          },
        });
      }
    }
    handleClose();
  };

  const handleClick = (e, item) => {
    if (!isUsing(item._id)) {
      createCart({
        dateTime: new Date(),
        tableId: item._id,
        tableName: item.name,
        completed: false,
      });
    }
    setOpen(true);
    selectTable(item);
  };

  const isUsing = (tableId) => {
    let index = table.list.findIndex(
      (item) => item._id === tableId && item.using
    );
    return index >= 0;
  };

  return (
    <div className={classes.root}>
      <Grid container>
        {table.list.length > 0 &&
          table.list.map((item) => (
            <Grid
              container
              item
              xs={2}
              key={item._id}
              className={classes.item}
              justify="center"
              alignItems="center"
            >
              <Paper
                className={clsx(
                  classes.paper,
                  item.using && classes.hightlight
                )}
                component={ButtonBase}
                onClick={(e) => handleClick(e, item)}
              >
                <Typography variant="h3">{item.name}</Typography>
              </Paper>
            </Grid>
          ))}
      </Grid>
      <Loading open={table.loading} />
      <CartModal open={open} onClose={handleClose} onUpdate={handleUpdate} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  table: state.table,
  cart: state.cart,
  //cartItem: state.cartItem,
});

export default connect(mapStateToProps, {
  getAllTable,
  createCart,
  deleteCart,
  getAllCart,
  updateTable,
  selectTable,
  unselectTable,
})(HomePage);
