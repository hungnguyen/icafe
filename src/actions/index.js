import * as actionTypes from "./actionTypes";

//table actions
export const getAllTable = () => ({
  type: actionTypes.GET_ALL_TABLE,
});
export const getAllTableSuccess = (data) => ({
  type: actionTypes.GET_ALL_TABLE_SUCCESS,
  data,
});
export const getOneTable = (data) => ({
  type: actionTypes.GET_ONE_TABLE,
  data,
});
export const getOneTableSuccess = (data) => ({
  type: actionTypes.GET_ONE_TABLE_SUCCESS,
  data,
});
export const createTable = (data) => ({
  type: actionTypes.CREATE_TABLE,
  data,
});
export const createTableSuccess = (data) => ({
  type: actionTypes.CREATE_TABLE_SUCCESS,
  data,
});
export const updateTable = (data) => ({
  type: actionTypes.UPDATE_TABLE,
  data,
});
export const updateTableSuccess = (data) => ({
  type: actionTypes.UPDATE_TABLE_SUCCESS,
  data,
});
export const deleteTable = (data) => ({
  type: actionTypes.DELETE_TABLE,
  data,
});
export const deleteTableSuccess = (data) => ({
  type: actionTypes.DELETE_TABLE_SUCCESS,
  data,
});
export const selectTable = (data) => ({
  type: actionTypes.SELECT_TABLE,
  data,
});
export const unselectTable = () => ({
  type: actionTypes.UNSELECT_TABLE,
});

//food actions
export const getAllFood = () => ({
  type: actionTypes.GET_ALL_FOOD,
});
export const getAllFoodSuccess = (data) => ({
  type: actionTypes.GET_ALL_FOOD_SUCCESS,
  data,
});
export const getOneFood = (data) => ({
  type: actionTypes.GET_ONE_FOOD,
  data,
});
export const getOneFoodSuccess = (data) => ({
  type: actionTypes.GET_ONE_FOOD_SUCCESS,
  data,
});
export const createFood = (data) => ({
  type: actionTypes.CREATE_FOOD,
  data,
});
export const createFoodSuccess = (data) => ({
  type: actionTypes.CREATE_FOOD_SUCCESS,
  data,
});
export const updateFood = (data) => ({
  type: actionTypes.UPDATE_FOOD,
  data,
});
export const updateFoodSuccess = (data) => ({
  type: actionTypes.UPDATE_FOOD_SUCCESS,
  data,
});
export const deleteFood = (data) => ({
  type: actionTypes.DELETE_FOOD,
  data,
});
export const deleteFoodSuccess = (data) => ({
  type: actionTypes.DELETE_FOOD_SUCCESS,
  data,
});
export const selectFood = (data) => ({
  type: actionTypes.SELECT_FOOD,
  data,
});
export const unselectFood = () => ({
  type: actionTypes.UNSELECT_FOOD,
});

//category actions
export const getAllCategory = () => ({
  type: actionTypes.GET_ALL_CATEGORY,
});
export const getAllCategorySuccess = (data) => ({
  type: actionTypes.GET_ALL_CATEGORY_SUCCESS,
  data,
});
export const getOneCategory = (data) => ({
  type: actionTypes.GET_ONE_CATEGORY,
  data,
});
export const getOneCategorySuccess = (data) => ({
  type: actionTypes.GET_ONE_CATEGORY_SUCCESS,
  data,
});
export const createCategory = (data) => ({
  type: actionTypes.CREATE_CATEGORY,
  data,
});
export const createCategorySuccess = (data) => ({
  type: actionTypes.CREATE_CATEGORY_SUCCESS,
  data,
});
export const updateCategory = (data) => ({
  type: actionTypes.UPDATE_CATEGORY,
  data,
});
export const updateCategorySuccess = (data) => ({
  type: actionTypes.UPDATE_CATEGORY_SUCCESS,
  data,
});
export const deleteCategory = (data) => ({
  type: actionTypes.DELETE_CATEGORY,
  data,
});
export const deleteCategorySuccess = (data) => ({
  type: actionTypes.DELETE_CATEGORY_SUCCESS,
  data,
});
export const selectCategory = (data) => ({
  type: actionTypes.SELECT_CATEGORY,
  data,
});
export const unselectCategory = () => ({
  type: actionTypes.UNSELECT_CATEGORY,
});

//cart actions
export const getAllCart = (data) => ({
  type: actionTypes.GET_ALL_CART,
  data,
});
export const getAllCartSuccess = (data) => ({
  type: actionTypes.GET_ALL_CART_SUCCESS,
  data,
});
export const getOneCart = (data) => ({
  type: actionTypes.GET_ONE_CART,
  data,
});
export const getOneCartSuccess = (data) => ({
  type: actionTypes.GET_ONE_CART_SUCCESS,
  data,
});
export const createCart = (data) => ({
  type: actionTypes.CREATE_CART,
  data,
});
export const createCartSuccess = (data) => ({
  type: actionTypes.CREATE_CART_SUCCESS,
  data,
});
export const updateCart = (data) => ({
  type: actionTypes.UPDATE_CART,
  data,
});
export const updateCartSuccess = (data) => ({
  type: actionTypes.UPDATE_CART_SUCCESS,
  data,
});
export const deleteCart = (data) => ({
  type: actionTypes.DELETE_CART,
  data,
});
export const deleteCartSuccess = (data) => ({
  type: actionTypes.DELETE_CART_SUCCESS,
  data,
});
export const selectCart = (data) => ({
  type: actionTypes.SELECT_CART,
  data,
});
export const unselectCart = () => ({
  type: actionTypes.UNSELECT_CART,
});

export const updateFilterCart = (data) => ({
  type: actionTypes.UPDATE_FILTER_CART,
  data,
});
export const removeFilterCart = () => ({
  type: actionTypes.REMOVE_FILTER_CART,
});
export const getCountCart = (data) => ({
  type: actionTypes.GET_COUNT_CART,
  data,
});
export const getCountCartSuccess = (data) => ({
  type: actionTypes.GET_COUNT_CART_SUCCESS,
  data,
});

//cartitem actions
export const getAllCartItem = () => ({
  type: actionTypes.GET_ALL_CARTITEM,
});
export const getAllCartItemSuccess = (data) => ({
  type: actionTypes.GET_ALL_CARTITEM_SUCCESS,
  data,
});
export const getOneCartItem = (data) => ({
  type: actionTypes.GET_ONE_CARTITEM,
  data,
});
export const getOneCartItemSuccess = (data) => ({
  type: actionTypes.GET_ONE_CARTITEM_SUCCESS,
  data,
});
export const createCartItem = (data) => ({
  type: actionTypes.CREATE_CARTITEM,
  data,
});
export const createCartItemSuccess = (data) => ({
  type: actionTypes.CREATE_CARTITEM_SUCCESS,
  data,
});
export const updateCartItem = (data) => ({
  type: actionTypes.UPDATE_CARTITEM,
  data,
});
export const updateCartItemSuccess = (data) => ({
  type: actionTypes.UPDATE_CARTITEM_SUCCESS,
  data,
});
export const deleteCartItem = (data) => ({
  type: actionTypes.DELETE_CARTITEM,
  data,
});
export const deleteCartItemSuccess = (data) => ({
  type: actionTypes.DELETE_CARTITEM_SUCCESS,
  data,
});
export const selectCartItem = (data) => ({
  type: actionTypes.SELECT_CARTITEM,
  data,
});

//log actions
export const addLog = (data) => ({
  type: actionTypes.ADD_LOG,
  data,
});
export const openLog = (data) => ({
  type: actionTypes.OPEN_LOG,
  data,
});
