import { NextFunction, Request, Response } from "express";
import { AuthError } from "../errors/authError";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { handleError } from "../errors/handleError";
import { prismaService } from "../services/prisma.service";
import { JsonWebTokenErrorT } from "../@types";
export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      AuthError.noTokenProvided();
      return;
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") {
      handleError(AuthError.invalidTypeOfToken(), res);
      return;
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
      id: number;
    };

    const user = await prismaService.prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    if (!user) {
      AuthError.invalidToken();
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      const errorMessage = error.message as JsonWebTokenErrorT;

      if (errorMessage === "jwt malformed") {
        handleError(AuthError.invalidToken(), res);
        return;
      }

      if (errorMessage === "jwt must be provided") {
        handleError(AuthError.noTokenProvided(), res);
        return;
      }
    }
  }
}
