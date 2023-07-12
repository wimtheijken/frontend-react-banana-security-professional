import jwt_decode from "jwt-decode"

export function checkTokenValidity( token ) {
    const decodedToken = jwt_decode( token );

    console.log(decodedToken.exp)

    const expirationTime = decodedToken.exp * 1000;

    console.log(expirationTime)

    const isExpired = Date.now() > expirationTime;
    return !isExpired;
}