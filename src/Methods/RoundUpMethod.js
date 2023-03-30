import { getAccountsFeedRangedAPI } from "./APIMethods";

function centsToDollars(cents) {
  const dollars = (cents / 100).toFixed(2);
  return dollars;
}

const getRoundUpDifference = (data) => {
  var difference = 0;
  // console.log(data.direction);
  if (data.direction == "OUT") {
    difference = Math.ceil(centsToDollars(data.amount.minorUnits)) - centsToDollars(data.amount.minorUnits)
  };

  return difference.toFixed(2);
}

const sumDifferences = (dataArray) => {
  var sum = 0;
  // console.log(typeof sum);

  for (const data of dataArray){
    // console.log(getRoundUpDifference(data));
    sum += parseFloat(getRoundUpDifference(data));
  }

  // console.log(sum)
  return sum
}

const getSum = async (setFeed, startDate, endDate, setSum) => {
  const accountsFeedData = await getAccountsFeedRangedAPI(setFeed, startDate, endDate);
  const sum = sumDifferences(accountsFeedData);
  setSum(sum);
}


export default getSum;