import { CategoryModalT } from "../@types";
import { prismaService } from "./prisma.service";

export class CategoryService {
  async create(categoryDate: CategoryModalT) {
    const categoryAlreadyExist = await prismaService.prisma.category.findFirst({
      where: {
        name: categoryDate.name,
      },
    });

    if (categoryAlreadyExist) return;

    const category = await prismaService.prisma.category.create({
      data: categoryDate,
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    return category;
  }

  async update(id: number, categoryDate: CategoryModalT) {
    const categoryAlreadyExist = await prismaService.prisma.category.findFirst({
      where: {
        name: categoryDate.name,
      },
    });

    if (categoryAlreadyExist) return;
    const category = await prismaService.prisma.category.update({
      where: {
        id,
      },
      data: categoryDate,
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    return category;
  }

  async delete(id: number) {
    const categoryExist = await prismaService.prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!categoryExist) return;
    const category = await prismaService.prisma.category.delete({
      where: {
        id,
      },
    });

    return category;
  }

  async getAll() {
    const categories = await prismaService.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    return categories;
  }

  async getById(id: number) {
    const category = await prismaService.prisma.category.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    return category;
  }
}
