import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";

import { connect } from "react-redux";
import { updateCategory, createCategory } from "../../../actions";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginBottom: theme.spacing(2),
    },
  },
}));

function CategoryModal({
  open,
  onClose,
  category,
  updateCategory,
  createCategory,
  isEdit,
}) {
  const {t} = useTranslation();
  const classes = useStyles();
  const init = {
    name: "",
    floor: 1,
  };
  const [updateObj, setUpdateObj] = React.useState(init);

  React.useEffect(() => {
    if (isEdit && category.item._id && category.item._id !== updateObj._id) {
      setUpdateObj(category.item);
    }
  }, [category.item, updateObj, isEdit]);

  const resetForm = () => {
    setUpdateObj(init);
  };

  const handleSave = () => {
    if (category.item._id) {
      updateCategory({
        id: category.item._id,
        body: updateObj,
      });
    } else {
      createCategory(updateObj);
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
        <DialogTitle id="alert-dialog-title">{t("category")}</DialogTitle>
        <DialogContent>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              name="name"
              label={t("name")}
              type="text"
              value={updateObj.name}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t("cancel")}
          </Button>
          <Button onClick={handleSave} color="primary" autoFocus>
            {t("save")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
  category: state.category,
});

export default connect(mapStateToProps, {
  updateCategory,
  createCategory,
})(CategoryModal);
