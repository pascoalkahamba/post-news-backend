import { Response } from "express";
import { TPathError } from "../@types";

export default class CommentValidator {
  validator(pathError: TPathError, res: Response) {
    switch (pathError) {
      case "content":
        return res.status(400).json({
          error:
            "Conteúdo do comentário inválido. Deve ter pelo menos 1 caractere.",
        });
      case "postId":
        return res.status(400).json({
          error: "ID da publicação inválido.",
        });
      default:
        return res.status(400).json({
          error: "Dados inválidos.",
        });
    }
  }
}
