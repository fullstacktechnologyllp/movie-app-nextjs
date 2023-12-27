import { type NextRequest, NextResponse } from 'next/server';
import { ErrorHandler, verifyAuth } from './lib/auth';
import { ERROR_RESPONSES } from './shared/constants';

export const config = {
    matcher: ['/api/movies'],
};

interface Request extends NextRequest {
    userId: string;
}

export async function middleware(req: Request) {
    try {
        const bearerToken = req.headers.get('authorization');
        const token = bearerToken?.split(' ', 2)[1];

        if (!bearerToken || !bearerToken.split(' ', 2)[1] || !token) {
            throw new ErrorHandler(403, ERROR_RESPONSES.AUTH_TOKEN_IS_REQUIRED);
        }

        // validate the user is authenticated
        const verifiedToken = await verifyAuth(token);

        const userId = verifiedToken.userId;

        if (!userId) {
            throw new ErrorHandler(403, ERROR_RESPONSES.UNAUTHORIZED);
        }
    } catch (error) {
        // if this an API request, respond with JSON
        if (req.nextUrl.pathname.startsWith('/api/')) {
            return new NextResponse((JSON.stringify({
                message: error
            })), { status: 403 });
        }
        // otherwise, redirect to the set token page
        else {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }
}