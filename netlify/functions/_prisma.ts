import { PrismaClient } from "@prisma/client";

// Ensure a single Prisma instance across hot reloads
const g = globalThis as unknown as { prisma?: PrismaClient };
export const prisma = g.prisma || new PrismaClient();
if (!g.prisma) g.prisma = prisma;
