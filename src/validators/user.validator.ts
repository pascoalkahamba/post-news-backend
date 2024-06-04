import { UserModal } from "../@types";
import { UserError } from "../errors/userError";
import { REGEXEMAIL } from "../utils";

export class UserValidator {
  validator(user: UserModal) {
    if (user.name.length <= 5) throw UserError.invalidName();

    if (user.password.length <= 5) throw UserError.invalidPassword();

    if (!REGEXEMAIL.test(user.email)) throw UserError.invalidEmail();
  }
}
