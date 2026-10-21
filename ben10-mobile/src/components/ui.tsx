import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, font, space } from '../lib/theme';

/** Retrato dentro de un anillo, como el dial del Omnitrix. Es el elemento visual de la app. */
export function Dial({ uri, size, badge }: { uri: string; size: number; badge?: React.ReactNode }) {
  const [failed, setFailed] = useState(false);
  const ring = Math.max(2, Math.round(size * 0.035));
  return (
    <View style={{ width: size, height: size }}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: ring,
          borderColor: colors.green,
          padding: Math.round(size * 0.05),
          backgroundColor: colors.surface2,
        }}
      >
        {failed ? (
          <View style={[styles.center, { flex: 1 }]}>
            <Ionicons name="planet-outline" size={size * 0.4} color={colors.muted} />
          </View>
        ) : (
          <Image
            source={{ uri }}
            onError={() => setFailed(true)}
            style={{ flex: 1, borderRadius: size / 2 }}
            resizeMode="cover"
          />
        )}
      </View>
      {badge}
    </View>
  );
}

export function Button({
  label,
  onPress,
  loading,
  variant = 'primary',
  icon,
  style,
}: {
  label: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'ghost';
  icon?: keyof typeof Ionicons.glyphMap;
  style?: StyleProp<ViewStyle>;
}) {
  const primary = variant === 'primary';
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.btn,
        primary ? styles.btnPrimary : styles.btnGhost,
        pressed && { opacity: 0.8 },
        loading && { opacity: 0.6 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={primary ? colors.bg : colors.green} />
      ) : (
        <View style={styles.row}>
          {icon && (
            <Ionicons
              name={icon}
              size={18}
              color={primary ? colors.bg : colors.green}
              style={{ marginRight: space.sm }}
            />
          )}
          <Text style={[styles.btnText, { color: primary ? colors.bg : colors.green }]}>{label}</Text>
        </View>
      )}
    </Pressable>
  );
}

export function Field(props: TextInputProps & { label: string }) {
  const { label, style, ...rest } = props;
  const [focus, setFocus] = useState(false);
  return (
    <View style={{ marginBottom: space.md }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.muted}
        autoCapitalize="none"
        autoCorrect={false}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={[styles.input, focus && { borderColor: colors.green }, style]}
        {...rest}
      />
    </View>
  );
}

export function Loading() {
  return (
    <View style={[styles.center, { flex: 1, backgroundColor: colors.bg }]}>
      <ActivityIndicator color={colors.green} size="large" />
    </View>
  );
}

/** Estado de error o vacío: explica qué pasó y ofrece una acción. */
export function Notice({
  icon,
  title,
  text,
  actionLabel,
  onAction,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  text?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <View style={[styles.center, { flex: 1, padding: space.lg, backgroundColor: colors.bg }]}>
      <Ionicons name={icon} size={44} color={colors.muted} />
      <Text style={styles.noticeTitle}>{title}</Text>
      {text ? <Text style={styles.noticeText}>{text}</Text> : null}
      {actionLabel && onAction ? (
        <Button label={actionLabel} onPress={onAction} variant="ghost" style={{ marginTop: space.md }} />
      ) : null}
    </View>
  );
}

export function ErrorText({ children }: { children?: string | null }) {
  if (!children) return null;
  return <Text style={styles.error}>{children}</Text>;
}

export const text = StyleSheet.create({
  title: { fontFamily: font.bold, fontSize: 28, color: colors.text },
  heading: { fontFamily: font.semi, fontSize: 18, color: colors.text },
  body: { fontFamily: font.regular, fontSize: 16, lineHeight: 24, color: colors.text },
  muted: { fontFamily: font.regular, fontSize: 14, color: colors.muted },
});

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
  btn: { minHeight: 50, borderRadius: 12, paddingHorizontal: space.lg, alignItems: 'center', justifyContent: 'center' },
  btnPrimary: { backgroundColor: colors.green },
  btnGhost: { borderWidth: 1.5, borderColor: colors.green },
  btnText: { fontFamily: font.bold, fontSize: 16 },
  label: { fontFamily: font.semi, fontSize: 14, color: colors.muted, marginBottom: space.xs },
  input: {
    minHeight: 50,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    paddingHorizontal: space.md,
    color: colors.text,
    fontFamily: font.regular,
    fontSize: 16,
  },
  noticeTitle: { fontFamily: font.semi, fontSize: 18, color: colors.text, marginTop: space.md, textAlign: 'center' },
  noticeText: { fontFamily: font.regular, fontSize: 14, color: colors.muted, marginTop: space.xs, textAlign: 'center', maxWidth: 320 },
  error: { fontFamily: font.regular, fontSize: 14, color: colors.danger, marginBottom: space.md },
});
