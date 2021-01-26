import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { connect } from "react-redux";
import { updateFilterCart, removeFilterCart } from "../../../actions";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function CartFilter({
  open,
  cartFilter,
  updateFilterCart,
  removeFilterCart,
  onClose,
}) {
  const classes = useStyles();
  const [newFilter, setNewFilter] = React.useState(cartFilter);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFilter({ ...newFilter, [name]: value });
  };
  const handleApply = () => {
    updateFilterCart(newFilter);
    onClose();
  };
  const handleRemove = () => {
    removeFilterCart();
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Lọc đơn hàng</DialogTitle>
      <DialogContent>
        <TextField
          name="date"
          label="Chọn ngày"
          type="date"
          value={newFilter.date}
          onChange={handleChange}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRemove} color="primary">
          Hủy lọc
        </Button>
        <Button onClick={handleApply} color="primary">
          Áp dụng
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  cartFilter: state.cartFilter,
});

export default connect(mapStateToProps, { updateFilterCart, removeFilterCart })(
  CartFilter
);
