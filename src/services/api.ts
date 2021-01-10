import axios from 'axios';

const api = axios.create({
  baseURL: 'https://appitacos-deploy.herokuapp.com',
});
// URLBASEAPI LOCAL: 'http://10.0.0.108:3333/'
// URLBASEAPI HEROKU: 'https://appitacos-deploy.herokuapp.com'

export default api;
