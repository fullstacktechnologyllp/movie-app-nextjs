import type { NextApiRequest, NextApiResponse } from 'next';
import { userService } from '../../shared/services/users';
import { userTokensService } from '../../shared/services/userTokens';
import { ERROR_RESPONSES } from '../../shared/constants';
import { utilService } from '../../shared/services/utils';
import { setUserCookie } from '../../lib/auth';

type ResponseData = {
    message: string;
};

/**
 * User login
 * @param req 
 * @param res 
 * @returns 
 */
const login = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ message: ERROR_RESPONSES.EMAIL_IS_REQUIRED });
    } else if (!password) {
        return res.status(400).json({ message: ERROR_RESPONSES.PASSWORD_IS_REQUIRED });
    }

    const user = await userService.findOneByEmail(req.body.email);

    if (!user) {
        return res.status(404).json({ message: ERROR_RESPONSES.USER_NOT_FOUND });
    } else if (!utilService.isPasswordValid(password, user.password)) {
        return res.status(400).json({ message: ERROR_RESPONSES.INVALID_PASSWORD });
    }

    const token = await setUserCookie();

    await userTokensService.saveToken(user.id, token);
    return res.status(200).json({ token });
};

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) => {
    try {
        const { method, query } = req;

        if (method === 'POST') {
            await login(req, res);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: ERROR_RESPONSES.PLEASE_TRY_AGAIN });
    }
};

export default handler;