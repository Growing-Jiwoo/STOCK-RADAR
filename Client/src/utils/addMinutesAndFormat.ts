export const getCurrentTimeStamp = () => {
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 9);

  const formattedDate = currentDate
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');

  return formattedDate;
};
