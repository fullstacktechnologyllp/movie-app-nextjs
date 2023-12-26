import type { NextApiRequest, NextApiResponse } from 'next';
import { userService } from '../../../shared/services/users';
import { ERROR_RESPONSES } from '../../../shared/constants';

const main = async () => {
    return userService.get();
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { allUsers, allUsersCount } = await main();

        res.status(200).json({ items: allUsers, total: allUsersCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: ERROR_RESPONSES.PLEASE_TRY_AGAIN });
    }
};

export default handler

