
import queryString from 'query-string'
let rootUrl = 'https://www.fastmock.site/mock/5ec6e252788014232bb48ba488e4db82/api';
let myFetch = {
    get(url,queryParams){
        if(queryParams){
            url = rootUrl + url + "?" + queryString.stringify(queryParams)
        }
        return fetch(url)
                .then(res=>res.json())
    },
    post(url,body){
        return fetch(rootUrl+url,{
            method:'POST',
            headers:{
                "Accept":'application/json',
                "Content-Type":'application/json'
            },
            body:JSON.stringify(body)
        })
        .then(res=>res.json())
    }
}

export {myFetch};