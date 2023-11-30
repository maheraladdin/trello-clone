import {PrismaClient} from '@prisma/client'

// next use hot reloading, so we need to declare a global var to hold the db instance and prevent multiple instances in dev mode
// we use globalThis because it's excluded from hot reloading
declare global {
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma ||  new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;