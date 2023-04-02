function addSevenDays(dateString) {
  const date = new Date(dateString);

  //Add seven days to original date
  date.setUTCDate(date.getUTCDate() + 7);
  return date.toISOString();
}

function readableDateFormat(dateString) {
  const date = new Date(dateString);
  const day = ("0" + date.getUTCDate()).slice(-2);
  const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

function apiDateFormat(dateString) {
  const date = new Date(dateString);

  return date.toISOString();
}

export { addSevenDays, readableDateFormat, apiDateFormat };
