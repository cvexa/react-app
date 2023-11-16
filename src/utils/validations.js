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