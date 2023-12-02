export function isEmailValid(email)
{
    if(email.length < 1 || !/\S+@\S+\.\S+/.test(email)){
        return false;
    }
    return true;
}

export function isPasswordValid(password)
{
    if(password.length < 6 || !/^(?=.{6,}$)\D*\d/.test(password)){
        return false;
    }
    return true;
}

export function validateString(data, rules)
{
    if(!data){
        return false;
    }

    if(data.length < rules.min){
        return false;
    }

    if(data.length > rules.max){
        return false;
    }

    return true;
}

export function validatePrice(data)
{
    //100 000 000 - max
    if(!new RegExp('^(\\d|[1-9]\\d{1,7})(\\.\\d{2})?$').test(data)) {
        return false;
    }
    return true;
}