
import { USERS } from '../seeds/users';
import { prismaService } from './index';
import { utilService } from './utils';

class UsersService {
    /**
     * Seed default users
     * @returns 
     */
    async seed() {
        const userSeed: {
            id: string;
            name: string;
            password: string;
            email: string;
        }[] = [];

        USERS.forEach((user) => {
            user.password = utilService.encodePassword(user.password);
            userSeed.push(user);
        });

        return await prismaService.user().createMany({
            data: userSeed
        });
    }

    /**
     * Get all users
     * @returns 
     */
    async get() {
        const allUsers = await prismaService.user().findMany();
        const allUsersCount = await prismaService.user().count();
        return {
            allUsers,
            allUsersCount
        };
    }

    /**
     * Find user by email
     * @param email 
     * @returns 
     */
    async findOneByEmail(email: string) {
        try {
            const user = await prismaService.user().findFirst({
                where: {
                    email
                }
            });
            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export const userService = new UsersService();
