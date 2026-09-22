import { describe, expect, it } from "vitest";
import { formatDateRange, formatDuration, formatYearMonth, monthsBetween } from "./format";

describe("formatYearMonth", () => {
  it("formats a year-month string", () => {
    expect(formatYearMonth("2024-02")).toBe("Feb 2024");
  });

  it("returns the input when it cannot be parsed", () => {
    expect(formatYearMonth("soon")).toBe("soon");
  });
});

describe("formatDateRange", () => {
  it("uses Present for open-ended ranges", () => {
    expect(formatDateRange("2024-02", null)).toBe("Feb 2024 — Present");
  });
});

describe("monthsBetween and formatDuration", () => {
  it("computes a closed range", () => {
    expect(monthsBetween("2023-07", "2024-02")).toBe(7);
  });

  it("computes an open range against a fixed date", () => {
    expect(monthsBetween("2024-02", null, new Date(Date.UTC(2025, 1, 1)))).toBe(12);
  });

  it("formats years and months", () => {
    expect(formatDuration(18)).toBe("1 yr 6 mos");
    expect(formatDuration(24)).toBe("2 yrs");
  });
});
