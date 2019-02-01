import axios from 'axios';
axios.defaults.baseURL='http://gicapi.io/index.php/index';
axios.defaults.withCredentials = true;
export default axios