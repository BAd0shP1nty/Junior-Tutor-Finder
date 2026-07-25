import { useApp } from '@/context/AppContext';
import { CLASSES, getChaptersForClass, SUBJECTS } from '@/data/subjects';
import { useColors } from '@/hooks/useColors';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useRef, useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { state, setStudentName, setSelectedClass } = useApp();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(state.studentName);
  const inputRef = useRef<TextInput>(null);
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  const totalChapters = SUBJECTS.reduce(
    (sum, s) => sum + getChaptersForClass(s, state.selectedClass).length,
    0,
  );
  const completed = Object.values(state.progress).reduce(
    (sum, sp) => sum + Object.values(sp.chapters).filter((c) => c.completed).length,
    0,
  );
  const quizzesTaken = Object.values(state.progress).reduce(
    (sum, sp) => sum + sp.quizScores.length,
    0,
  );
  const avgScore =
    quizzesTaken > 0
      ? Object.values(state.progress).reduce((sum, sp) => {
          return (
            sum +
            sp.quizScores.reduce((s2, q) => s2 + q.score / q.total, 0)
          );
        }, 0) / quizzesTaken
      : 0;

  const saveName = () => {
    setStudentName(name.trim() || 'Student');
    setEditing(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <ScrollView
      style={[styles.root, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: Platform.OS === 'web' ? 100 : 100 }}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary, paddingTop: topPad + 16 }]}>
        <View style={[styles.avatar, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
          <Text style={styles.avatarInitial}>
            {(state.studentName.trim() || 'S').charAt(0).toUpperCase()}
          </Text>
        </View>

        {editing ? (
          <View style={styles.editRow}>
            <TextInput
              ref={inputRef}
              value={name}
              onChangeText={setName}
              style={[styles.nameInput, { borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }]}
              placeholder="Your name"
              placeholderTextColor="rgba(255,255,255,0.5)"
              autoFocus
              maxLength={30}
              onSubmitEditing={saveName}
            />
            <Pressable onPress={saveName} style={[styles.saveBtn, { backgroundColor: 'rgba(255,255,255,0.25)' }]}>
              <Ionicons name="checkmark" size={20} color="#fff" />
            </Pressable>
          </View>
        ) : (
          <Pressable style={styles.nameRow} onPress={() => { setEditing(true); setTimeout(() => inputRef.current?.focus(), 50); }}>
            <Text style={styles.heroName}>{state.studentName.trim() || 'Set your name'}</Text>
            <Ionicons name="pencil" size={16} color="rgba(255,255,255,0.7)" style={{ marginLeft: 8, marginTop: 4 }} />
          </Pressable>
        )}

        <View style={[styles.classPill, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
          <Text style={styles.classPillText}>Class {state.selectedClass}</Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* Stats row */}
        <View style={styles.statsRow}>
          {[
            { label: 'Chapters', value: `${completed}`, sub: `of ${totalChapters}`, icon: 'book-outline' },
            { label: 'Streak', value: `${state.studyStreak}`, sub: 'days', icon: 'flame-outline' },
            { label: 'Quizzes', value: `${quizzesTaken}`, sub: 'taken', icon: 'flash-outline' },
            { label: 'Avg Score', value: `${Math.round(avgScore * 100)}%`, sub: 'in quizzes', icon: 'stats-chart-outline' },
          ].map((stat) => (
            <View key={stat.label} style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Ionicons name={stat.icon as any} size={18} color={colors.primary} />
              <Text style={[styles.statValue, { color: colors.foreground }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Class selector */}
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Change Class</Text>
          <View style={styles.classGrid}>
            {CLASSES.map((cls) => {
              const active = cls === state.selectedClass;
              return (
                <Pressable
                  key={cls}
                  onPress={() => { setSelectedClass(cls); Haptics.selectionAsync(); }}
                  style={[
                    styles.classBtn,
                    {
                      backgroundColor: active ? colors.primary : colors.muted,
                      borderColor: active ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <Text style={[styles.classBtnText, { color: active ? '#fff' : colors.mutedForeground }]}>
                    {cls}
                  </Text>
                  <Text style={[styles.classBtnSub, { color: active ? 'rgba(255,255,255,0.75)' : colors.mutedForeground }]}>
                    Class
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* About section */}
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>About TuitionHub</Text>
          {[
            { icon: 'school-outline', label: 'Classes 6 to 10', sub: 'NCERT aligned curriculum' },
            { icon: 'book-outline', label: '6 Subjects', sub: 'Maths, Science, English, SST, Hindi, CS' },
            { icon: 'flash-outline', label: 'Practice Quizzes', sub: '5 questions per subject per class' },
            { icon: 'trending-up-outline', label: 'Track Progress', sub: 'Chapter completion & quiz scores' },
          ].map((item, i) => (
            <React.Fragment key={item.label}>
              <View style={styles.infoRow}>
                <View style={[styles.infoIcon, { backgroundColor: colors.secondary }]}>
                  <Ionicons name={item.icon as any} size={18} color={colors.primary} />
                </View>
                <View>
                  <Text style={[styles.infoLabel, { color: colors.foreground }]}>{item.label}</Text>
                  <Text style={[styles.infoSub, { color: colors.mutedForeground }]}>{item.sub}</Text>
                </View>
              </View>
              {i < 3 && <View style={[styles.divider, { backgroundColor: colors.border }]} />}
            </React.Fragment>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'Inter_700Bold',
  },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  heroName: { fontSize: 22, color: '#fff', fontFamily: 'Inter_700Bold' },
  editRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  nameInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#fff',
  },
  saveBtn: { padding: 10, borderRadius: 10 },
  classPill: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 99,
  },
  classPillText: { color: '#fff', fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  content: { padding: 16, gap: 16 },
  statsRow: { flexDirection: 'row', gap: 8 },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 1 } },
      android: { elevation: 1 },
    }),
  },
  statValue: { fontSize: 18, fontFamily: 'Inter_700Bold' },
  statLabel: { fontSize: 10, fontFamily: 'Inter_400Regular', textAlign: 'center' },
  section: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  sectionTitle: { fontSize: 16, fontFamily: 'Inter_700Bold', marginBottom: 4 },
  classGrid: { flexDirection: 'row', gap: 8 },
  classBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 2,
  },
  classBtnText: { fontSize: 18, fontFamily: 'Inter_700Bold' },
  classBtnSub: { fontSize: 10, fontFamily: 'Inter_400Regular' },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  infoIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  infoLabel: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  infoSub: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  divider: { height: 1 },
});
