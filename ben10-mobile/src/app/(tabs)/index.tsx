import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Alien, alienImageUrl, api } from '../../lib/api';
import { useFavorites } from '../../lib/favorites';
import { Dial, Loading, Notice } from '../../components/ui';
import { colors, font, space } from '../../lib/theme';

export default function Aliens() {
  const { isFavorite } = useFavorites();
  const [aliens, setAliens] = useState<Alien[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState('');
  const { width } = useWindowDimensions();

  const load = useCallback(async () => {
    try {
      setError(null);
      setAliens(await api.aliens());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudieron cargar los aliens.');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!aliens) return [];
    if (!q) return aliens;
    return aliens.filter((a) => [a.nombre, a.especie, a.planeta].some((v) => v.toLowerCase().includes(q)));
  }, [aliens, query]);

  if (error && !aliens) return <Notice icon="cloud-offline-outline" title="No pudimos cargar los aliens" text={error} actionLabel="Reintentar" onAction={load} />;
  if (!aliens) return <Loading />;

  const columns = width >= 700 ? 3 : 2;
  const dial = Math.min(170, Math.floor((Math.min(width, 900) - space.lg * 2 - space.md * (columns - 1)) / columns) - space.lg);

  return (
    <FlatList
      key={columns}
      data={filtered}
      numColumns={columns}
      keyExtractor={(a) => String(a.id)}
      contentContainerStyle={styles.list}
      columnWrapperStyle={{ justifyContent: 'space-around' }}
      refreshing={refreshing}
      onRefresh={async () => {
        setRefreshing(true);
        await load();
        setRefreshing(false);
      }}
      ListHeaderComponent={
        <View style={styles.search}>
          <Ionicons name="search" size={18} color={colors.muted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar por nombre, especie o planeta"
            placeholderTextColor={colors.muted}
            style={styles.searchInput}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      }
      ListEmptyComponent={<Text style={styles.empty}>Ningún alien coincide con “{query}”.</Text>}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => router.push({ pathname: '/alien/[id]', params: { id: String(item.id) } })}
          style={({ pressed }) => [styles.item, { width: dial + space.lg }, pressed && { opacity: 0.75 }]}
          accessibilityRole="button"
          accessibilityLabel={`Ver ficha de ${item.nombre}`}
        >
          <Dial
            uri={alienImageUrl(item.imagen)}
            size={dial}
            badge={
              isFavorite(item.id) ? (
                <View style={styles.heart}>
                  <Ionicons name="heart" size={14} color={colors.bg} />
                </View>
              ) : null
            }
          />
          <Text style={styles.name} numberOfLines={1}>
            {item.nombre}
          </Text>
          <Text style={styles.species} numberOfLines={1}>
            {item.especie}
          </Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: space.lg, paddingBottom: space.xl, maxWidth: 900, width: '100%', alignSelf: 'center' },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: colors.line,
    paddingVertical: space.sm,
    marginBottom: space.lg,
  },
  searchInput: { flex: 1, marginLeft: space.sm, color: colors.text, fontFamily: font.regular, fontSize: 16, paddingVertical: 6 },
  item: { alignItems: 'center', marginBottom: space.lg },
  name: { fontFamily: font.bold, fontSize: 17, color: colors.text, marginTop: space.sm },
  species: { fontFamily: font.regular, fontSize: 13, color: colors.muted },
  heart: {
    position: 'absolute',
    right: 4,
    top: 4,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: { fontFamily: font.regular, color: colors.muted, textAlign: 'center', marginTop: space.xl },
});
