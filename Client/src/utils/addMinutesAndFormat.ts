export const addMinutesAndFormat = (
  dateString: string,
  minutesToAdd: number
) => {
  const dateObject = new Date(dateString);

  dateObject.setMinutes(dateObject.getMinutes() + minutesToAdd);

  const convertTimeStamp = `${dateObject.getFullYear()}-${(
    dateObject.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}-${dateObject
    .getDate()
    .toString()
    .padStart(2, '0')} ${dateObject
    .getHours()
    .toString()
    .padStart(2, '0')}:${dateObject
    .getMinutes()
    .toString()
    .padStart(2, '0')}:00`;

  return convertTimeStamp;
};
