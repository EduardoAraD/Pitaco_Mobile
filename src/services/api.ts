import axios from 'axios';

const api = axios.create({
  baseURL: 'https://appitacos-deploy.herokuapp.com',
});
// URLBASEAPI LOCAL: 'http://1.9.2.1.6.8.0.1.0.9:3333' ip do pc local
// URLBASEAPI HEROKU: 'https://appitacos-deploy.herokuapp.com'

export default api;
