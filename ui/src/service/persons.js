import axios from 'axios'

const baseURL = '/api/persons'

const add = (person) => (
  axios
    .post(baseURL, person)
    .then(response => response.data)
)

const getAll = () => (
  axios
    .get(baseURL)
    .then(response => response.data)
)

const remove = (person) => (
  axios
    .delete(`${baseURL}/${person.id}`)
    .then(response => response.data)
)

const update = (person) => (
  axios
    .put(`${baseURL}/${person.id}`, person)
    .then(response => response.data)
)

export default { getAll, add, remove, update }
