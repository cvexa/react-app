let storage = {};

export function getUser() {
    if (localStorage) {
        return JSON.parse(localStorage.getItem('user'));
    } else {
        const result = storage['user'];
        return result === undefined ? null : result; // imitation of the storage behaviour
    }
}

export function setUser(user) {
    if (localStorage) {
        localStorage.setItem('user', JSON.stringify(user));
    } else {
        storage = {
            ...storage,
            ['user']: JSON.stringify(user),
        };
    }
}