export function getWeekDays(locale = "pt-BR") {
  const weekDays = [];

  let date = new Date("2022-01-04");

  for (let i = 0; i < 7; i++) {
    const weekdayName = new Intl.DateTimeFormat(locale, {
      weekday: "short",
    }).format(date);

    weekDays.push(weekdayName);
    date.setDate(date.getDate() + 1);
  }

  return weekDays;
}
export function getDaysInMonth(month: number, year: number) {
  const date = new Date(year, month, 1);

  const firstDayWeekDay = date.getDay();
  const numberOfEmptyDays = Array(
    firstDayWeekDay === 0 ? 0 : firstDayWeekDay - 1
  ).fill(null);

  const days = [...numberOfEmptyDays];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}