const currentDate = new Date();

export const getYearsForSelector = (startYear: number): number[] => {
  const years: number[] = [];

  for (let i = -3; i <= 5; i++) {
    years.push(startYear + i);
  }
  return years;
};


export const getDefaultYear = (): number => {
  return currentDate.getFullYear();
};

export const getDefaultMonth = (): number => {
  return currentDate.getMonth();
};

export const getLastDateOfMonth = (month: number, year: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const isCurrentDate = (date: Date) => {
  let isCurrentDate: boolean;
  const curDate = new Date();
  isCurrentDate =
    curDate.getDate() === date.getDate() &&
    curDate.getMonth() === date.getMonth() &&
    curDate.getFullYear() === date.getFullYear();
  return isCurrentDate;
};

export const getFirstDateOfMonthISO = (month: number, year: number): string => {
  const date = new Date(year, month,2);
  return date.toISOString().slice(0, 10);
};
