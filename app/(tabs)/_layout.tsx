import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'left',
        tabBarActiveTintColor: isDark ? '#8ab4ff' : '#0969da',
        tabBarInactiveTintColor: isDark ? '#8b949e' : '#667085',
        tabBarStyle: {
          backgroundColor: isDark ? '#0d1117' : '#ffffff',
          borderTopColor: isDark ? '#30363d' : '#d0d7de',
        },
        headerStyle: {
          backgroundColor: isDark ? '#0d1117' : '#ffffff',
        },
        headerTintColor: isDark ? '#f0f6fc' : '#24292f',
      }}>
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
          title: 'Design System',
          tabBarIcon: ({ color }) => <TabBarIcon name="paint-brush" color={color} />,
        }}
      />
    </Tabs>
  );
}
