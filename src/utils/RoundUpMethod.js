import { getAccountsFeedRangedAPI } from "./APIMethods";
import { centsToDollars } from "./DollarToCentsMethod";

const getRoundUpDifference = (data) => {
  var difference = 0;
  if (data.direction == "OUT") {
    difference =
      Math.ceil(centsToDollars(data.amount.minorUnits)) -
      centsToDollars(data.amount.minorUnits);
  }

  return difference.toFixed(2);
};

const sumDifferences = (dataArray) => {
  var sum = 0;

  for (const data of dataArray) {
    sum += parseFloat(getRoundUpDifference(data));
  }

  return sum;
};

const getSum = async (setFeed, startDate, endDate, setSum) => {
  const accountsFeedData = await getAccountsFeedRangedAPI(
    setFeed,
    startDate,
    endDate
  );
  const sum = sumDifferences(accountsFeedData);
  setSum(sum);
};

export { getSum, sumDifferences };
