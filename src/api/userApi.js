import myaxios from './myaxios';
export function _login(data){
    return myaxios.post('/user/login',data);
}
export function _test() {
    return myaxios.get('/user/test');
}