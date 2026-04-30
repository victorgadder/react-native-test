type RelativeTimeUnit = 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year';

const timeUnits = [
  { limit: 60, name: 'second', value: 1000 },
  { limit: 60, name: 'minute', value: 1000 * 60 },
  { limit: 24, name: 'hour', value: 1000 * 60 * 60 },
  { limit: 30, name: 'day', value: 1000 * 60 * 60 * 24 },
  { limit: 12, name: 'month', value: 1000 * 60 * 60 * 24 * 30 },
  { limit: Infinity, name: 'year', value: 1000 * 60 * 60 * 24 * 365 },
] as const;

const unitLabels: Record<RelativeTimeUnit, { singular: string; plural: string }> = {
  day: {
    plural: 'dias',
    singular: 'dia',
  },
  hour: {
    plural: 'horas',
    singular: 'hora',
  },
  minute: {
    plural: 'minutos',
    singular: 'minuto',
  },
  month: {
    plural: 'meses',
    singular: 'mês',
  },
  second: {
    plural: 'segundos',
    singular: 'segundo',
  },
  year: {
    plural: 'anos',
    singular: 'ano',
  },
};

function formatRelativeDateFallback(value: number, unit: RelativeTimeUnit) {
  const absoluteValue = Math.abs(value);

  if (unit === 'second' && absoluteValue < 10) {
    return 'agora';
  }

  if (unit === 'day') {
    if (value === -1) {
      return 'ontem';
    }

    if (value === 0) {
      return 'hoje';
    }

    if (value === 1) {
      return 'amanhã';
    }
  }

  const label = absoluteValue === 1 ? unitLabels[unit].singular : unitLabels[unit].plural;

  if (value < 0) {
    return `há ${absoluteValue} ${label}`;
  }

  return `em ${absoluteValue} ${label}`;
}

function formatRelativeTime(value: number, unit: RelativeTimeUnit) {
  if (typeof Intl !== 'undefined' && 'RelativeTimeFormat' in Intl) {
    return new Intl.RelativeTimeFormat('pt-BR', {
      numeric: 'auto',
      style: 'long',
    }).format(value, unit);
  }

  return formatRelativeDateFallback(value, unit);
}

export function formatRelativeDate(date: string) {
  const timestamp = new Date(date).getTime();
  const diff = timestamp - Date.now();
  const absoluteDiff = Math.abs(diff);

  const unit = timeUnits.find((item) => absoluteDiff < item.value * item.limit) ?? timeUnits[0];
  const value = Math.round(diff / unit.value);

  return formatRelativeTime(value, unit.name);
}
