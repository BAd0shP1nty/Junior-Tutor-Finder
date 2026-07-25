import { SubjectCard } from '@/components/SubjectCard';
import { useApp } from '@/context/AppContext';
import { CLASSES, SUBJECTS } from '@/data/subjects';
import { useColors } from '@/hooks/useColors';
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

export default function SubjectsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { state, setSelectedClass } = useApp();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border, paddingTop: topPad + 12 }]}>
        <Text style={[styles.title, { color: colors.foreground }]}>Subjects</Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          Select your class and explore
        </Text>

        {/* Class selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.classSelector}
        >
          {CLASSES.map((cls) => {
            const active = cls === state.selectedClass;
            return (
              <Pressable
                key={cls}
                onPress={() => setSelectedClass(cls)}
                style={[
                  styles.classChip,
                  {
                    backgroundColor: active ? colors.primary : colors.muted,
                    borderColor: active ? colors.primary : colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.classChipText,
                    { color: active ? colors.primaryForeground : colors.mutedForeground },
                  ]}
                >
                  Class {cls}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Subjects grid */}
      <ScrollView
        contentContainerStyle={[
          styles.grid,
          { paddingBottom: Platform.OS === 'web' ? 100 : 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.classLabel, { color: colors.mutedForeground }]}>
          Class {state.selectedClass} — {SUBJECTS.length} subjects
        </Text>
        <View style={styles.cardGrid}>
          {SUBJECTS.map((subject, i) => (
            <View
              key={subject.id}
              style={[styles.gridCell, i % 2 === 0 ? styles.gridLeft : styles.gridRight]}
            >
              <SubjectCard subject={subject} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    gap: 4,
  },
  title: { fontSize: 28, fontFamily: 'Inter_700Bold' },
  subtitle: { fontSize: 14, fontFamily: 'Inter_400Regular', marginBottom: 4 },
  classSelector: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 8,
    paddingRight: 20,
  },
  classChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 99,
    borderWidth: 1,
  },
  classChipText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },
  grid: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  classLabel: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    marginBottom: 12,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridCell: {
    width: '50%',
    marginBottom: 12,
  },
  gridLeft: { paddingRight: 6 },
  gridRight: { paddingLeft: 6 },
});
