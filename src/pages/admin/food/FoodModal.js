import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { updateFood, createFood, getAllCategory } from "../../../actions";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginBottom: theme.spacing(2),
    },
  },
}));

function FoodModal({
  open,
  onClose,
  food,
  updateFood,
  createFood,
  isEdit,
  getAllCategory,
  category,
}) {
  const {t} = useTranslation();
  const classes = useStyles();
  const init = {
    name: "",
    price: 0,
    categoryId: "",
  };
  const [updateObj, setUpdateObj] = React.useState(init);

  React.useEffect(() => {
    if (category.list.length === 0) {
      getAllCategory();
    }
  }, [category.list, getAllCategory]);

  React.useEffect(() => {
    if (isEdit && food.item._id && food.item._id !== updateObj._id) {
      setUpdateObj(food.item);
    }
  }, [food.item, updateObj, isEdit]);

  const resetForm = () => {
    setUpdateObj(init);
  };

  const handleSave = () => {
    if (food.item._id) {
      updateFood({
        id: food.item._id,
        body: updateObj,
      });
    } else {
      createFood(updateObj);
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
        <DialogTitle id="alert-dialog-title">{t("menu")}</DialogTitle>
        <DialogContent>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              name="name"
              label={t("food.name")}
              type="text"
              value={updateObj.name}
              onChange={handleChange}
              fullWidth
            />
            <NumberFormat
              value={updateObj.price}
              customInput={TextField}
              thousandSeparator
              label={t("price")}
              fullWidth
              onValueChange={(values) => {
                handleChange({
                  target: {
                    name: "price",
                    value: values.value,
                  },
                });
              }}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                {t("category")}
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                name="categoryId"
                value={updateObj.categoryId}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {category.list.length > 0 &&
                  category.list.map((item) => (
                    <MenuItem value={item._id} key={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
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
  food: state.food,
  category: state.category,
});

export default connect(mapStateToProps, {
  updateFood,
  createFood,
  getAllCategory,
})(FoodModal);
