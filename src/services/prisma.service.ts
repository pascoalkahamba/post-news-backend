import { PrismaClient } from "@prisma/client";

class PrismaService {
  private prisma = new PrismaClient();
  constructor() {
    this.connect();
  }

  async connect() {
    await this.prisma.$connect();
  }

  async disConnect() {
    await this.prisma.$disconnect();
    process.exit(1);
  }
}

const prismaService = new PrismaService();

export { prismaService };
