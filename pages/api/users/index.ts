import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const main = async () => {
    const allUsers = await prisma.user.findMany();
    const allUsersCount = await prisma.user.count();
    return {
        allUsers,
        allUsersCount
    };
};

const handler = async (req: NextApiRequest,
    res: NextApiResponse) => {
    try {
        const { allUsers, allUsersCount } = await main();

        await prisma.$disconnect();
        res.status(200).json({ items: allUsers, total: allUsersCount });
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
};

export default handler

