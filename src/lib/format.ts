const MONTH_FORMATTER = new Intl.DateTimeFormat("en", { month: "short", year: "numeric" });

export function formatYearMonth(value: string): string {
  const [year, month] = value.split("-").map(Number);
  if (!year || !month) {
    return value;
  }
  return MONTH_FORMATTER.format(new Date(Date.UTC(year, month - 1, 1)));
}

export function formatDateRange(start: string, end: string | null): string {
  return `${formatYearMonth(start)} — ${end ? formatYearMonth(end) : "Present"}`;
}

export function monthsBetween(start: string, end: string | null, now: Date = new Date()): number {
  const [startYear = 0, startMonth = 1] = start.split("-").map(Number);
  const endDate = end ? end.split("-").map(Number) : [now.getUTCFullYear(), now.getUTCMonth() + 1];
  const [endYear = startYear, endMonth = startMonth] = endDate;
  return Math.max(1, (endYear - startYear) * 12 + (endMonth - startMonth));
}

export function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const remainder = months % 12;
  const parts = [
    years > 0 ? `${years} yr${years > 1 ? "s" : ""}` : "",
    remainder > 0 ? `${remainder} mo${remainder > 1 ? "s" : ""}` : "",
  ].filter(Boolean);
  return parts.join(" ");
}
