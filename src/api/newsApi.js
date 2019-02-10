import myaxios from './myaxios';
export function _addNews(data){
    return myaxios.post('/news/addnews',data);
}

export function _newsList(){
    return myaxios.get('/news/newslist');
}

export function _details(data){
    return myaxios.get('/news/details',{params:data});
}
