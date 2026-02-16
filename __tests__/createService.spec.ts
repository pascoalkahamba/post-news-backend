import { describe, expect, it } from "vitest";
import { UserService } from "../src/services/user.service";

describe("You should able to manager user data without any mistake.", () => {
  it("create new user account", () => {
    const userService = new UserService();

    expect(
      userService.create({
        username: "Pascoal Kahamba",
        email: "franciscofetapi10@gmail.com",
        password: "pascoalcomercial",
        cellPhone: "923456789",
        role: "USER",
      }),
    ).resolves.toBeTypeOf("object");
  });

  it("login on the user account", () => {
    const userService = new UserService();

    expect(
      userService.login("pascoalcomercial25@gmail.com", "Kahamba123"),
    ).resolves.toBeTypeOf("object");
  });
});
