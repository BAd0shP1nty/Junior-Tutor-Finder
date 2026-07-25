import { ProgressBar } from '@/components/ProgressBar';
import { useApp } from '@/context/AppContext';
import { getChaptersForClass, SUBJECTS } from '@/data/subjects';
import { useColors } from '@/hooks/useColors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Ring({ percent, size = 100, stroke = 10, color }: { percent: number; size?: number; stroke?: number; color: string }) {
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const filled = circumference * Math.min(1, percent);
  // Simple SVG-free ring using border trick
  const empty = percent === 0;
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: stroke,
        borderColor: color + '28',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Filled arc approximation using border on one side */}
      {!empty && (
        <View
          style={{
            position: 'absolute',
            width: size - stroke,
            height: size - stroke,
            borderRadius: (size - stroke) / 2,
            borderWidth: stroke,
            borderColor: color,
            borderRightColor: 'transparent',
            borderBottomColor: percent < 0.5 ? 'transparent' : color,
            transform: [{ rotate: `${percent * 360 - 45}deg` }],
          }}
        />
      )}
      <Text style={{ fontSize: 20, fontFamily: 'Inter_700Bold', color }}>{Math.round(percent * 100)}%</Text>
      <Text style={{ fontSize: 10, fontFamily: 'Inter_500Medium', color: color + 'AA' }}>Overall</Text>
    </View>
  );
}

export default function ProgressScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { state, getCompletedChapterCount, getRecentQuizScores } = useApp();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const subjectStats = SUBJECTS.map((s) => {
    const chapters = getChaptersForClass(s, state.selectedClass);
    const completed = getCompletedChapterCount(s.id);
    return { subject: s, completed, total: chapters.length, percent: chapters.length > 0 ? completed / chapters.length : 0 };
  });

  const totalCompleted = subjectStats.reduce((sum, s) => sum + s.completed, 0);
  const totalChapters = subjectStats.reduce((sum, s) => sum + s.total, 0);
  const overallPercent = totalChapters > 0 ? totalCompleted / totalChapters : 0;

  const recentScores = getRecentQuizScores(6);

  const subjectNameById = Object.fromEntries(SUBJECTS.map((s) => [s.id, s.name]));
  const subjectColorById = Object.fromEntries(SUBJECTS.map((s) => [s.id, s.color]));

  return (
    <ScrollView
      style={[styles.root, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: Platform.OS === 'web' ? 100 : 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary, paddingTop: topPad + 16 }]}>
        <Text style={styles.headerTitle}>My Progress</Text>
        <Text style={styles.headerSub}>Class {state.selectedClass} · Keep it up!</Text>
      </View>

      <View style={styles.content}>
        {/* Overall ring + stats */}
        <View style={[styles.overallCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ring percent={overallPercent} size={110} stroke={11} color={colors.primary} />
          <View style={styles.overallStats}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.foreground }]}>{totalCompleted}</Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Chapters done</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.foreground }]}>{totalChapters - totalCompleted}</Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Remaining</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.accent }]}>{state.studyStreak}</Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Day streak</Text>
            </View>
          </View>
        </View>

        {/* Per-subject progress */}
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Subject Progress</Text>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {subjectStats.map((s, i) => (
            <React.Fragment key={s.subject.id}>
              <View style={styles.subjectRow}>
                <View style={[styles.subjectDot, { backgroundColor: s.subject.color }]} />
                <View style={styles.subjectBarWrap}>
                  <ProgressBar
                    label={s.subject.name}
                    value={s.percent}
                    color={s.subject.color}
                  />
                  <Text style={[styles.chapterCount, { color: colors.mutedForeground }]}>
                    {s.completed}/{s.total} chapters
                  </Text>
                </View>
              </View>
              {i < subjectStats.length - 1 && (
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* Quiz history */}
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Recent Quiz Scores</Text>
        {recentScores.length === 0 ? (
          <View style={[styles.emptyCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Ionicons name="school-outline" size={36} color={colors.mutedForeground} />
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>No quizzes yet</Text>
            <Text style={[styles.emptySubtitle, { color: colors.mutedForeground }]}>
              Take a quiz from any subject to see your scores here
            </Text>
          </View>
        ) : (
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {recentScores.map((score, i) => {
              const pct = score.score / score.total;
              const grade = pct >= 0.8 ? '🟢' : pct >= 0.5 ? '🟡' : '🔴';
              const gradeColor = pct >= 0.8 ? '#16A34A' : pct >= 0.5 ? '#D97706' : '#DC2626';
              return (
                <React.Fragment key={i}>
                  <View style={styles.scoreRow}>
                    <View style={styles.scoreLeft}>
                      <View style={[styles.scoreBadge, { backgroundColor: subjectColorById[score.subjectId] + '20' }]}>
                        <Text style={{ fontSize: 10, fontFamily: 'Inter_700Bold', color: subjectColorById[score.subjectId] }}>
                          {(subjectNameById[score.subjectId] ?? 'Unknown').slice(0, 4).toUpperCase()}
                        </Text>
                      </View>
                      <View>
                        <Text style={[styles.scoreName, { color: colors.foreground }]}>
                          {subjectNameById[score.subjectId] ?? 'Quiz'}
                        </Text>
                        <Text style={[styles.scoreDate, { color: colors.mutedForeground }]}>{score.date}</Text>
                      </View>
                    </View>
                    <Text style={[styles.scoreValue, { color: gradeColor }]}>
                      {score.score}/{score.total}
                    </Text>
                  </View>
                  {i < recentScores.length - 1 && (
                    <View style={[styles.divider, { backgroundColor: colors.border }]} />
                  )}
                </React.Fragment>
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    gap: 4,
  },
  headerTitle: { fontSize: 28, color: '#fff', fontFamily: 'Inter_700Bold' },
  headerSub: { fontSize: 14, color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter_400Regular' },
  content: { padding: 16, gap: 16 },
  overallCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  overallStats: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  statItem: { alignItems: 'center', gap: 2 },
  statValue: { fontSize: 22, fontFamily: 'Inter_700Bold' },
  statLabel: { fontSize: 11, fontFamily: 'Inter_400Regular', textAlign: 'center' },
  statDivider: { width: 1, height: 32 },
  sectionTitle: { fontSize: 18, fontFamily: 'Inter_700Bold', marginTop: 4 },
  card: { borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  subjectRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, padding: 14 },
  subjectDot: { width: 8, height: 8, borderRadius: 4, marginTop: 6 },
  subjectBarWrap: { flex: 1, gap: 4 },
  chapterCount: { fontSize: 11, fontFamily: 'Inter_400Regular' },
  divider: { height: 1, marginHorizontal: 14 },
  emptyCard: {
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    padding: 32,
    gap: 8,
  },
  emptyTitle: { fontSize: 16, fontFamily: 'Inter_600SemiBold' },
  emptySubtitle: { fontSize: 13, fontFamily: 'Inter_400Regular', textAlign: 'center', lineHeight: 20 },
  scoreRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14 },
  scoreLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  scoreBadge: { paddingHorizontal: 7, paddingVertical: 4, borderRadius: 6 },
  scoreName: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  scoreDate: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  scoreValue: { fontSize: 16, fontFamily: 'Inter_700Bold' },
});
