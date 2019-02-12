import myaxios from './myaxios';
export function _addNews(data){
    return myaxios.post('/news/addnews',data);
}

export function _newsList(data){
    return myaxios.get('/news/newslist',{params:data});
}

export function _details(data){
    return myaxios.get('/news/details',{params:data});
}

export function _total(data) {
    return myaxios.get('/news/total',{params:data});

}
