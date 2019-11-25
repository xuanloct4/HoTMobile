import React from 'react';

export default class API {
    static url = {
        USER_AUTHORIZE: '/user/authorize',
    };

    static baseURL = {
        hot: 'http://192.168.0.149/hot/public/api',
        // hot: 'http://localhost/hot/public/api',
    };

    static defaultHeaders = {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Chanel-ID': 1,
    };

    static httpMethods = {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        PATCH: 'PATCH',
        DELETE: 'DELETE',
    };

    static fetchAPI = (onSuccess, onError, url, bodyObject, additionalHeaders, method = API.httpMethods.GET, baseURL = API.baseURL.hot) => {
        let headers = API.defaultHeaders;
        let status;

        let addHeaderKeys = Object.keys(additionalHeaders);
        for (let i = 0; i < addHeaderKeys.length; i++) {
            headers.push(additionalHeaders[addHeaderKeys[i]]);
        }

        let fullURL = baseURL + url;
        let body = JSON.stringify(bodyObject);
        console.log(method);
        console.log(fullURL);
        console.log(headers);
        console.log(body);
        fetch(fullURL, {
            method: method,
            headers: headers,
            body: body,
        })
            .then((response) => {
                let jsonString = JSON.stringify(response, null, 4);
                status = JSON.parse(jsonString).status;
                let json = response.json();
                return json;
            })
            .then((responseJson) => {
                console.log(responseJson);
                if (status != '200') {
                    onError(responseJson);
                } else {
                    onSuccess(responseJson);
                }
            })
            .catch((error) => {
                console.log(error);
                onError(error);
            });
    };
}
