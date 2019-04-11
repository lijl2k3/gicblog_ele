import myaxios from './myaxios';
export function _addEvents(data){
    return myaxios.post('/news/addevents',data);
}

export function _editEvents(data){
    return myaxios.post('/news/editevents',data);
}

export function _eventsList(data){
    return myaxios.get('/news/eventslist',{params:data});
}

export function _details(data){
    return myaxios.get('/events/details',{params:data});
}

export function _total(data) {
    return myaxios.get('/events/total',{params:data});

}

export function _delete(data){
    return myaxios.post('/events/delete',data);
}
