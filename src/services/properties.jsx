import {baseUrl, requestOptions} from "../utils/requestHelper.js";
import {getUser} from "../utils/user.js";

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
    let userToken = getUser().token;
    if(userToken) {
        requestOptions.headers = {...requestOptions.headers, Authorization: `Bearer ${userToken}`};
    }

    return await fetch(`${baseUrl}properties?per_page=${perPage ?? 10}&page=${page}`, {
        method: requestOptions.method,
        headers: requestOptions.headers,
    }).then(response => response.json()).then((data) => {
        return data;
    })
}

export async function GetPropertyById(id) {
    requestOptions.method = 'GET';

    return await fetch(`${baseUrl}properties/${id}`, [requestOptions.method, requestOptions.headers]).then(response => response.json()).then((data) => {
        return data;
    })
}

export async function getPaginatedPropertiesByType(perPage, page, type) {
    requestOptions.method = 'GET';

    return await fetch(`${baseUrl}properties-by-type?per_page=${perPage ?? 10}&page=${page}&type=${type}`, [requestOptions.method, requestOptions.headers]).then(response => response.json()).then((data) => {
        return data;
    })
}

export async function deleteProperty(id) {
    let userToken = getUser().token;
    requestOptions.method = 'DELETE';
    requestOptions.headers = {...requestOptions.headers, Authorization: `Bearer ${userToken}`};

    return await fetch(`${baseUrl}properties/${id}`, {
        method: requestOptions.method,
        headers: requestOptions.headers,
    }).then(response => response.json()).then((data) => {
        return data;
    });
}

export async function createProperty(data) {
    let userToken = getUser().token;
    requestOptions.method = 'POST';
    requestOptions.headers = {...requestOptions.headers, Authorization: `Bearer ${userToken}`};
    requestOptions.body = JSON.stringify({...data});

    return await fetch(`${baseUrl}properties`, {
        method: requestOptions.method,
        headers: requestOptions.headers,
        body: requestOptions.body,
    }).then(response => response.json()).then((data) => {
        return data;
    });
}

export async function updateProperty(id,data) {
    let userToken = getUser().token;
    requestOptions.method = 'PUT';
    requestOptions.headers = {...requestOptions.headers, Authorization: `Bearer ${userToken}`};
    requestOptions.body = JSON.stringify({...data});

    return await fetch(`${baseUrl}properties/${id}`, {
        method: requestOptions.method,
        headers: requestOptions.headers,
        body: requestOptions.body,
    }).then(response => response.json()).then((data) => {
        return data;
    });
}