import axios from "axios";

const baseUrl = "/cartItems";

export function getAll() {
  return axios
    .get(baseUrl)
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
