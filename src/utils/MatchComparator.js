const scoreComparator = (a, b) => {
  if (a.score < b.score) {
    return 1;
  } else if (a.score > b.score) {
    return -1;
  }
  return 0;
};
const DateComparator = (date) => {
  var MS_PER_MINUTE = 60000;
  const durationInMinutes = 10 * MS_PER_MINUTE;
  const currentTime = new Date(Date.now() + durationInMinutes);
  return new Date(date) < currentTime ? false : true;
};

export { scoreComparator, DateComparator };
