import type { NextApiRequest } from 'next';
import { decode } from '../../lib/auth';
import { ERROR_RESPONSES } from '../constants';
import { userService } from './users';

class AuthService {
    async authenticate(req: NextApiRequest) {
        const payload = await decode(req);

        const userId = payload['userId'] as string;

        if (!userId) {
            throw ERROR_RESPONSES.USER_NOT_FOUND;
        }

        const user = await userService.findOneById(userId);

        if (!user) {
            throw ERROR_RESPONSES.USER_NOT_FOUND;
        }

        return user
    }
}

export const authService = new AuthService();