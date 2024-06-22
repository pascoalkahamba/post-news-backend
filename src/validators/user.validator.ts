import { UserModalT } from "../@types";
import { UserError } from "../errors/userError";
import { NewPasswordI } from "../interfaces";
import { REGEXEMAIL } from "../utils";

export class UserValidator {
  validator(user: UserModalT) {
    if (user.name.length <= 5) throw UserError.invalidName();

    if (user.password.length <= 5) throw UserError.invalidPassword();

    if (!REGEXEMAIL.test(user.email)) throw UserError.invalidEmail();
  }

  passwordValidator(newPassword: NewPasswordI) {
    if (newPassword.newPassword.length <= 5) throw UserError.invalidPassword();

    if (!REGEXEMAIL.test(newPassword.email)) throw UserError.invalidEmail();
  }
}
