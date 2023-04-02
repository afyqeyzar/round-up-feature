import { addSevenDays, readableDateFormat, apiDateFormat } from "../DateMethod";

describe("Date Methods", () => {
  test("add seven days to original date", () => {
    const originalDate = "2023-03-27T12:34:56.000Z";
    const result = addSevenDays(originalDate);

    expect(result).toBe("2023-04-03T12:34:56.000Z");
  });

  test("readable date format", () => {
    const originalDate = "2023-03-27T12:34:56.000Z";
    const result = readableDateFormat(originalDate);

    expect(result).toBe("27/03/2023");
  });

  test("API date format", () => {
    const originalDate =
      "Mon Mar 27 2023 13:34:56 GMT+0100 (British Summer Time)";
    const result = apiDateFormat(originalDate);

    expect(result).toBe("2023-03-27T12:34:56.000Z");
  });
});
