import React from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import App from "./App";

function getStallCard(stallName) {
  const heading = screen.getByRole("heading", { name: stallName, level: 3 });
  return heading.closest(".stall-card");
}

function openStallDetails(stallName = "Chicken Rice Stall") {
  const card = getStallCard(stallName);
  return within(card).getByRole("button", { name: /view details/i });
}

describe("CampusBite automated tests", () => {
  beforeEach(() => {
    localStorage.clear();
    render(<App />);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  describe("US1 - Search for food stalls", () => {
    test("TC01 searches using the complete stall name", async () => {
      const user = userEvent.setup();
      const searchInput = screen.getByPlaceholderText(/search by stall name/i);

      await user.type(searchInput, "Chicken Rice Stall");

      expect(screen.getByRole("heading", { name: "Chicken Rice Stall", level: 3 })).toBeInTheDocument();
      expect(screen.queryByRole("heading", { name: "Noodle House", level: 3 })).not.toBeInTheDocument();
    });

    test("TC02 searches using part of a stall name", async () => {
      const user = userEvent.setup();
      const searchInput = screen.getByPlaceholderText(/search by stall name/i);

      await user.type(searchInput, "Noodle");

      expect(screen.getByRole("heading", { name: "Noodle House", level: 3 })).toBeInTheDocument();
      expect(screen.queryByRole("heading", { name: "Western Corner", level: 3 })).not.toBeInTheDocument();
    });

    test("TC03 performs a case-insensitive search", async () => {
      const user = userEvent.setup();
      const searchInput = screen.getByPlaceholderText(/search by stall name/i);

      await user.type(searchInput, "western corner");

      expect(screen.getByRole("heading", { name: "Western Corner", level: 3 })).toBeInTheDocument();
    });
  });

  describe("US2 - Filter stalls by category", () => {
    test("TC04 displays both Asian Food stalls", async () => {
      const user = userEvent.setup();

      await user.click(screen.getByRole("button", { name: "Asian Food" }));

      expect(screen.getByRole("heading", { name: "Chicken Rice Stall", level: 3 })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: "Malay Cuisine Corner", level: 3 })).toBeInTheDocument();
      expect(screen.queryByRole("heading", { name: "Western Corner", level: 3 })).not.toBeInTheDocument();
    });

    test("TC05 displays only the Western Food stall", async () => {
      const user = userEvent.setup();

      await user.click(screen.getByRole("button", { name: "Western Food" }));

      expect(screen.getByRole("heading", { name: "Western Corner", level: 3 })).toBeInTheDocument();
      expect(document.querySelectorAll(".stall-card")).toHaveLength(1);
    });

    test("TC06 restores every stall when All is selected", async () => {
      const user = userEvent.setup();

      await user.click(screen.getByRole("button", { name: "Healthy Food" }));
      expect(document.querySelectorAll(".stall-card")).toHaveLength(1);

      await user.click(screen.getByRole("button", { name: "All" }));

      expect(document.querySelectorAll(".stall-card")).toHaveLength(6);
    });
  });

  describe("US3 - View stall details", () => {
    test("TC07 opens the selected stall details", async () => {
      const user = userEvent.setup();

      await user.click(openStallDetails());

      expect(screen.getByRole("heading", { name: "Chicken Rice Stall", level: 2 })).toBeInTheDocument();
      expect(screen.getByText(/popular lunch option for students/i)).toBeInTheDocument();
    });

    test("TC08 displays the selected stall menu and prices", async () => {
      const user = userEvent.setup();

      await user.click(openStallDetails());

      expect(screen.getByText("Roasted Chicken Rice")).toBeInTheDocument();
      expect(screen.getByText("$6.00")).toBeInTheDocument();
      expect(screen.getByText("Chicken Noodle")).toBeInTheDocument();
    });

    test("TC09 closes the stall details", async () => {
      const user = userEvent.setup();

      await user.click(openStallDetails());
      await user.click(screen.getByRole("button", { name: /close details/i }));

      expect(screen.queryByRole("heading", { name: "Menu", level: 3 })).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: /close details/i })).not.toBeInTheDocument();
    });
  });

  describe("US4 - Sort and reset the stall list", () => {
    test("TC10 sorts stalls from highest to lowest rating", async () => {
      const user = userEvent.setup();
      const sortSelect = screen.getByRole("combobox");

      await user.selectOptions(sortSelect, "Rating High to Low");

      const stallNames = [...document.querySelectorAll(".stall-card h3")].map(
        (heading) => heading.textContent
      );
      expect(stallNames[0]).toBe("Western Corner");
      expect(stallNames[stallNames.length - 1]).toBe("Noodle House");
    });

    test("TC11 sorts stalls from the lowest starting price", async () => {
      const user = userEvent.setup();
      const sortSelect = screen.getByRole("combobox");

      await user.selectOptions(sortSelect, "Price Low to High");

      const stallNames = [...document.querySelectorAll(".stall-card h3")].map(
        (heading) => heading.textContent
      );
      expect(stallNames[0]).toBe("Cafe Express");
    });

    test("TC12 clears search, category, and sorting options", async () => {
      const user = userEvent.setup();
      const searchInput = screen.getByPlaceholderText(/search by stall name/i);
      const sortSelect = screen.getByRole("combobox");

      await user.type(searchInput, "Chicken");
      await user.click(screen.getByRole("button", { name: "Asian Food" }));
      await user.selectOptions(sortSelect, "Rating High to Low");
      await user.click(screen.getByRole("button", { name: /clear filters/i }));

      expect(searchInput).toHaveValue("");
      expect(sortSelect).toHaveValue("Default");
      expect(document.querySelectorAll(".stall-card")).toHaveLength(6);
    });
  });

  describe("US5 - Submit student reviews", () => {
    test("TC13 submits a named student review", async () => {
      const user = userEvent.setup();

      await user.click(openStallDetails());
      await user.type(screen.getByPlaceholderText(/your name/i), "Bao Jiatao");
      await user.type(screen.getByPlaceholderText(/write your review/i), "Fast service and good value.");
      await user.click(screen.getByRole("button", { name: /submit review/i }));

      expect(screen.getByText("Bao Jiatao")).toBeInTheDocument();
      expect(screen.getByText(/fast service and good value/i)).toBeInTheDocument();
    });

    test("TC14 uses Anonymous when the reviewer name is empty", async () => {
      const user = userEvent.setup();

      await user.click(openStallDetails("Noodle House"));
      await user.type(screen.getByPlaceholderText(/write your review/i), "A convenient lunch option.");
      await user.click(screen.getByRole("button", { name: /submit review/i }));

      expect(screen.getByText("Anonymous")).toBeInTheDocument();
      expect(screen.getByText(/a convenient lunch option/i)).toBeInTheDocument();
    });

    test("TC15 rejects an empty review comment", async () => {
      const user = userEvent.setup();
      const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

      await user.click(openStallDetails());
      await user.click(screen.getByRole("button", { name: /submit review/i }));

      expect(alertSpy).toHaveBeenCalledWith("Please write a review before submitting.");
      expect(screen.queryByText("Anonymous")).not.toBeInTheDocument();
    });
  });
});
