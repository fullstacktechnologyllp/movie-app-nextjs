import { PrismaClient } from '@prisma/client';

class PrismaService {
    private prismaClient;

    constructor() {
        this.prismaClient = new PrismaClient();
    }

    user() {
        return this.prismaClient.user;
    }

    userToken() {
        return this.prismaClient.userToken;
    }

    movie() {
        return this.prismaClient.movies;
    }
}

export const prismaService = new PrismaService();