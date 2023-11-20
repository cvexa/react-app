import {baseUrl, requestOptions} from "../utils/requestHelper.js";

export async function GetTop(token, limit) {
    requestOptions.method = 'GET';

    return await fetch(`${baseUrl}top-three?limit=${limit ?? 3}`, [requestOptions.method, requestOptions.headers]).then(response => response.json()).then((data) => {
        return data;
    })
}