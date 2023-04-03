function centsToDollars(cents) {
  const dollars = (cents / 100).toFixed(2);
  return dollars;
}

function dollarsToCents(dollars) {
  const cents = Number.parseFloat(dollars) * 100;
  return Math.round(cents);
}

export { centsToDollars, dollarsToCents };
