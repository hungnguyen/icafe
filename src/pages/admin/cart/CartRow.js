import React from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  IconButton,
  Typography,
  Collapse,
  Box,
} from "@material-ui/core";
import { Delete, KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import { useTranslation } from "react-i18next";

function CartRow({ row, onDelete }) {
  const [expand, setExpand] = React.useState(false);
  const {t} = useTranslation();
  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setExpand(!expand)}
          >
            {expand ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.tableName}
        </TableCell>
        <TableCell>
          <NumberFormat
            displayType="text"
            thousandSeparator
            value={row.totalAmount}
          />
        </TableCell>
        <TableCell component="th" scope="row">
          <Moment format="DD/MM/YYYY HH:mm" local>
            {row.dateTime}
          </Moment>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.completed ? t("completed") : ""}
        </TableCell>
        <TableCell>
          <IconButton size="small" onClick={(e) => onDelete(e, row)}>
            <Delete fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={expand} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                {t("detail")}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>{t("food.name")}</TableCell>
                    <TableCell>{t("quantity")}</TableCell>
                    <TableCell align="right">{t("price")}</TableCell>
                    <TableCell align="right">{t("amount")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.items?.map((cartItem) => (
                    <TableRow key={cartItem._id}>
                      <TableCell component="th" scope="row">
                        {cartItem.foodName}
                      </TableCell>
                      <TableCell>{cartItem.quantity}</TableCell>
                      <TableCell align="right">
                        <NumberFormat
                          displayType="text"
                          thousandSeparator
                          value={cartItem.price}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <NumberFormat
                          displayType="text"
                          thousandSeparator
                          value={cartItem.amount}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default CartRow;
