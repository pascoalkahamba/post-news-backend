"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCookies = createCookies;
exports.deleteCookies = deleteCookies;
function createCookies(res, cookie) {
    res.cookie(cookie.key, cookie.value, {
        httpOnly: true,
        maxAge: 300000,
        secure: false,
    });
}
function deleteCookies(res, cookieKey) {
    res.clearCookie(cookieKey);
}
