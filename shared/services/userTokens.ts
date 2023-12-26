
import { prismaService } from './index';

class UserTokensService {
    async saveToken(userId: string, token: string) {
        const tokenExists = await prismaService.userToken().findFirst({
            where: {
                userId: userId
            }
        });

        /**
         * Create new token
         */
        if (tokenExists) {
            await prismaService.userToken().update({
                data: {
                    token: token
                },
                where: {
                    id: tokenExists?.id
                }
            });
            return;

        }

        /**
        * Find and update existing token
        */
        await prismaService.userToken().create({
            data: {
                token: `${token}`,
                userId,
                status: 'active'
            }
        });
    }
}

export const userTokensService = new UserTokensService();
