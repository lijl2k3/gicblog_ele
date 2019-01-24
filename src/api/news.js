import axios from './index';
export function getNews() {
    axios.get('index/news').then(
        function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
    })

}