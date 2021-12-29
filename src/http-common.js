import axios from 'axios';
import {baseURL} from './baseURL';

export default axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  headers: {
    'Content-type': 'application/json',
  },
});