import {baseUrl, requestOptions} from "../utils/requestHelper.js";

export async function GetTop(limit) {
    requestOptions.method = 'GET';

    return await fetch(`${baseUrl}top-three?limit=${limit ?? 3}`, [requestOptions.method, requestOptions.headers]).then(response => response.json()).then((data) => {
        return data;
    })
}

export async function GetFeatured() {
    requestOptions.method = 'GET';

    return await fetch(`${baseUrl}featured-property`, [requestOptions.method, requestOptions.headers]).then(response => response.json()).then((data) => {
        return data;
    })
}