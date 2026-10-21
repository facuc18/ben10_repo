import React from 'react';
import { ColorValue } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, font } from '../../lib/theme';

type IconName = keyof typeof Ionicons.glyphMap;
const icon = (name: IconName, focused: IconName) =>
  ({ color, focused: f, size }: { color: ColorValue; focused: boolean; size: number }) => (
    <Ionicons name={f ? focused : name} size={size} color={color as string} />
  );

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerTitleStyle: { fontFamily: font.bold, color: colors.text, fontSize: 22 },
        headerShadowVisible: false,
        tabBarActiveTintColor: colors.green,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.line },
        tabBarLabelStyle: { fontFamily: font.semi, fontSize: 12 },
        sceneStyle: { backgroundColor: colors.bg },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Aliens', tabBarIcon: icon('planet-outline', 'planet') }} />
      <Tabs.Screen name="quiz" options={{ title: '¿Qué alien sos?', tabBarLabel: 'Quiz', tabBarIcon: icon('help-circle-outline', 'help-circle') }} />
      <Tabs.Screen name="favoritos" options={{ title: 'Favoritos', tabBarIcon: icon('heart-outline', 'heart') }} />
      <Tabs.Screen name="perfil" options={{ title: 'Perfil', tabBarIcon: icon('person-outline', 'person') }} />
    </Tabs>
  );
}
