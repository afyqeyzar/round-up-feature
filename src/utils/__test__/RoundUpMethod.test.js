import { sumDifferences } from "../RoundUpMethod";

describe("sumDifferences", () => {
  test("should round up for a single transaction", () => {
    const arr = [
      {
        direction: "OUT",
        amount: {
          minorUnits: 250,
        },
      },
    ];
    const result = sumDifferences(arr);

    expect(result).toBe(0.5);
  });

  test("should return zero for an empty array", () => {
    const arr = [];

    const result = sumDifferences(arr);

    expect(result).toBe(0);
  });

  test("should return zero transaction is only IN direction", () => {
    const arr = [
      {
        direction: "IN",
        amount: {
          minorUnits: 250,
        },
      },
      {
        direction: "IN",
        amount: {
          minorUnits: 330,
        },
      },
      {
        direction: "IN",
        amount: {
          minorUnits: 320,
        },
      },
      {
        direction: "IN",
        amount: {
          minorUnits: 9000,
        },
      },
    ];

    const result = sumDifferences(arr);

    expect(result).toBe(0);
  });

  test("should return zero if OUT transactions cannot be rounded up", () => {
    const arr = [
      {
        direction: "OUT",
        amount: {
          minorUnits: 200,
        },
      },
      {
        direction: "OUT",
        amount: {
          minorUnits: 300,
        },
      },
      {
        direction: "OUT",
        amount: {
          minorUnits: 400,
        },
      },
      {
        direction: "OUT",
        amount: {
          minorUnits: 9000,
        },
      },
    ];

    const result = sumDifferences(arr);

    expect(result).toBe(0);
  });

  test("sum only OUT rounded up transactions", () => {
    const arr = [
      {
        direction: "OUT",
        amount: {
          minorUnits: 233,
        },
      },
      {
        direction: "IN",
        amount: {
          minorUnits: 325,
        },
      },
      {
        direction: "OUT",
        amount: {
          minorUnits: 423,
        },
      },
      {
        direction: "IN",
        amount: {
          minorUnits: 9708,
        },
      },
    ];

    const result = sumDifferences(arr);

    expect(result).toBe(1.44);
  });
});
