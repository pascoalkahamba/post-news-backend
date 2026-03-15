import { Response } from "express";
import { TPathError } from "../@types";

export default class ReplyValidator {
  validator(pathError: TPathError, res: Response) {
    switch (pathError) {
      case "content":
        return res.status(400).json({
          error:
            "Conteúdo da resposta inválido. Deve ter pelo menos 1 caractere.",
        });
      case "commentId":
        return res.status(400).json({
          error: "ID do comentário inválido.",
        });
      default:
        return res.status(400).json({
          error: "Dados inválidos.",
        });
    }
  }
}
