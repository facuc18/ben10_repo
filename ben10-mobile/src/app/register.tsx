import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { useAuth } from '../lib/auth';
import { Button, ErrorText, Field } from '../components/ui';
import { colors, space } from '../lib/theme';

export default function Register() {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (username.trim().length < 3) return setError('El usuario debe tener al menos 3 caracteres.');
    if (password.length < 4) return setError('La contraseña debe tener al menos 4 caracteres.');
    if (password !== confirm) return setError('Las contraseñas no coinciden.');
    setError(null);
    setLoading(true);
    try {
      await register(username, password); // crea la cuenta y entra directo
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo crear la cuenta.');
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Field label="Usuario" value={username} onChangeText={setUsername} textContentType="username" />
        <Field label="Contraseña" value={password} onChangeText={setPassword} secureTextEntry textContentType="newPassword" />
        <Field label="Repetir contraseña" value={confirm} onChangeText={setConfirm} secureTextEntry onSubmitEditing={submit} />
        <ErrorText>{error}</ErrorText>
        <Button label="Crear cuenta" onPress={submit} loading={loading} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: space.lg, backgroundColor: colors.bg, maxWidth: 480, width: '100%', alignSelf: 'center' },
});
