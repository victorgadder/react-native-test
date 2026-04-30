import { formatRelativeDate } from '@/src/utils';

describe('formatRelativeDate', () => {
  it('formats past dates in Brazilian Portuguese', () => {
    jest.spyOn(Date, 'now').mockReturnValue(new Date('2026-04-30T12:00:00.000Z').getTime());

    expect(formatRelativeDate('2026-04-29T12:00:00.000Z')).toBe('ontem');

    jest.restoreAllMocks();
  });
});
