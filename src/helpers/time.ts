import moment from "moment";

export function relativeTimeSince(date: string): string {
  let inputDate;

  // Check if the date string represents a Unix timestamp
  if (/^\d+$/.test(date)) {
    inputDate = moment.unix(Number(date));
  } else {
    inputDate = moment(date);
  }

  if (!inputDate.isValid()) {
    throw new Error("Invalid date format");
  }

  return inputDate.fromNow();
}
