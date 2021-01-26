import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import { connect } from "react-redux";

function TableModal({ table, open, onSelect, onClose }) {
  const handleListItemClick = (value) => {
    onSelect(value);
    onClose();
  };

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={onClose}>
      <DialogTitle id="simple-dialog-title">Chọn bàn</DialogTitle>
      <List>
        {table.list.map((item) => (
          <ListItem
            button
            onClick={() => handleListItemClick(item)}
            key={item._id}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  table: state.table,
});

export default connect(mapStateToProps)(TableModal);
