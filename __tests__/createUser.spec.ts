import { describe, expect, it } from "vitest";
import { UserService } from "../src/services/user.service";

describe("Should able to create user account", () => {
  it("create new user account", () => {
    const userService = new UserService();

    expect(
      userService.create(
        {
          name: "Pascoal Kahamba",
          email: "franciscofetapi10@gmail.com",
          password: "pascoalcomercial",
        },
        false
      )
    ).resolves.toBeTypeOf("object");
  });

  it("Should be igaul two", () => {
    expect(1 + 1).toEqual(2);
  });
});
