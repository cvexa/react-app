import {baseUrl, requestOptions} from "../utils/requestHelper.js";

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