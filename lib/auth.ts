import { SignJWT, decodeJwt, jwtVerify } from 'jose';
import { ERROR_RESPONSES, getJwtSecretKey } from '../shared/constants';

interface UserJwtPayload {
    userId: string;
    iat: number;
}

export class ErrorHandler extends Error {
    readonly statusCode: number = 404;
    readonly message: string = '';
    constructor(
        statusCode: number,
        message: string
    ) {
        super();
        this.statusCode = statusCode
        this.message = message
    };
}

/**
 * Verifies the user's JWT token and returns its payload if it's valid.
 */
export async function verifyAuth(token: string): Promise<Partial<UserJwtPayload>> {
    try {
        const verified = await jwtVerify(
            token,
            new TextEncoder().encode(getJwtSecretKey())
        );

        return verified.payload;
    } catch (err) {
        throw ERROR_RESPONSES.AUTH_TOKEN_IS_EXPIRED;
    }
}

/**
 * decode the user's JWT token
 */
export function decode(token: string) {
    try {
        return decodeJwt(token);
    } catch (err) {
        console.error(err);
        throw new ErrorHandler(500, ERROR_RESPONSES.PLEASE_TRY_AGAIN);
    }
}

/**
 * Adds the user token to a response.
 */
export async function setUserToken(userId: string) {
    try {
        const token = await new SignJWT({ userId })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('1d')
            .sign(new TextEncoder().encode(getJwtSecretKey()));

        return token;
    } catch (err) {
        throw new ErrorHandler(500, ERROR_RESPONSES.PLEASE_TRY_AGAIN);
    }
}