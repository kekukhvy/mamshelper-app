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

export const getFirstDateOfMonth = (year: number, month: number): string => {
  // return year + '-' + month + '-' + 1;
  return '2020-04-01';
};

export const getLastDateOfMonth = (month: number, year: number): number => {
  return new Date(year, month + 1, 0).getDate();
};
