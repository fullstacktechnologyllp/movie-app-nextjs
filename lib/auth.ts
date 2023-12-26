import type { NextRequest } from 'next/server';
import { SignJWT, decodeJwt, jwtVerify } from 'jose';
import { ERROR_RESPONSES, getJwtSecretKey } from '../shared/constants';
import { NextApiRequest } from 'next';

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
export async function verifyAuth(req: NextRequest): Promise<Partial<UserJwtPayload>> {
    const bearerToken = req.headers.get('authorization');

    if (!bearerToken || !bearerToken.split(' ', 2)[1]) {
        throw ERROR_RESPONSES.AUTH_TOKEN_IS_REQUIRED;
    }

    const token = bearerToken.split(' ', 2)[1];

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
export async function decode(req: NextApiRequest) {
    const bearerToken = req.headers.authorization;

    if (!bearerToken || !bearerToken.split(' ', 2)[1]) {
        throw new ErrorHandler(403, ERROR_RESPONSES.AUTH_TOKEN_IS_REQUIRED);
    }

    const token = bearerToken.split(' ', 2)[1];

    try {
        const verified = await decodeJwt(token);
        return verified;
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