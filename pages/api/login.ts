import type { NextApiRequest, NextApiResponse } from 'next';
import { userService } from '../../shared/services/users';
import { userTokensService } from '../../shared/services/userTokens';
import { ERROR_RESPONSES } from '../../shared/constants';
import { utilService } from '../../shared/services/utils';
import { ErrorHandler, setUserToken } from '../../lib/auth';

/**
 * User login
 * @param req 
 * @param res 
 * @returns 
 */
const login = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body;

    if (!email) {
        throw new ErrorHandler(400, ERROR_RESPONSES.EMAIL_IS_REQUIRED);
    } else if (!password) {
        throw new ErrorHandler(400, ERROR_RESPONSES.PASSWORD_IS_REQUIRED);
    }

    const user = await userService.findOneByEmail(req.body.email);

    if (!user) {
        throw new ErrorHandler(404, ERROR_RESPONSES.USER_NOT_FOUND);
    } else if (!utilService.isPasswordValid(password, user.password)) {
        throw new ErrorHandler(400, ERROR_RESPONSES.INVALID_PASSWORD);
    }

    const token = await setUserToken(user.id);

    await userTokensService.saveToken(user.id, token);
    return res.status(200).json({ token });
};

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        const { method } = req;

        if (method === 'POST') {
            await login(req, res);
        }
    } catch (error) {
        if (error instanceof ErrorHandler) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        console.error(error);
        res.status(500).json({ message: ERROR_RESPONSES.PLEASE_TRY_AGAIN });
    }
};

export default handler;