import axios from 'axios';

// create an instance of the axios method with the withCredentials property set to true, 
// allowing for HTTP requests to be made using cookies
export const axiosInstance = axios.create({ withCredentials: true });