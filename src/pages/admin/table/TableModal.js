import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";

import { connect } from "react-redux";
import { updateTable, createTable } from "../../../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginBottom: theme.spacing(2),
    },
  },
}));

function TableModal({
  open,
  onClose,
  table,
  updateTable,
  createTable,
  isEdit,
}) {
  const classes = useStyles();
  const init = {
    name: "",
    floor: 1,
  };
  const [updateObj, setUpdateObj] = React.useState(init);

  React.useEffect(() => {
    if (isEdit && table.item._id && table.item._id !== updateObj._id) {
      setUpdateObj(table.item);
    }
  }, [table.item, updateObj, isEdit]);

  const resetForm = () => {
    setUpdateObj(init);
  };

  const handleSave = () => {
    if (table.item._id) {
      updateTable({
        id: table.item._id,
        body: updateObj,
      });
    } else {
      createTable(updateObj);
    }
    resetForm();
    onClose();
  };
  const handleClose = () => {
    resetForm();
    onClose();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateObj({ ...updateObj, [name]: value });
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">Bàn</DialogTitle>
        <DialogContent>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              name="name"
              label="Tên bàn"
              type="text"
              value={updateObj.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="floor"
              label="Tầng"
              type="number"
              value={updateObj.floor}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleSave} color="primary" autoFocus>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
  table: state.table,
});

export default connect(mapStateToProps, {
  updateTable,
  createTable,
})(TableModal);
