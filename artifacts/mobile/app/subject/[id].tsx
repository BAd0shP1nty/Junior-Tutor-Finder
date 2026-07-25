import { useApp } from '@/context/AppContext';
import { getChaptersForClass, getSubjectById } from '@/data/subjects';
import { useColors } from '@/hooks/useColors';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SubjectDetailScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state, markChapterComplete, getSubjectProgress } = useApp();

  const subject = getSubjectById(id ?? '');
  if (!subject) {
    return (
      <View style={[styles.root, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.foreground }}>Subject not found</Text>
      </View>
    );
  }

  const chapters = getChaptersForClass(subject, state.selectedClass);
  const progress = getSubjectProgress(subject.id);
  const completed = Object.values(progress.chapters).filter((c) => c.completed).length;
  const percent = chapters.length > 0 ? completed / chapters.length : 0;

  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const handleMarkComplete = (chapterId: string) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    markChapterComplete(subject.id, chapterId);
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Hero header */}
      <View style={[styles.hero, { backgroundColor: subject.color, paddingTop: topPad + 8 }]}>
        <View style={styles.heroTop}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={12}
            style={({ pressed }) => [styles.backBtn, { backgroundColor: 'rgba(255,255,255,0.2)', opacity: pressed ? 0.7 : 1 }]}
          >
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </Pressable>
          <View style={[styles.heroIconWrap, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <Ionicons name={subject.icon as any} size={28} color="#fff" />
          </View>
        </View>

        <Text style={styles.heroTitle}>{subject.name}</Text>
        <Text style={styles.heroSub}>{subject.description}</Text>

        {/* Progress bar */}
        <View style={styles.heroProgress}>
          <View style={[styles.progressTrack, { backgroundColor: 'rgba(255,255,255,0.25)' }]}>
            <View style={[styles.progressFill, { backgroundColor: '#fff', width: `${Math.round(percent * 100)}%` }]} />
          </View>
          <Text style={styles.progressLabel}>{completed}/{chapters.length} chapters</Text>
        </View>
      </View>

      {/* Chapters list */}
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: Platform.OS === 'web' ? 120 : 120, gap: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Quiz button */}
        <Pressable
          style={({ pressed }) => [
            styles.quizBtn,
            { backgroundColor: subject.color, opacity: pressed ? 0.85 : 1 },
          ]}
          onPress={() => router.push({ pathname: '/quiz/[subjectId]', params: { subjectId: subject.id } })}
        >
          <Ionicons name="flash" size={20} color="#fff" />
          <Text style={styles.quizBtnText}>Take a Quiz — 5 Questions</Text>
          <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.8)" />
        </Pressable>

        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
          Class {state.selectedClass} Chapters
        </Text>

        {chapters.map((chapter, i) => {
          const isDone = progress.chapters[chapter.id]?.completed ?? false;
          return (
            <View
              key={chapter.id}
              style={[
                styles.chapterCard,
                {
                  backgroundColor: colors.card,
                  borderColor: isDone ? subject.color + '40' : colors.border,
                  borderRadius: colors.radius,
                },
              ]}
            >
              <View style={styles.chapterTop}>
                <View style={styles.chapterLeft}>
                  <View
                    style={[
                      styles.chapterNum,
                      { backgroundColor: isDone ? subject.color : colors.muted },
                    ]}
                  >
                    {isDone ? (
                      <Ionicons name="checkmark" size={14} color="#fff" />
                    ) : (
                      <Text style={[styles.numText, { color: colors.mutedForeground }]}>{i + 1}</Text>
                    )}
                  </View>
                  <View style={styles.chapterInfo}>
                    <Text style={[styles.chapterTitle, { color: colors.foreground }]}>{chapter.title}</Text>
                    <View style={styles.metaRow}>
                      <Ionicons name="time-outline" size={12} color={colors.mutedForeground} />
                      <Text style={[styles.metaText, { color: colors.mutedForeground }]}>{chapter.duration}</Text>
                    </View>
                  </View>
                </View>

                {!isDone && (
                  <Pressable
                    onPress={() => handleMarkComplete(chapter.id)}
                    hitSlop={8}
                    style={({ pressed }) => [
                      styles.doneBtn,
                      { borderColor: subject.color, opacity: pressed ? 0.7 : 1 },
                    ]}
                  >
                    <Text style={[styles.doneBtnText, { color: subject.color }]}>Done</Text>
                  </Pressable>
                )}
              </View>

              {/* Topics */}
              <View style={[styles.topicsWrap, { borderTopColor: colors.border }]}>
                {chapter.topics.map((topic) => (
                  <View key={topic} style={[styles.topicChip, { backgroundColor: subject.bgColor }]}>
                    <Text style={[styles.topicText, { color: subject.color }]}>{topic}</Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  hero: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 8,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: { fontSize: 26, color: '#fff', fontFamily: 'Inter_700Bold' },
  heroSub: { fontSize: 13, color: 'rgba(255,255,255,0.75)', fontFamily: 'Inter_400Regular' },
  heroProgress: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 },
  progressTrack: { flex: 1, height: 6, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: 6, borderRadius: 3 },
  progressLabel: { color: 'rgba(255,255,255,0.85)', fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  quizBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 12,
    gap: 8,
  },
  quizBtnText: { flex: 1, color: '#fff', fontSize: 15, fontFamily: 'Inter_700Bold' },
  sectionLabel: { fontSize: 12, fontFamily: 'Inter_600SemiBold', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 4 },
  chapterCard: {
    borderWidth: 1,
    overflow: 'hidden',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, shadowOffset: { width: 0, height: 1 } },
      android: { elevation: 1 },
    }),
  },
  chapterTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  chapterLeft: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, flex: 1 },
  chapterNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  numText: { fontSize: 13, fontFamily: 'Inter_700Bold' },
  chapterInfo: { flex: 1, gap: 4 },
  chapterTitle: { fontSize: 15, fontFamily: 'Inter_600SemiBold', lineHeight: 20 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  doneBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
    borderWidth: 1.5,
  },
  doneBtnText: { fontSize: 12, fontFamily: 'Inter_700Bold' },
  topicsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    padding: 12,
    paddingTop: 10,
    borderTopWidth: 1,
  },
  topicChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  topicText: { fontSize: 11, fontFamily: 'Inter_500Medium' },
});
