import { afterEach, describe, expect, it, vi } from "vitest";
import { login } from "./authService";

describe("Authentication service", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns user information when login is successful", async () => {
    const mockUser = {
      id: 1,
      name: "Test User",
      email: "student@jcu.edu.au",
    };

    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockUser),
    });

    const result = await login("student@jcu.edu.au", "password123");

    expect(fetchMock).toHaveBeenCalledWith("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "student@jcu.edu.au",
        password: "password123",
      }),
    });

    expect(result).toEqual(mockUser);
  });

  it("throws an error when login credentials are invalid", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      json: vi.fn(),
    });

    await expect(
      login("wrong@jcu.edu.au", "wrong-password")
    ).rejects.toThrow("Login failed");
  });

  it("does not contact a real server during the test", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        id: 1,
        name: "Mock User",
      }),
    });

    await login("mock@jcu.edu.au", "mock-password");

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});