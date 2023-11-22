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

export async function GetPropertyTypes() {
    requestOptions.method = 'GET';

    return await fetch(`${baseUrl}property-types`, [requestOptions.method, requestOptions.headers]).then(response => response.json()).then((data) => {
        return data;
    })
}

export async function GetBestDealPropertyByTypes(type) {
    requestOptions.method = 'GET';

    return await fetch(`${baseUrl}best-deal-by-type/${type}`, [requestOptions.method, requestOptions.headers]).then(response => response.json()).then((data) => {
        return data;
    })
}

export async function getPaginatedProperties(perPage, page) {
    requestOptions.method = 'GET';

    return await fetch(`${baseUrl}properties?per_page=${perPage ?? 10}&page=${page}`, [requestOptions.method, requestOptions.headers]).then(response => response.json()).then((data) => {
        return data;
    })
}