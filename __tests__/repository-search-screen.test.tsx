import { render, screen } from '@testing-library/react-native';

import RepositorySearchScreen from '@/app/(tabs)';

describe('<RepositorySearchScreen />', () => {
  it('renders the search screen placeholder', () => {
    render(<RepositorySearchScreen />);

    expect(screen.getByText('Busca de repositorios')).toBeTruthy();
  });
});
