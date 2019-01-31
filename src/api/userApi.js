import axios from 'axios';
export function _login(data){
    return axios.post('http://gicapi.io/index.php/index/user/login',data);
}
export function _test() {
    return axios.get('http://gicapi.io/index.php/index/user/test');
}