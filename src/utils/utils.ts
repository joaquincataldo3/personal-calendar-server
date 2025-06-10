export const isFutureDate = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const now = new Date();

  if (isNaN(date.getTime())) return false;

  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  return date >= today;
};

