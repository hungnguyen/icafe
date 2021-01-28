import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Loading from "../../../components/Loading";
import NumberFormat from "react-number-format";

import {
  List,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  ListItemText,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import {
  getAllCategory,
  getAllFood,
  updateCartItem,
  createCartItem,
  updateCart,
} from "../../../actions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  list: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

function FoodMenu({
  category,
  food,
  cart,
  updateCartItem,
  createCartItem,
  getAllCategory,
  getAllFood,
  updateCart,
  //cartItem,
}) {
  const classes = useStyles();

  //const [cartItems, setCartItems] = React.useState([]);

  React.useEffect(() => {
    getAllCategory();
  }, [getAllCategory]);

  React.useEffect(() => {
    getAllFood();
  }, [getAllFood]);

  // React.useEffect(() => {
  //   if (cart.item && Object.keys(cart.item).length > 0) {
  //     setCartItems(
  //       cartItem.list.filter((item) => item.cartId === cart.item._id)
  //     );
  //   }
  // }, [cart.item, cartItem.list]);

  const handleAdd = (e, food) => {
    let cartItemFood = cart.item.items?.find(
      (item) => item.foodId === food._id
    );
    // let totalAmount = 0;
    // cart.item.items.forEach((item, index) => {
    //   totalAmount += parseInt(item.amount);
    // });

    if (cartItemFood) {
      updateCartItem({
        id: cart.item._id,
        itemId: cartItemFood._id,
        totalAmount: parseInt(cart.item.totalAmount) + parseInt(food.price),
        body: {
          ...cartItemFood,
          quantity: cartItemFood.quantity + 1,
          amount: parseInt(food.price) * (cartItemFood.quantity + 1),
        },
      });
      //totalAmount += parseInt(food.price) * (cartItemFood.quantity + 1);
    } else {
      createCartItem({
        id: cart.item._id,
        body: {
          foodId: food._id,
          foodName: food.name,
          quantity: 1,
          price: food.price,
          amount: food.price,
          cartId: cart.item._id,
        },
      });
      //totalAmount += parseInt(food.price);
    }

    // updateCart({
    //   id: cart.item._id,
    //   body: {
    //     ...cart.item,
    //     totalAmount,
    //   },
    // });
  };

  const getFoodByCat = (catId) => {
    return food.list.filter((item) => item.categoryId === catId);
  };
  return (
    <div className={classes.root}>
      {category.list.length > 0 &&
        category.list.map((cat) => (
          <Accordion key={cat._id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>{cat.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List className={classes.list}>
                {getFoodByCat(cat._id).map((food) => (
                  <ListItem key={food._id}>
                    <ListItemText
                      primary={food.name}
                      secondary={
                        <NumberFormat
                          value={food.price}
                          thousandSeparator
                          displayType="text"
                        />
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={(e) => handleAdd(e, food)}
                      >
                        <Add />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      <Loading open={food.loading || category.loading} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  category: state.category,
  food: state.food,
  //cartItem: state.cartItem,
  cart: state.cart,
});

export default connect(mapStateToProps, {
  updateCartItem,
  createCartItem,
  getAllCategory,
  getAllFood,
  updateCart,
})(FoodMenu);
