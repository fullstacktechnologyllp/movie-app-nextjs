import { type NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from './lib/auth';
import { ERROR_RESPONSES } from './shared/constants';

export const config = {
    matcher: ['/api/movies'],
};

interface Request extends NextRequest {
    userId: string;
}

export async function middleware(req: Request) {
    try {
        // validate the user is authenticated
        const verifiedToken = await verifyAuth(req);

        const userId = verifiedToken.userId;

        if (!userId) {
            throw ERROR_RESPONSES.USER_NOT_FOUND;
        }
    } catch (error) {
        // if this an API request, respond with JSON
        if (req.nextUrl.pathname.startsWith('/api/')) {
            return new NextResponse(
                JSON.stringify({ message: error }), { status: 401 });
        }
        // otherwise, redirect to the set token page
        else {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }
}