import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  getAllCategory,
  selectCategory,
  deleteCategory,
  unselectCategory,
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
import { Delete, Edit, Add } from "@material-ui/icons";
import TablePaginationActions from "../../../components/TablePaginationActions";
import TableToolbar from "../../../components/TableToolbar";
import Loading from "../../../components/Loading";
import CategoryModal from "./CategoryModal";
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



function CategoryPage({
  category,
  getAllCategory,
  selectCategory,
  deleteCategory,
  unselectCategory,
}) {
  const {t} = useTranslation();
  React.useEffect(() => {
    getAllCategory();
  }, [getAllCategory]);

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);

  const columns = [
    { id: "name", label: t("name"), minWidth: 170 },
  
    { id: "action", label: "", minWidth: 100 },
  ];

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, category.list.length - page * rowsPerPage);

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
    unselectCategory();
  };

  const handleEdit = (e, id) => {
    selectCategory(id);
    setIsEdit(true);
    setOpen(true);
  };
  const handleDelete = (e, item) => {
    if (window.confirm(`${t("confirm.delete")} ${item.name}`)) {
      deleteCategory(item._id);
    }
  };
  const handleAdd = () => {
    setOpen(true);
  };
  return (
    <Paper className={classes.paper}>
      <TableToolbar title={t("category")}>
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
              ? category.list.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : category.list
            ).map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>

                <TableCell>
                  <IconButton
                    size="small"
                    onClick={(e) => handleEdit(e, row._id)}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={(e) => handleDelete(e, row._id)}
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
                count={category.list.length}
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
      <CategoryModal
        open={open}
        onClose={handleClose}
        isEdit={isEdit}
      ></CategoryModal>
      <Loading open={category.loading} />
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  category: state.category,
});

export default connect(mapStateToProps, {
  getAllCategory,
  selectCategory,
  deleteCategory,
  unselectCategory,
})(CategoryPage);
