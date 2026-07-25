import { useApp } from '@/context/AppContext';
import { getChaptersForClass, Subject } from '@/data/subjects';
import { useColors } from '@/hooks/useColors';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  subject: Subject;
  compact?: boolean;
}

export function SubjectCard({ subject, compact = false }: Props) {
  const colors = useColors();
  const { state, getCompletedChapterCount } = useApp();
  const chapters = getChaptersForClass(subject, state.selectedClass);
  const completed = getCompletedChapterCount(subject.id);
  const total = chapters.length;
  const percent = total > 0 ? completed / total : 0;

  const handlePress = () => {
    Haptics.selectionAsync();
    router.push({ pathname: '/subject/[id]', params: { id: subject.id } });
  };

  if (compact) {
    return (
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.compactCard,
          { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius },
          pressed && styles.pressed,
        ]}
      >
        <View style={[styles.compactIcon, { backgroundColor: subject.bgColor, borderRadius: colors.radius - 4 }]}>
          <Ionicons name={subject.icon as any} size={22} color={subject.color} />
        </View>
        <Text style={[styles.compactName, { color: colors.foreground }]} numberOfLines={1}>
          {subject.name}
        </Text>
        <Text style={[styles.compactProgress, { color: colors.mutedForeground }]}>
          {completed}/{total}
        </Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: subject.bgColor, borderRadius: colors.radius - 2 }]}>
          <Ionicons name={subject.icon as any} size={26} color={subject.color} />
        </View>
        <View style={[styles.badge, { backgroundColor: subject.bgColor }]}>
          <Text style={[styles.badgeText, { color: subject.color }]}>
            {completed}/{total} chapters
          </Text>
        </View>
      </View>

      <Text style={[styles.subjectName, { color: colors.foreground }]}>{subject.name}</Text>
      <Text style={[styles.description, { color: colors.mutedForeground }]} numberOfLines={1}>
        {subject.description}
      </Text>

      <View style={[styles.progressTrack, { backgroundColor: colors.muted, borderRadius: 99 }]}>
        <View
          style={[
            styles.progressFill,
            { backgroundColor: subject.color, borderRadius: 99, width: `${Math.round(percent * 100)}%` },
          ]}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 16,
    borderWidth: 1,
    gap: 8,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } },
      android: { elevation: 2 },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 99,
  },
  badgeText: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
  },
  subjectName: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  description: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  progressTrack: {
    height: 4,
    marginTop: 4,
  },
  progressFill: {
    height: 4,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  // Compact variant
  compactCard: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    gap: 6,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 1 } },
      android: { elevation: 1 },
    }),
  },
  compactIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactName: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
  },
  compactProgress: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
  },
});
