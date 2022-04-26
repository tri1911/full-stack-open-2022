import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.status);
};

const update = (updatedObject) => {
  const request = axios.put(`${baseUrl}/${updatedObject.id}`, {
    newNumber: updatedObject.number,
  });
  return request.then((response) => response.data);
};

const methods = { getAll, create, remove, update };

export default methods;
