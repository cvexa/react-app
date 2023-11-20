import {baseUrl, requestOptions} from "../utils/requestHelper.js";

export async function GetTop(token) {
    requestOptions.method = 'GET';
    requestOptions.headers = {...requestOptions.headers, 'Authorization' : token}

    return await fetch(`${baseUrl}top-three`, [requestOptions.method, requestOptions.headers]).then(response => response.json()).then((data) => {
        return data;
    })
}