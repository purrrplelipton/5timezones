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
  if (!offsetParts) return new Date();

  const [, sign, hours, minutes] = offsetParts;
  const offsetMilliseconds =
    (parseInt(hours, 10) * 60 + parseInt(minutes, 10)) * 60 * 1000;

  const formattedTime = new Date(
    adjustedTime.getTime() +
      (sign === '-' ? -offsetMilliseconds : offsetMilliseconds),
  );

  return formattedTime.toLocaleTimeString().slice(0, 5);
}
