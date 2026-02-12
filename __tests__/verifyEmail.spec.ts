import { describe, expect, it } from "vitest";
import request from "supertest";
import App from "../src/server";

describe("Post /verifyEmail", () => {
  it("create user account if the code sent for user client is validated.", async () => {
    const response = await (
      await request(App).post("/verifyEmail")
    ).body({
      validateCode: 122322,
    });
    expect(response.status).toBe(201);
  });
});
