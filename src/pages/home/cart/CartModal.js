import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { Grid, Box } from "@material-ui/core";

import FoodMenu from "./FoodMenu";
import CartDetail from "./CartDetail";
import TalbleModal from "./TableModal";

import { connect } from "react-redux";
import {
  updateTable,
  updateCart,
  selectCart,
  deleteCart,
  deleteCartItem,
} from "../../../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  boxButton: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CartModal({
  open,
  onClose,
  onUpdate,
  cart,
  //cartItem,
  table,
  updateTable,
  updateCart,
  selectCart,
  deleteCart,
  deleteCartItem,
}) {
  const classes = useStyles();

  const [isChange, setIsChange] = React.useState(false);

  React.useEffect(() => {
    if (table.item && cart.list.length > 0) {
      selectCart(
        cart.list.find(
          (item) => item.tableId === table.item._id && !item.completed
        )
      );
    }
  }, [table.item, cart.list, selectCart]);

  const handleComplete = () => {
    updateTable({
      id: table.item._id,
      body: {
        ...table.item,
        using: false,
      },
    });
    updateCart({
      id: cart.item._id,
      body: {
        ...cart.item,
        completed: true,
      },
    });
    onClose();
  };

  const handleCancel = () => {
    updateTable({
      id: table.item._id,
      body: {
        ...table.item,
        using: false,
      },
    });

    deleteCart(cart.item._id);
    // let cartItems = cartItem.list.filter((item) => item.cartId === cart._id);

    // cartItems.forEach((item, index) => {
    //   deleteCartItem(item._id);
    // });
    onClose();
  };

  const handleChange = () => {
    setIsChange(true);
  };
  const handleSelect = (newTable) => {
    updateTable({
      id: table.item._id,
      body: {
        ...table.item,
        using: false,
      },
    });
    updateTable({
      id: newTable._id,
      body: {
        ...newTable,
        using: true,
      },
    });
    updateCart({
      id: cart.item._id,
      body: {
        ...cart.item,
        tableId: newTable._id,
        tableName: newTable.name,
      },
    });
    onClose();
  };
  const handleCancelChange = () => {
    setIsChange(false);
  };
  return (
    <div>
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onUpdate}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {table.item?.name}
            </Typography>
            <Button autoFocus color="inherit" onClick={onUpdate}>
              Lưu
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid xs={8} item>
              <CartDetail />
              <Box pt={1} textAlign="center" className={classes.boxButton}>
                <Button
                  variant="contained"
                  onClick={handleComplete}
                  color="primary"
                >
                  Đã thanh toán
                </Button>
                <Button variant="contained" onClick={handleCancel}>
                  Khách hủy
                </Button>
                <Button variant="contained" onClick={handleChange}>
                  Khách chuyển bàn
                </Button>
              </Box>
            </Grid>
            <Grid xs={4} item>
              <FoodMenu />
            </Grid>
          </Grid>
        </div>
      </Dialog>
      <TalbleModal
        open={isChange}
        onSelect={handleSelect}
        onClose={handleCancelChange}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  table: state.table,
  //cartItem: state.cartItem,
});

export default connect(mapStateToProps, {
  updateTable,
  updateCart,
  selectCart,
  deleteCart,
  deleteCartItem,
})(CartModal);
