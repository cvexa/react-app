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

export async function logOut() {
    let userToken = getUser().token;
    requestOptions.method = 'POST';
    requestOptions.headers = {...requestOptions.headers, 'Authorization' :'Bearer ' + userToken}
    return await fetch(`${baseUrl}logout`, requestOptions).then(response => response.json()).then((data) => {
        return data;
    })
}