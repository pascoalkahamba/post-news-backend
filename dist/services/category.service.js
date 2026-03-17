"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const prisma_service_1 = require("./prisma.service");
class CategoryService {
    create(categoryDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryAlreadyExist = yield prisma_service_1.prismaService.prisma.category.findFirst({
                where: {
                    name: categoryDate.name,
                },
            });
            if (categoryAlreadyExist)
                return;
            const category = yield prisma_service_1.prismaService.prisma.category.create({
                data: categoryDate,
                select: {
                    id: true,
                    name: true,
                    description: true,
                },
            });
            return category;
        });
    }
    update(id, categoryDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryAlreadyExist = yield prisma_service_1.prismaService.prisma.category.findFirst({
                where: {
                    name: categoryDate.name,
                },
            });
            if (categoryAlreadyExist)
                return;
            const category = yield prisma_service_1.prismaService.prisma.category.update({
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
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryExist = yield prisma_service_1.prismaService.prisma.category.findUnique({
                where: {
                    id,
                },
            });
            if (!categoryExist)
                return;
            const category = yield prisma_service_1.prismaService.prisma.category.delete({
                where: {
                    id,
                },
            });
            return category;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield prisma_service_1.prismaService.prisma.category.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                },
            });
            return categories;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield prisma_service_1.prismaService.prisma.category.findUnique({
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
        });
    }
}
exports.CategoryService = CategoryService;
