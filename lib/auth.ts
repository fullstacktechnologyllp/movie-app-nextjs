import type { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { SignJWT, jwtVerify } from 'jose';
import { getJwtSecretKey } from '../shared/constants';
import _ from 'lodash';

interface UserJwtPayload {
    jti: string;
    iat: number;
}

export class AuthError extends Error { }

/**
 * Verifies the user's JWT token and returns its payload if it's valid.
 */
export async function verifyAuth(req: NextRequest) {
    const bearerToken = req.headers.get('authorization');

    if (!bearerToken || _.isEmpty(bearerToken) || _.isEmpty(_.split(bearerToken, ' ', 2)[1])) {
        throw new AuthError('Missing user token');
    }

    try {
        const verified = await jwtVerify(
            bearerToken,
            new TextEncoder().encode(getJwtSecretKey())
        );
        return verified.payload as UserJwtPayload;
    } catch (err) {
        console.error(err)
        throw new AuthError('Your token has expired.');
    }
}

/**
 * Adds the user token to a response.
 */
export async function setUserCookie() {
    const token = await new SignJWT({})
        .setProtectedHeader({ alg: 'HS256' })
        .setJti(nanoid())
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(new TextEncoder().encode(getJwtSecretKey()));

    return token;
}