import { PrismaClient } from '@prisma/client';

class PrismaService {
    private prismaClient;

    /**
     * Initialize prisma client
     */
    constructor() {
        this.prismaClient = new PrismaClient();
    }

    /**
     * Get user repository
     * @returns 
     */
    user() {
        return this.prismaClient.user;
    }

    /**
     * Get user token repository
     * @returns 
     */
    userToken() {
        return this.prismaClient.userToken;
    }

    /**
     * Get movie repository
     * @returns 
     */
    movie() {
        return this.prismaClient.movies;
    }
}

export const prismaService = new PrismaService();