import {baseUrl, requestOptions} from "../utils/requestHelper.js";

export async function GetTop(token, limit) {
    requestOptions.method = 'GET';
    requestOptions.headers = {...requestOptions.headers, 'Authorization' : token}

    return await fetch(`${baseUrl}top-three?limit=${limit ?? 3}`, [requestOptions.method, requestOptions.headers]).then(response => response.json()).then((data) => {
        return data;
    })
}