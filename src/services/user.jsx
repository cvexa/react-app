import {baseUrl, requestOptions} from "../utils/requestHelper.js";
import {getUser} from "../utils/user.js";

export async function logIn(data) {
    requestOptions.method = 'POST';
    requestOptions.body = JSON.stringify({
        email: data.email,
        password: data.password
    });
    return await fetch(`${baseUrl}login`, requestOptions).then(response => response.json()).then((data) => {
        return data;
    })
}

export async function register(data) {
    requestOptions.method = 'POST';
    requestOptions.body = JSON.stringify({...data});
    return await fetch(`${baseUrl}register`, requestOptions).then(response => response.json()).then((data) => {
        return data;
    })
}

export async function logOut() {
    let userToken = getUser().token;
    requestOptions.method = 'POST';
    requestOptions.headers = {...requestOptions.headers, 'Authorization' :'Bearer ' + userToken}
    return await fetch(`${baseUrl}logout`, requestOptions).then(response => response.json()).then((data) => {
        return data;
    })
}

export async function getPaginatedUsers(perPage, page) {
    let userToken = getUser().token;
    requestOptions.method = 'GET';
    requestOptions.headers = {...requestOptions.headers, Authorization: `Bearer ${userToken}`}
    return await fetch(`${baseUrl}users?per_page=${perPage ?? 10}&page=${page}`, {
        method: requestOptions.method,
        headers: requestOptions.headers
    }).then(response => response.json()).then((data) => {
        return data;
    });
}

export async function getUserById(id) {
    let userToken = getUser().token;
    requestOptions.method = 'GET';
    requestOptions.headers = {...requestOptions.headers, Authorization: `Bearer ${userToken}`}

    return await fetch(`${baseUrl}users/${id}`, {
        method: requestOptions.method,
        headers: requestOptions.headers
    }).then(response => response.json()).then((data) => {
        return data;
    });
}

export async function updateUserById(id, data) {
    let userToken = getUser().token;
    requestOptions.method = 'PUT';
    requestOptions.headers = {...requestOptions.headers, Authorization: `Bearer ${userToken}`};
    requestOptions.body = JSON.stringify({...data});

    return await fetch(`${baseUrl}users/${id}`, {
        method: requestOptions.method,
        headers: requestOptions.headers,
        body: requestOptions.body
    }).then(response => response.json()).then((data) => {
        return data;
    });
}

export async function deleteUserById(id) {
    let userToken = getUser().token;
    requestOptions.method = 'DELETE';
    requestOptions.headers = {...requestOptions.headers, Authorization: `Bearer ${userToken}`};

    return await fetch(`${baseUrl}users/${id}`, {
        method: requestOptions.method,
        headers: requestOptions.headers,
    }).then(response => response.json()).then((data) => {
        return data;
    });
}