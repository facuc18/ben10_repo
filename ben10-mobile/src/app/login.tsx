import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../lib/auth';
import { Button, Dial, ErrorText, Field, text } from '../components/ui';
import { alienImageUrl } from '../lib/api';
import { colors, font, space } from '../lib/theme';

export default function Login() {
  const { login } = useAuth();
  const insets = useSafeAreaInsets();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!username.trim() || !password) {
      setError('Completá usuario y contraseña.');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await login(username, password);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo ingresar.');
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: insets.top + space.xl, paddingBottom: insets.bottom + space.lg }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.hero}>
          <Dial uri={alienImageUrl('logo.jpg')} size={132} />
          <Text style={[text.title, { marginTop: space.lg }]}>Ben 10 Wiki</Text>
          <Text style={[text.muted, { marginTop: space.xs }]}>Todos los aliens del Omnitrix en un solo lugar.</Text>
        </View>

        <Field label="Usuario" value={username} onChangeText={setUsername} textContentType="username" />
        <Field
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          textContentType="password"
          onSubmitEditing={submit}
        />
        <ErrorText>{error}</ErrorText>
        <Button label="Ingresar" onPress={submit} loading={loading} />

        <View style={styles.footer}>
          <Text style={text.muted}>¿Todavía no tenés cuenta? </Text>
          <Link href="/register" style={styles.link}>
            Crear cuenta
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, paddingHorizontal: space.lg, backgroundColor: colors.bg, justifyContent: 'center', maxWidth: 480, width: '100%', alignSelf: 'center' },
  hero: { alignItems: 'center', marginBottom: space.xl },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: space.lg },
  link: { fontFamily: font.bold, fontSize: 14, color: colors.green },
});
