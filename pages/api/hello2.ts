import type { NextApiRequest, NextApiResponse } from 'next';
import { authService } from '../../shared/services/auth';

interface Request extends NextApiRequest {
    userId: string;
}

type ResponseData = {
    message: string;
};

export default async function handler(
    req: Request,
    res: NextApiResponse
) {
    const user = await authService.authenticate(req);

    res.status(200).json({ message: user });
}