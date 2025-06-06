export const isFutureDate = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const now = new Date();

  if (isNaN(date.getTime())) return false;

  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  return date >= tomorrow;
};