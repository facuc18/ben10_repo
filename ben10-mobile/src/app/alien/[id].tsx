import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { AlienDetalle, alienImageUrl, api } from '../../lib/api';
import { useFavorites } from '../../lib/favorites';
import { Button, Dial, ErrorText, Loading, Notice, text } from '../../components/ui';
import { colors, font, space } from '../../lib/theme';

export default function AlienScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isFavorite, toggle } = useFavorites();
  const [alien, setAlien] = useState<AlienDetalle | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [favError, setFavError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      setError(null);
      setAlien(await api.alien(Number(id)));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo cargar el alien.');
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  // Apariciones agrupadas por serie
  const porSerie = useMemo(() => {
    const map = new Map<string, AlienDetalle['apariciones']>();
    alien?.apariciones.forEach((a) => map.set(a.serie, [...(map.get(a.serie) ?? []), a]));
    return [...map.entries()];
  }, [alien]);

  if (error) return <Notice icon="alert-circle-outline" title="No pudimos cargar la ficha" text={error} actionLabel="Reintentar" onAction={load} />;
  if (!alien) return <Loading />;

  const fav = isFavorite(alien.id);
  const onToggle = async () => {
    setBusy(true);
    setFavError(null);
    try {
      await toggle(alien);
    } catch (e) {
      setFavError(e instanceof Error ? e.message : 'No se pudo actualizar favoritos.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: alien.nombre }} />
      <View style={styles.hero}>
        <Dial uri={alienImageUrl(alien.imagen)} size={200} />
        <Text style={[text.title, { marginTop: space.lg }]}>{alien.nombre}</Text>
        <Text style={[text.muted, { marginTop: space.xs }]}>
          {alien.especie}, de {alien.planeta}
        </Text>
        <Button
          label={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          icon={fav ? 'heart-dislike-outline' : 'heart-outline'}
          variant={fav ? 'ghost' : 'primary'}
          loading={busy}
          onPress={onToggle}
          style={{ marginTop: space.lg, alignSelf: 'stretch' }}
        />
        <ErrorText>{favError}</ErrorText>
      </View>

      <Section title="Descripción" body={alien.descripcion} />
      <Section title="Habilidades" body={alien.habilidades} />
      <Section title="Curiosidades" body={alien.curiosidades} />

      <Text style={[text.heading, { marginBottom: space.sm }]}>Apariciones</Text>
      {porSerie.length === 0 ? (
        <Text style={text.muted}>Todavía no hay apariciones cargadas para este alien.</Text>
      ) : (
        porSerie.map(([serie, eps]) => (
          <View key={serie} style={styles.serie}>
            <Text style={styles.serieName}>{serie}</Text>
            {eps.map((e) => (
              <Text key={e.id} style={text.body}>
                {e.codigo}  {e.episodio}
              </Text>
            ))}
          </View>
        ))
      )}
    </ScrollView>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <View style={{ marginBottom: space.lg }}>
      <Text style={[text.heading, { marginBottom: space.xs }]}>{title}</Text>
      <Text style={text.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: space.lg, paddingBottom: space.xl, maxWidth: 640, width: '100%', alignSelf: 'center' },
  hero: { alignItems: 'center', marginBottom: space.xl },
  serie: { borderLeftWidth: 3, borderLeftColor: colors.green, paddingLeft: space.md, marginBottom: space.md },
  serieName: { fontFamily: font.semi, fontSize: 15, color: colors.green, marginBottom: space.xs },
});
