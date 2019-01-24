import axios from 'axios';
axios.defaults.baseURL='http://gicapi.io/index.php/index/';
axios.interceptors.response.use(function (res) {
    return (res.data);
})
export default axios;