import { render, screen } from '@testing-library/react-native';

import RepositorySearchScreen from '@/app/(tabs)';
import { AppThemeProvider } from '@/src/design-system';

describe('<RepositorySearchScreen />', () => {
  it('renders the search screen placeholder', () => {
    render(
      <AppThemeProvider>
        <RepositorySearchScreen />
      </AppThemeProvider>,
    );

    expect(screen.getByText('Busca de repositorios')).toBeTruthy();
  });
});
