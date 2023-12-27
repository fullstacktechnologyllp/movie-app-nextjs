import type { NextApiRequest, NextApiResponse } from 'next';
import { userService } from '../../../shared/services/users';
import { ERROR_RESPONSES, SUCCESS_RESPONSES } from '../../../shared/constants';
import { ErrorHandler } from '../../../lib/auth';

/**
 * @swagger
 * /api/users/seed:
 *   get:
 *     description: Seeds all default users
 *     responses:
 *       200:
 *         description: USERS_SEEDED
 *     tags:
 *       - users
 */
const seedUsers = async () => {
    await userService.seed();
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await seedUsers();
        res.status(210).json({ message: SUCCESS_RESPONSES.USERS_SEEDED });
    } catch (error) {
        if (error instanceof ErrorHandler) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        console.error(error);
        res.status(500).json({ message: ERROR_RESPONSES.PLEASE_TRY_AGAIN });
    }
};

export default handler

