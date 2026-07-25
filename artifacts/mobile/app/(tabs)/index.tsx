import { SubjectCard } from '@/components/SubjectCard';
import { useApp } from '@/context/AppContext';
import { getChaptersForClass, SUBJECTS } from '@/data/subjects';
import { useColors } from '@/hooks/useColors';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
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

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { state } = useApp();

  const greeting = getGreeting();
  const displayName = state.studentName.trim() || 'Student';

  // Pick 4 subjects to show at top
  const topSubjects = SUBJECTS.slice(0, 4);

  // Get all chapters across subjects for class
  const allChapters = SUBJECTS.flatMap((s) =>
    getChaptersForClass(s, state.selectedClass).map((c) => ({
      ...c,
      subjectId: s.id,
      subjectName: s.name,
      subjectColor: s.color,
      subjectIcon: s.icon,
    })),
  );

  const completedIds = new Set<string>();
  Object.entries(state.progress).forEach(([, sp]) => {
    Object.entries(sp.chapters).forEach(([id, p]) => {
      if (p.completed) completedIds.add(id);
    });
  });

  const recentChapters = allChapters.filter((c) => !completedIds.has(c.id)).slice(0, 3);

  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <ScrollView
      style={[styles.root, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: Platform.OS === 'web' ? 100 : 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Header */}
      <View
        style={[
          styles.hero,
          { backgroundColor: colors.primary, paddingTop: topPad + 20 },
        ]}
      >
        <View style={styles.heroTop}>
          <View>
            <Text style={styles.heroGreeting}>{greeting},</Text>
            <Text style={styles.heroName}>{displayName}!</Text>
          </View>
          <View style={[styles.classBadge]}>
            <Text style={styles.classBadgeText}>Class {state.selectedClass}</Text>
          </View>
        </View>

        {/* Streak row */}
        <View style={[styles.streakRow, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
          <Ionicons name="flame" size={18} color="#FB923C" />
          <Text style={styles.streakText}>
            {state.studyStreak} day{state.studyStreak !== 1 ? 's' : ''} streak
          </Text>
          <View style={styles.streakSep} />
          <Ionicons name="checkmark-circle" size={16} color="rgba(255,255,255,0.7)" />
          <Text style={styles.streakText}>{completedIds.size} chapters done</Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* Quick subject grid */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Your Subjects</Text>
          <Pressable onPress={() => router.push('/(tabs)/subjects')}>
            <Text style={[styles.seeAll, { color: colors.primary }]}>See all</Text>
          </Pressable>
        </View>

        <View style={styles.grid}>
          {topSubjects.map((subject, i) => (
            <View key={subject.id} style={[styles.gridCell, i % 2 === 0 ? styles.gridLeft : styles.gridRight]}>
              <SubjectCard subject={subject} />
            </View>
          ))}
        </View>

        {/* Continue Learning */}
        {recentChapters.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { color: colors.foreground, marginTop: 24 }]}>
              Continue Learning
            </Text>
            <View style={[styles.continueCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {recentChapters.map((ch, i) => (
                <React.Fragment key={ch.id}>
                  <Pressable
                    style={({ pressed }) => [styles.continueItem, pressed && { opacity: 0.7 }]}
                    onPress={() =>
                      router.push({ pathname: '/subject/[id]', params: { id: ch.subjectId } })
                    }
                  >
                    <View style={[styles.continueIcon, { backgroundColor: ch.subjectColor + '20' }]}>
                      <Ionicons name={ch.subjectIcon as any} size={18} color={ch.subjectColor} />
                    </View>
                    <View style={styles.continueText}>
                      <Text style={[styles.chapterTitle, { color: colors.foreground }]} numberOfLines={1}>
                        {ch.title}
                      </Text>
                      <Text style={[styles.chapterSub, { color: colors.mutedForeground }]}>
                        {ch.subjectName} · {ch.duration}
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
                  </Pressable>
                  {i < recentChapters.length - 1 && (
                    <View style={[styles.divider, { backgroundColor: colors.border }]} />
                  )}
                </React.Fragment>
              ))}
            </View>
          </>
        )}

        {/* Quick Quiz Banner */}
        <Pressable
          style={({ pressed }) => [
            styles.quizBanner,
            { backgroundColor: colors.accent, opacity: pressed ? 0.85 : 1 },
          ]}
          onPress={() => router.push('/(tabs)/subjects')}
        >
          <View>
            <Text style={styles.quizBannerTitle}>Daily Quiz Challenge</Text>
            <Text style={styles.quizBannerSub}>Test your knowledge • 5 questions</Text>
          </View>
          <View style={[styles.quizBannerIcon, { backgroundColor: 'rgba(255,255,255,0.25)' }]}>
            <Ionicons name="flash" size={22} color="#fff" />
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  hero: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    gap: 16,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroGreeting: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.75)',
    fontFamily: 'Inter_400Regular',
  },
  heroName: {
    fontSize: 28,
    color: '#fff',
    fontFamily: 'Inter_700Bold',
  },
  classBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 99,
    marginTop: 6,
  },
  classBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  streakText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
  },
  streakSep: { width: 1, height: 14, backgroundColor: 'rgba(255,255,255,0.3)', marginHorizontal: 4 },
  content: { paddingHorizontal: 16, paddingTop: 24, gap: 12 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 18, fontFamily: 'Inter_700Bold' },
  seeAll: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  gridCell: { width: '50%', marginBottom: 12 },
  gridLeft: { paddingRight: 6 },
  gridRight: { paddingLeft: 6 },
  continueCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    marginTop: 8,
  },
  continueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  continueIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueText: { flex: 1, gap: 2 },
  chapterTitle: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  chapterSub: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  divider: { height: 1, marginLeft: 64 },
  quizBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderRadius: 14,
    marginTop: 12,
  },
  quizBannerTitle: { color: '#fff', fontSize: 16, fontFamily: 'Inter_700Bold' },
  quizBannerSub: { color: 'rgba(255,255,255,0.85)', fontSize: 13, fontFamily: 'Inter_400Regular', marginTop: 2 },
  quizBannerIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
});
