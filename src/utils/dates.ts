export const getDateDiff = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  return new Date(diff);
};

export const getFlooredDate = (date: Date) => {
  // whatever date that is passed, return 00:00:00 of that date
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const getFormattedDateDifference = (date: Date) => {
  const diff = getDateDiff(date);
  const days = diff.getDate() - 1;
  const hours = diff.getHours();
  const minutes = diff.getMinutes();

  return {
    days,
    hours,
    minutes,
  };
};
