import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { alienImageUrl } from '../../lib/api';
import { useFavorites } from '../../lib/favorites';
import { Dial, Notice } from '../../components/ui';
import { colors, font, space } from '../../lib/theme';

export default function Favoritos() {
  const { favoritos, loading, refresh, toggle } = useFavorites();

  if (!loading && favoritos.length === 0) {
    return (
      <Notice
        icon="heart-outline"
        title="Todavía no elegiste favoritos"
        text="Entrá a la ficha de un alien y tocá “Agregar a favoritos”."
        actionLabel="Ver aliens"
        onAction={() => router.navigate('/')}
      />
    );
  }

  return (
    <FlatList
      data={favoritos}
      keyExtractor={(a) => String(a.id)}
      contentContainerStyle={styles.list}
      refreshing={loading}
      onRefresh={() => refresh().catch(() => {})}
      renderItem={({ item }) => (
        // La fila es un View y tiene DOS botones hermanos (abrir ficha / quitar):
        // un botón dentro de otro no es válido en la web.
        <View style={styles.row}>
          <Pressable
            onPress={() => router.push({ pathname: '/alien/[id]', params: { id: String(item.id) } })}
            style={({ pressed }) => [styles.open, pressed && { opacity: 0.75 }]}
            accessibilityRole="button"
            accessibilityLabel={`Ver ficha de ${item.nombre}`}
          >
            <Dial uri={alienImageUrl(item.imagen)} size={72} />
            <View style={{ flex: 1, marginLeft: space.md }}>
              <Text style={styles.name}>{item.nombre}</Text>
              <Text style={styles.sub}>
                {item.especie}, de {item.planeta}
              </Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => toggle(item).catch(() => {})}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel={`Quitar ${item.nombre} de favoritos`}
          >
            <Ionicons name="heart" size={26} color={colors.green} />
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: space.lg, maxWidth: 640, width: '100%', alignSelf: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: space.md, borderBottomWidth: 1, borderBottomColor: colors.line },
  open: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  name: { fontFamily: font.bold, fontSize: 18, color: colors.text },
  sub: { fontFamily: font.regular, fontSize: 14, color: colors.muted, marginTop: 2 },
});
