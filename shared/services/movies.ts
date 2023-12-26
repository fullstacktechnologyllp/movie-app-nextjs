
import { IMovie } from '../dtos';
import { prismaService } from './index';

class MoviesService {
    async create(moviePayload: IMovie) {
        try {
            return prismaService.movie().create({
                data: moviePayload,
            });
        } catch (error) {
            console.error('[MoviesService]:[create]', error);
            throw error;
        }
    }

    async findOne(id: string) {
        try {
            return prismaService.movie().findFirst({
                where: {
                    id
                }
            });
        } catch (error) {
            console.error('[MoviesService]:[findOne]', error);
            throw error;
        }
    }

    async find(userId: string, skip: number, take: number) {
        try {
            const movies = await prismaService.movie().findMany({
                where: {
                    userId: userId
                },
                skip,
                take,
                orderBy: [{
                    createdAt: 'desc'
                }]
            });

            const count = await prismaService.movie().count({
                where: {
                    userId: userId
                }
            });

            return {
                movies,
                count
            };
        } catch (error) {
            console.error('[MoviesService]:[find]', error);
            throw error;
        }
    }

    async update(id: string, moviePayload: IMovie) {
        try {
            await prismaService.movie().update({
                data: moviePayload,
                where: { id }
            });
        } catch (error) {
            console.error('[MoviesService]:[update]', error);
            throw error;
        }
    }
}

export const moviesService = new MoviesService();
