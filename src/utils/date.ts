const relativeTimeFormatter = new Intl.RelativeTimeFormat('pt-BR', {
  numeric: 'auto',
  style: 'long',
});

const timeUnits = [
  { limit: 60, name: 'second', value: 1000 },
  { limit: 60, name: 'minute', value: 1000 * 60 },
  { limit: 24, name: 'hour', value: 1000 * 60 * 60 },
  { limit: 30, name: 'day', value: 1000 * 60 * 60 * 24 },
  { limit: 12, name: 'month', value: 1000 * 60 * 60 * 24 * 30 },
  { limit: Infinity, name: 'year', value: 1000 * 60 * 60 * 24 * 365 },
] as const;

export function formatRelativeDate(date: string) {
  const timestamp = new Date(date).getTime();
  const diff = timestamp - Date.now();
  const absoluteDiff = Math.abs(diff);

  const unit = timeUnits.find((item) => absoluteDiff < item.value * item.limit) ?? timeUnits[0];
  const value = Math.round(diff / unit.value);

  return relativeTimeFormatter.format(value, unit.name);
}
