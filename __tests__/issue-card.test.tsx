import { render, screen } from '@testing-library/react-native';

import { AppThemeProvider } from '@/src/design-system';
import { IssueCard } from '@/src/features/issues';
import type { GitHubIssue } from '@/src/services/github';

const issue: GitHubIssue = {
  created_at: '2026-04-29T12:00:00.000Z',
  html_url: 'https://github.com/facebook/react/issues/1',
  id: 1,
  labels: [
    {
      color: '0e8a16',
      id: 10,
      name: 'bug',
    },
  ],
  number: 123,
  title: 'Corrigir comportamento da lista',
  user: {
    avatar_url: 'https://example.com/user.png',
    id: 2,
    login: 'victor',
  },
};

describe('<IssueCard />', () => {
  it('renders issue details', () => {
    jest.spyOn(Date, 'now').mockReturnValue(new Date('2026-04-30T12:00:00.000Z').getTime());

    render(
      <AppThemeProvider>
        <IssueCard issue={issue} />
      </AppThemeProvider>,
    );

    expect(screen.getByText('Corrigir comportamento da lista')).toBeTruthy();
    expect(screen.getByText(/#123 por victor/)).toBeTruthy();
    expect(screen.getByText('bug')).toBeTruthy();
    expect(screen.getByText('Abrir no GitHub')).toBeTruthy();

    jest.restoreAllMocks();
  });
});
