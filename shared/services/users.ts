
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

        for await (const user of USERS) {
            const isAlreadySeeded = await this.findOneById(user.id);

            if (!isAlreadySeeded) {
                user.password = utilService.encodePassword(user.password);
                userSeed.push(user);
            }
        }

        if (userSeed.length) {
            await prismaService.user().createMany({
                data: userSeed
            });
        }

        return true;
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

    /**
     * Find user by id
     * @param id 
     * @returns 
     */
    async findOneById(id: string) {
        try {
            const user = await prismaService.user().findFirst({
                where: {
                    id
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
