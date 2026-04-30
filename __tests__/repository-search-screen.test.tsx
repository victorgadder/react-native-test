import { render, screen } from '@testing-library/react-native';

import RepositorySearchScreen from '@/app/(tabs)';
import { AppThemeProvider } from '@/src/design-system';
import { QueryProvider } from '@/src/services/query';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: async () => ({
      incomplete_results: false,
      items: [],
      total_count: 0,
    }),
    ok: true,
  } as Response);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('<RepositorySearchScreen />', () => {
  it('renders the search screen', () => {
    render(
      <QueryProvider>
        <AppThemeProvider>
          <RepositorySearchScreen />
        </AppThemeProvider>
      </QueryProvider>,
    );

    expect(screen.getByText('Busca de repositórios')).toBeTruthy();
  });
});
