import { useColors } from '@/hooks/useColors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  label: string;
  value: number; // 0–1
  color?: string;
  showPercent?: boolean;
  height?: number;
}

export function ProgressBar({ label, value, color, showPercent = true, height = 8 }: Props) {
  const colors = useColors();
  const barColor = color ?? colors.primary;
  const pct = Math.min(1, Math.max(0, value));

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.foreground }]}>{label}</Text>
        {showPercent && (
          <Text style={[styles.percent, { color: colors.mutedForeground }]}>
            {Math.round(pct * 100)}%
          </Text>
        )}
      </View>
      <View style={[styles.track, { backgroundColor: colors.muted, borderRadius: height / 2, height }]}>
        <View
          style={[
            styles.fill,
            { backgroundColor: barColor, borderRadius: height / 2, height, width: `${Math.round(pct * 100)}%` },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 14, fontFamily: 'Inter_500Medium' },
  percent: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  track: { overflow: 'hidden' },
  fill: {},
});
