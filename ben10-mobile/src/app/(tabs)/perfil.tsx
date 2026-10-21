import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { api, avatarUrl } from '../../lib/api';
import { useAuth } from '../../lib/auth';
import { useFavorites } from '../../lib/favorites';
import { Button, Dial, ErrorText, text } from '../../components/ui';
import { colors, space } from '../../lib/theme';

export default function Perfil() {
  const { user, setUser, logout } = useAuth();
  const { favoritos } = useFavorites();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  if (!user) return null;

  const changePhoto = async () => {
    setError(null);
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (res.canceled) return;
    const asset = res.assets[0];
    setBusy(true);
    try {
      setUser(await api.subirFoto(asset.uri, asset.mimeType));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo subir la foto.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ alignItems: 'center' }}>
        {user.foto_perfil ? (
          <Dial uri={`${avatarUrl(user.foto_perfil)}`} size={140} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.initial}>{user.username.charAt(0).toUpperCase()}</Text>
          </View>
        )}
        <Text style={[text.title, { marginTop: space.lg }]}>{user.username}</Text>
        <Text style={[text.muted, { marginTop: space.xs }]}>
          {favoritos.length === 1 ? '1 alien favorito' : `${favoritos.length} aliens favoritos`}
        </Text>
      </View>

      <View style={{ marginTop: space.xl }}>
        <Button label="Cambiar foto de perfil" icon="camera-outline" variant="ghost" onPress={changePhoto} loading={busy} />
        <ErrorText>{error}</ErrorText>
        <Button label="Cerrar sesión" icon="log-out-outline" variant="ghost" onPress={logout} style={{ marginTop: space.sm }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: space.lg, paddingTop: space.xl, maxWidth: 480, width: '100%', alignSelf: 'center' },
  placeholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 5,
    borderColor: colors.green,
    backgroundColor: colors.surface2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: { fontSize: 56, color: colors.green, fontFamily: 'ChakraPetch_700Bold' },
});
