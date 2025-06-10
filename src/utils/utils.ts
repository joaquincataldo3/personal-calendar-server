export const isFutureDate = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const now = new Date();

  if (isNaN(date.getTime())) return false;

  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  return date >= today;
};

export const languages = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' }
];

export const timezones = [
  { value: 'America/Argentina/Buenos_Aires', label: 'Buenos Aires (GMT-3)' },
  { value: 'America/Santiago', label: 'Santiago (GMT-4)' },
  { value: 'America/Sao_Paulo', label: 'São Paulo (GMT-3)' }
];

export const locations = [
  { value: 'Buenos Aires', label: 'Buenos Aires' },
  { value: 'Santiago', label: 'Santiago de Chile' },
  { value: 'São Paulo', label: 'São Paulo' },
  { value: 'Montevideo', label: 'Montevideo' }
]