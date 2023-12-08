export async function getCurrentTime() {
    return await fetch(`http://worldtimeapi.org/api/timezone/Europe/Sofia`, {
        method: 'GET',
    }).then(response => response.json()).then((data) => {
        return data;
    })
}