function addSevenDays(dateString) {
  const date = new Date(dateString);
  date.setUTCDate(date.getUTCDate() + 7);
  const year = date.getUTCFullYear();
  const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
  const day = ('0' + date.getUTCDate()).slice(-2);
  const hours = ('0' + date.getUTCHours()).slice(-2);
  const minutes = ('0' + date.getUTCMinutes()).slice(-2);
  const seconds = ('0' + date.getUTCSeconds()).slice(-2);
  const milliseconds = ('00' + date.getUTCMilliseconds()).slice(-3);
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
}

function readableDateFormat(dateString) {
  const date = new Date(dateString);
  const day = ('0' + date.getUTCDate()).slice(-2);
  const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

function apiDateFormat(dateString) {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
  const day = ('0' + date.getUTCDate()).slice(-2);
  const hours = ('0' + date.getUTCHours()).slice(-2);
  const minutes = ('0' + date.getUTCMinutes()).slice(-2);
  const seconds = ('0' + date.getUTCSeconds()).slice(-2);
  const milliseconds = ('00' + date.getUTCMilliseconds()).slice(-3);
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
}

export { addSevenDays, readableDateFormat, apiDateFormat } 