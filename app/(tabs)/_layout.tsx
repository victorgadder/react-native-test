import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

import { ThemeToggle, useTheme } from '@/src/design-system';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={18} style={{ marginBottom: -2 }} {...props} />;
}

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'left',
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.muted,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarItemStyle: {
          minHeight: 52,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          letterSpacing: 0,
          lineHeight: 13,
        },
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.text,
        headerRight: () => <ThemeToggle />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Busca',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="design-system"
        options={{
          tabBarLabel: 'Design',
          title: 'Sistema de Design',
          tabBarIcon: ({ color }) => <TabBarIcon name="paint-brush" color={color} />,
        }}
      />
    </Tabs>
  );
}
