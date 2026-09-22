import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact-schema";

const valid = {
  name: "Jane Doe",
  email: "jane@example.com",
  subject: "Hello",
  message: "I would love to talk about a project.",
};

describe("contactSchema", () => {
  it("accepts a valid submission", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = contactSchema.safeParse({ ...valid, email: "nope" });
    expect(result.success).toBe(false);
  });

  it("rejects a message that is too short after trimming", () => {
    const result = contactSchema.safeParse({ ...valid, message: "   short   " });
    expect(result.success).toBe(false);
  });
});
