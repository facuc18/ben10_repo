import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, Pressable, View } from 'react-native';
import { router } from 'expo-router';
import { AlienResultado, alienImageUrl, api, Pregunta } from '../../lib/api';
import { useFavorites } from '../../lib/favorites';
import { Button, Dial, ErrorText, Loading, Notice, text } from '../../components/ui';
import { colors, font, space } from '../../lib/theme';

export default function Quiz() {
  const { isFavorite, toggle } = useFavorites();
  const [preguntas, setPreguntas] = useState<Pregunta[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AlienResultado | null>(null);

  const load = useCallback(async () => {
    try {
      setLoadError(null);
      const data = await api.preguntas();
      setPreguntas(data);
      setAnswers(data.map(() => null));
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : 'No se pudo cargar el cuestionario.');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const reset = () => {
    setStarted(false);
    setStep(0);
    setResult(null);
    setError(null);
    setAnswers((a) => a.map(() => null));
  };

  if (loadError) return <Notice icon="cloud-offline-outline" title="No pudimos cargar el quiz" text={loadError} actionLabel="Reintentar" onAction={load} />;
  if (!preguntas) return <Loading />;
  if (preguntas.length === 0) return <Notice icon="help-circle-outline" title="Todavía no hay preguntas" text="Cargá los datos con python seed.py en el backend." />;

  // ---------- resultado ----------
  if (result) {
    const fav = isFavorite(result.id);
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Text style={text.muted}>Tu alien es</Text>
          <View style={{ marginVertical: space.lg }}>
            <Dial uri={alienImageUrl(result.imagen)} size={220} />
          </View>
          <Text style={text.title}>{result.nombre}</Text>
          <Text style={[text.muted, { marginTop: space.xs }]}>
            {result.especie}, de {result.planeta}
          </Text>
          <Text style={[text.body, { marginTop: space.md, textAlign: 'center' }]}>{result.descripcion}</Text>
        </View>
        <View style={{ marginTop: space.xl }}>
          <Button label="Ver ficha completa" onPress={() => router.push({ pathname: '/alien/[id]', params: { id: String(result.id) } })} />
          <Button
            label={fav ? 'Ya está en tus favoritos' : 'Agregar a favoritos'}
            icon={fav ? 'heart' : 'heart-outline'}
            variant="ghost"
            onPress={async () => {
              if (fav) return;
              try {
                await toggle(result);
              } catch (e) {
                setError(e instanceof Error ? e.message : 'No se pudo agregar a favoritos.');
              }
            }}
            style={{ marginTop: space.sm }}
          />
          <ErrorText>{error}</ErrorText>
          <Button label="Repetir el quiz" variant="ghost" onPress={reset} style={{ marginTop: space.sm }} />
        </View>
      </ScrollView>
    );
  }

  // ---------- inicio ----------
  if (!started) {
    return (
      <View style={[styles.container, { flex: 1, justifyContent: 'center' }]}>
        <Text style={text.title}>¿Qué alien sos?</Text>
        <Text style={[text.body, { marginTop: space.md, marginBottom: space.xl }]}>
          Respondé {preguntas.length} preguntas y el Omnitrix elige el alien que más se parece a vos.
        </Text>
        <Button label="Empezar" onPress={() => setStarted(true)} />
      </View>
    );
  }

  // ---------- preguntas ----------
  const p = preguntas[step];
  const last = step === preguntas.length - 1;
  const selected = answers[step];

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      setResult(await api.resultado(answers.filter((a): a is number => a !== null)));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo calcular el resultado.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.progressTrack} accessibilityLabel={`Pregunta ${step + 1} de ${preguntas.length}`}>
        <View style={[styles.progressFill, { width: `${((step + 1) / preguntas.length) * 100}%` }]} />
      </View>
      <Text style={[text.muted, { marginTop: space.sm }]}>
        Pregunta {step + 1} de {preguntas.length}
      </Text>
      <Text style={[text.heading, { fontSize: 22, lineHeight: 30, marginVertical: space.lg }]}>{p.texto}</Text>

      {p.respuestas.map((r) => {
        const on = selected === r.id;
        return (
          <Pressable
            key={r.id}
            onPress={() => setAnswers((a) => a.map((v, i) => (i === step ? r.id : v)))}
            accessibilityRole="radio"
            accessibilityState={{ selected: on }}
            style={[styles.option, on && styles.optionOn]}
          >
            <Text style={[styles.optionText, on && { color: colors.green }]}>{r.texto}</Text>
          </Pressable>
        );
      })}

      <ErrorText>{error}</ErrorText>
      <View style={styles.nav}>
        <Button label="Anterior" variant="ghost" onPress={() => setStep((s) => s - 1)} style={{ flex: 1, opacity: step === 0 ? 0 : 1 }} />
        <View style={{ width: space.sm }} />
        {last ? (
          <Button label="Ver resultado" onPress={submit} loading={submitting} style={{ flex: 1, opacity: selected === null ? 0.4 : 1 }} />
        ) : (
          <Button label="Siguiente" onPress={() => selected !== null && setStep((s) => s + 1)} style={{ flex: 1, opacity: selected === null ? 0.4 : 1 }} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: space.lg, paddingBottom: space.xl, maxWidth: 560, width: '100%', alignSelf: 'center' },
  progressTrack: { height: 6, borderRadius: 3, backgroundColor: colors.surface2, overflow: 'hidden' },
  progressFill: { height: 6, backgroundColor: colors.green },
  option: { borderWidth: 1.5, borderColor: colors.line, backgroundColor: colors.surface, borderRadius: 12, padding: space.md, marginBottom: space.sm },
  optionOn: { borderColor: colors.green, backgroundColor: colors.surface2 },
  optionText: { fontFamily: font.regular, fontSize: 16, lineHeight: 22, color: colors.text },
  nav: { flexDirection: 'row', marginTop: space.lg },
});
