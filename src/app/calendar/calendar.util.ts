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
