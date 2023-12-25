import { PrismaClient } from '@prisma/client';

class PrismaService {
    private prismaClient;

    constructor() {
        this.prismaClient = new PrismaClient();
    }

    user() {
        return this.prismaClient.user;
    }
}

export const prismaService = new PrismaService();