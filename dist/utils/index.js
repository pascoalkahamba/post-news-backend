"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamicCode = exports.MILLISECONDSINTHREEMONTHS = exports.REGEXEMAIL = void 0;
exports.generateResetToken = generateResetToken;
const crypto_1 = require("crypto");
const REGEXEMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
exports.REGEXEMAIL = REGEXEMAIL;
const MILLISECONDSINTHREEMONTHS = 78900480000;
exports.MILLISECONDSINTHREEMONTHS = MILLISECONDSINTHREEMONTHS;
function generateResetToken() {
    return (0, crypto_1.randomBytes)(32).toString("hex");
}
const dynamicCode = () => Math.floor(100000 + Math.random() * 900000).toString();
exports.dynamicCode = dynamicCode;
