// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = global as unknown as { prisma?: PrismaClient };

// export const prisma =
//     globalForPrisma.prisma ||
//     new PrismaClient({
//         log: ["query", "info", "warn", "error"],
//     });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;


import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();