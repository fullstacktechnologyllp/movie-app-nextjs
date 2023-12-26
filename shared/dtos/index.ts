import type { NextApiRequest } from 'next';

export interface Request extends NextApiRequest {
    user: {
        id: string;
    };
}

export interface IUser {
    id: string;
    name: string;
    password: string;
    email: string;
}

export interface IMovie {
    id?: string;
    title: string;
    imageUrl: string;
    publishYear: number;
    userId: string;
}