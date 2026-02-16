import { Response } from "express";
import { CookiesProps } from "../interfaces";

export function createCookies<T>(res: Response, cookie: CookiesProps<T>) {
  // Quando hospedar o site usar o parametro secure:true em res.cookie para acesso apenas de site https
  res.cookie(cookie.key, cookie.value, {
    httpOnly: true,
    maxAge: 300000,
    secure: false,
  });
}
export function deleteCookies(res: Response, cookieKey: string) {
  res.clearCookie(cookieKey);
}
