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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileMiddleware = void 0;
const cloudinaryConfig_1 = __importDefault(require("../config/cloudinaryConfig"));
const multer_1 = require("multer");
const http_status_codes_1 = require("http-status-codes");
const uploadFileMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        if (!file) {
            return next();
        }
        const result = yield new Promise((resolve, reject) => {
            const uploadStream = cloudinaryConfig_1.default.uploader.upload_stream({
                folder: "uploads",
                resource_type: "auto",
                public_name: `${Date.now()}-${file.originalname}`,
            }, (error, result) => {
                if (error) {
                    reject(error);
                }
                else if (result) {
                    resolve(result);
                }
                else {
                    reject(new Error("Upload failed: No result returned"));
                }
            });
            uploadStream.end(file.buffer);
        });
        const fileUrl = result.secure_url;
        req.fileUrl = fileUrl;
        req.fileName = file.originalname;
        next();
    }
    catch (error) {
        if (error instanceof multer_1.MulterError) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ message: "Erro ao fazer upload do arquivo", error });
        }
        return res.status(500).json({ message: "Erro no servidor", error });
    }
});
exports.uploadFileMiddleware = uploadFileMiddleware;
