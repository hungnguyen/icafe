import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  ShoppingCart,
  LocalCafe,
  TableChart,
  Category,
  Dashboard,
} from "@material-ui/icons";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import HomePage from "./HomePage";
import TablePage from "./table/TablePage";
import CategoryPage from "./category/CategoryPage";
import FoodPage from "./food/FoodPage";
import CartPage from "./cart/CartPage";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

export default function Master() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              iCafe
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <NavLink to="/admin/" className={classes.link}>
                  <ListItemText primary="Thống kê" />
                </NavLink>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button>
                <ListItemIcon>
                  <TableChart />
                </ListItemIcon>
                <NavLink to="/admin/table" className={classes.link}>
                  <ListItemText primary="Bàn" />
                </NavLink>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <LocalCafe />
                </ListItemIcon>
                <NavLink to="/admin/food" className={classes.link}>
                  <ListItemText primary="Thực đơn" />
                </NavLink>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Category />
                </ListItemIcon>
                <NavLink to="/admin/category" className={classes.link}>
                  <ListItemText primary="Danh mục" />
                </NavLink>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button>
                <ListItemIcon>
                  <ShoppingCart />
                </ListItemIcon>
                <NavLink to="/admin/cart" className={classes.link}>
                  <ListItemText primary="Đơn hàng" />
                </NavLink>
              </ListItem>
            </List>
          </div>
        </Drawer>
        <main className={classes.content}>
          <Toolbar />
          <Switch>
            <Route exact path="/admin">
              <HomePage />
            </Route>
            <Route path="/admin/table">
              <TablePage />
            </Route>
            <Route path="/admin/food">
              <FoodPage />
            </Route>
            <Route path="/admin/category">
              <CategoryPage />
            </Route>
            <Route path="/admin/cart">
              <CartPage />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}
