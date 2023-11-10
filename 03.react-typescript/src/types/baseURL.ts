import axios from 'axios';

const defaultInstance = axios.create({
  baseURL: 'http://localhost:33088/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default defaultInstance;