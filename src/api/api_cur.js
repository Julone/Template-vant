import axios from './axios';
export function test(){
    return axios({
        url: 'http://jsonplaceholder.typicode.com/posts'
    })
}