import type { NextApiRequest } from 'next';

export interface Request extends NextApiRequest {
    user: {
        id: string;
    };
}