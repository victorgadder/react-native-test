import {
  focusManager,
  QueryClient,
  QueryClientProvider,
  onlineManager,
} from '@tanstack/react-query';
import { PropsWithChildren, useEffect, useState } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

export function QueryProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 1000 * 60 * 30,
            refetchOnMount: false,
            refetchOnReconnect: true,
            retry: 1,
            staleTime: 1000 * 60 * 5,
          },
        },
      }),
  );

  useEffect(() => {
    onlineManager.setOnline(true);

    if (Platform.OS === 'web') {
      return;
    }

    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => subscription.remove();
  }, []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
