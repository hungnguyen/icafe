import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  getAllTable,
  selectTable,
  deleteTable,
  updateTable,
  unselectTable,
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
import {
  Delete,
  Edit,
  RemoveShoppingCart,
  Add,
  Refresh,
} from "@material-ui/icons";
import TablePaginationActions from "../../../components/TablePaginationActions";
import TableToolbar from "../../../components/TableToolbar";
import Loading from "../../../components/Loading";
import TableModal from "./TableModal";
import { useTranslation } from "react-i18next";

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



function TablePage({
  table,
  getAllTable,
  selectTable,
  deleteTable,
  updateTable,
  unselectTable,
}) {
  const {t} = useTranslation();
  React.useEffect(() => {
    getAllTable();
  }, [getAllTable]);

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const columns = [
    { id: "name", label: t("name"), minWidth: 170 },
    { id: "floor", label: t("floor"), minWidth: 100 },
    { id: "status", label: t("status"), minWidth: 100 },
    { id: "action", label: "", minWidth: 100 },
  ];

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, table.list.length - page * rowsPerPage);

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
    unselectTable();
  };

  const handleEdit = (e, id) => {
    selectTable(id);
    setIsEdit(true);
    setOpen(true);
  };
  const handleDelete = (e, item) => {
    if (window.confirm(`${t("confirm.delete")} ${item.name}`)) {
      deleteTable(item._id);
    }
  };
  const handleAdd = () => {
    setOpen(true);
  };
  const handleCancel = (e, item) => {
    updateTable({
      id: item._id,
      body: {
        ...item,
        using: false,
      },
    });
  };
  const handleRefresh = () => {
    getAllTable();
  };
  return (
    <Paper className={classes.paper}>
      <TableToolbar title={t("table")}>
        <Tooltip title="Refresh">
          <IconButton aria-label="Refresh" onClick={handleRefresh}>
            <Refresh />
          </IconButton>
        </Tooltip>
        <Tooltip title={t("add.new")}>
          <IconButton aria-label={t("add.new")} onClick={handleAdd}>
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
              ? table.list.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : table.list
            ).map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{`${t("floor")} ${row.floor}`}</TableCell>
                <TableCell>{row.using ? t("not.available") : ""}</TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={(e) => handleCancel(e, row)}
                  >
                    <RemoveShoppingCart fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={(e) => handleEdit(e, row._id)}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={(e) => handleDelete(e, row)}
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
                count={table.list.length}
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
      <TableModal
        open={open}
        onClose={handleClose}
        isEdit={isEdit}
      ></TableModal>
      <Loading open={table.loading} />
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  table: state.table,
});

export default connect(mapStateToProps, {
  getAllTable,
  selectTable,
  deleteTable,
  updateTable,
  unselectTable,
})(TablePage);
