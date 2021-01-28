import axios from "axios";
import queryString from "query-string";
const baseUrl = "/carts";

export function getAll(data) {
  return axios
    .get(`${baseUrl}?${queryString.stringify(data)}`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
}

export function getOne(data) {
  return axios
    .get(`${baseUrl}/${data}`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
}

export function create(data) {
  return axios
    .post(baseUrl, data)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
}

export function update(data) {
  return axios
    .put(`${baseUrl}/${data.id}`, data.body)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
}

export function remove(data) {
  return axios
    .delete(`${baseUrl}/${data}`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
}

export function createCartItem(data) {
  return axios
    .post(`${baseUrl}/${data.id}/cartItems`, data.body)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
}

export function updateCartItem(data) {
  return axios
    .put(`${baseUrl}/${data.id}/cartItems/${data.itemId}`, data.body)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
}

export function removeCartItem(data) {
  return axios
    .delete(`${baseUrl}/${data.id}/cartItems/${data.itemId}`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
}

export function getCount(data) {
  return axios
    .get(`${baseUrl}/count?${queryString.stringify(data)}`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw e;
    });
}
