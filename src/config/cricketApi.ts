import axios, { AxiosInstance } from 'axios';

const cricketApiInstance: AxiosInstance = axios.create({
  baseURL: 'http://core.espnuk.org/v2/sports/cricket',
});

export default cricketApiInstance;