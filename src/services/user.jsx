const baseUrl = 'http://localhost:8000/api/'
const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: ''
};

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