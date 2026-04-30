import { fireEvent, render, screen } from '@testing-library/react-native';

import { AppThemeProvider } from '@/src/design-system';
import { RepositoryCard } from '@/src/features/repositories';
import type { GitHubRepository } from '@/src/services/github';

const repository: GitHubRepository = {
  description: 'Biblioteca para criar interfaces em aplicações web e nativas.',
  forks_count: 51000,
  full_name: 'facebook/react',
  html_url: 'https://github.com/facebook/react',
  id: 1,
  language: 'JavaScript',
  name: 'react',
  open_issues_count: 1200,
  owner: {
    avatar_url: 'https://example.com/avatar.png',
    html_url: 'https://github.com/facebook',
    id: 2,
    login: 'facebook',
  },
  stargazers_count: 245000,
  watchers_count: 245000,
};

describe('<RepositoryCard />', () => {
  it('renders repository summary and handles press', () => {
    const onPress = jest.fn();

    render(
      <AppThemeProvider>
        <RepositoryCard onPress={onPress} repository={repository} />
      </AppThemeProvider>,
    );

    expect(screen.getByText('react')).toBeTruthy();
    expect(screen.getByText('facebook')).toBeTruthy();
    expect(screen.getByText('JavaScript')).toBeTruthy();
    expect(screen.getByText('245k')).toBeTruthy();

    fireEvent.press(screen.getByLabelText('Abrir detalhes de facebook/react'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
