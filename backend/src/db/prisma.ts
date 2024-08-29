import { PrismaClient } from "@prisma/client";

// Generate and export prisma object that can be used for queries
const prisma = new PrismaClient();

export default prisma;
