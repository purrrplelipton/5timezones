const { log } = console;

export default function formatTime(currentTime, timezone) {
  const localeTime = new Date(currentTime).toString();
  const localeOffsetParts = localeTime.match(/([+-])(\d{4})/);
  const [, localeOffsetSign, offset] = localeOffsetParts;
  const localeOffsetHours = offset.slice(0, 2);
  const localeOffsetMinutes = offset.slice(2);
  const localeOffsetMilliseconds =
    (parseInt(localeOffsetHours, 10) * 60 + parseInt(localeOffsetMinutes, 10)) *
    60 *
    1000;
  const adjustedTime = new Date(
    currentTime.getTime() +
      (localeOffsetSign === '-'
        ? localeOffsetMilliseconds
        : -localeOffsetMilliseconds),
  );

  const offsetParts = timezone.match(/([+-])(\d{2}):(\d{2})/);
  if (!offsetParts) return { date: '', time: '' };

  const [, sign, hours, minutes] = offsetParts;
  const offsetMilliseconds =
    (parseInt(hours, 10) * 60 + parseInt(minutes, 10)) * 60 * 1000;

  const formattedTime = new Date(
    adjustedTime.getTime() +
      (sign === '-' ? -offsetMilliseconds : offsetMilliseconds),
  );

  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const formattedDate = formattedTime.toLocaleDateString(undefined, options);

  // Get the day of the month without leading zeros
  const dayOfMonth = formattedTime.getDate();
  let daySuffix;
  if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) {
    daySuffix = 'st';
  } else if (dayOfMonth === 2 || dayOfMonth === 22) {
    daySuffix = 'nd';
  } else if (dayOfMonth === 3 || dayOfMonth === 23) {
    daySuffix = 'rd';
  } else {
    daySuffix = 'th';
  }

  const formattedDateString = formattedDate.replace(
    dayOfMonth.toString(),
    `${dayOfMonth}${daySuffix} of`,
  );

  const formattedTimeString = formattedTime.toLocaleTimeString().slice(0, 5);

  return {
    date: formattedDateString.replace(` ${formattedTime.getUTCFullYear()}`, ''),
    time: formattedTimeString,
  };
}
