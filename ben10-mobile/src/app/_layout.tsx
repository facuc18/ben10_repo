import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts, ChakraPetch_400Regular, ChakraPetch_600SemiBold, ChakraPetch_700Bold } from '@expo-google-fonts/chakra-petch';
import { AuthProvider, useAuth } from '../lib/auth';
import { FavoritesProvider } from '../lib/favorites';
import { Loading } from '../components/ui';
import { colors, font } from '../lib/theme';

export default function RootLayout() {
  const [loaded] = useFonts({ ChakraPetch_400Regular, ChakraPetch_600SemiBold, ChakraPetch_700Bold });
  if (!loaded) return null;
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Gate />
      </FavoritesProvider>
    </AuthProvider>
  );
}

function Gate() {
  const { user, booting } = useAuth();
  if (booting) return <Loading />;

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.bg },
          headerTintColor: colors.green,
          headerTitleStyle: { fontFamily: font.semi, color: colors.text },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.bg },
        }}
      >
        {/* Con sesión iniciada */}
        <Stack.Protected guard={!!user}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="alien/[id]" options={{ title: '', headerBackTitle: 'Aliens' }} />
        </Stack.Protected>
        {/* Sin sesión */}
        <Stack.Protected guard={!user}>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ title: 'Crear cuenta', headerBackTitle: 'Ingresar' }} />
        </Stack.Protected>
      </Stack>
    </>
  );
}
