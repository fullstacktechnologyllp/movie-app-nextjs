import type { NextApiRequest } from 'next';
import { ErrorHandler, decode } from '../../lib/auth';
import { ERROR_RESPONSES } from '../constants';
import { userService } from './users';

class AuthService {
    async authenticate(req: NextApiRequest) {
        try {

            const bearerToken = req.headers.authorization;
            const token = bearerToken?.split(' ', 2)[1];

            if (!bearerToken || !bearerToken.split(' ', 2)[1] || !token) {
                throw new ErrorHandler(403, ERROR_RESPONSES.AUTH_TOKEN_IS_REQUIRED);
            }

            console.log(token);

            const payload = decode(token);

            const userId = payload['userId'] as string;

            if (!userId) {
                throw new ErrorHandler(404, ERROR_RESPONSES.USER_NOT_FOUND);
            }

            const user = await userService.findOneById(userId);

            if (!user) {
                throw new ErrorHandler(404, ERROR_RESPONSES.USER_NOT_FOUND);
            }

            return user;
        } catch (error) {
            throw new ErrorHandler(403, ERROR_RESPONSES.UNAUTHORIZED);
        }
    }
}

export const authService = new AuthService();