export const getCurrentTimestampSeconds = () => {
  return Math.floor(Date.now() / 1000);
};

export const timestampToDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const day = date.getDate();

  return month + " " + day + ", " + year;
};
