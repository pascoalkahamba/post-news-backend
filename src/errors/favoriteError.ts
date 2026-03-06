import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export default class FavoriteError {
  static favoriteNotFound() {
    return new BaseError("Favorito não encontrado.", StatusCodes.NOT_FOUND);
  }

  static postNotFound() {
    return new BaseError("Post não encontrado.", StatusCodes.NOT_FOUND);
  }

  static favoriteAlreadyExists() {
    return new BaseError(
      "Você já favoritou este post.",
      StatusCodes.CONFLICT,
    );
  }

  static unauthorizedToFavorite() {
    return new BaseError(
      "Você não tem permissão para favoritar este post.",
      StatusCodes.UNAUTHORIZED,
    );
  }

  static invalidFavoriteId() {
    return new BaseError(
      "ID de favorito inválido.",
      StatusCodes.BAD_REQUEST,
    );
  }
}
