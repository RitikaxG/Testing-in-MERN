import type { PrismaClient } from "@prisma/client";
import { mockDeep } from "vitest-mock-extended";

// This will mock an object of original PrismaClient class
// It mocks every transitve key prismaClient.sum.create ...
export const prismaClient = mockDeep<PrismaClient>();