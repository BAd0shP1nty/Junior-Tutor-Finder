import { useApp } from '@/context/AppContext';
import { getQuizForClass, getSubjectById, QuizQuestion } from '@/data/subjects';
import { useColors } from '@/hooks/useColors';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Phase = 'quiz' | 'result';

export default function QuizScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { subjectId } = useLocalSearchParams<{ subjectId: string }>();
  const { state, addQuizScore } = useApp();

  const subject = getSubjectById(subjectId ?? '');
  const questions = subject ? getQuizForClass(subject, state.selectedClass) : [];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [phase, setPhase] = useState<Phase>('quiz');
  const [score, setScore] = useState(0);

  const topPad = Platform.OS === 'web' ? 67 : insets.top;

  if (!subject || questions.length === 0) {
    return (
      <View style={[styles.root, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', gap: 16 }]}>
        <Ionicons name="alert-circle-outline" size={48} color={colors.mutedForeground} />
        <Text style={[styles.errorText, { color: colors.foreground }]}>Quiz not found</Text>
        <Pressable onPress={() => router.back()} style={[styles.backPressable, { backgroundColor: colors.primary }]}>
          <Text style={{ color: '#fff', fontFamily: 'Inter_600SemiBold' }}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const q: QuizQuestion = questions[current];
  const progress = (current + 1) / questions.length;
  const isAnswered = selected !== null;

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const newAnswers = [...answers];
    newAnswers[current] = idx;
    setAnswers(newAnswers);
    if (idx === q.correctIndex) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      const finalScore = answers.reduce((sum: number, ans, i) => {
        return sum + (ans === questions[i].correctIndex ? 1 : 0);
      }, 0) + (selected === q.correctIndex ? 1 : 0) - (answers[current] === q.correctIndex ? 1 : 0);
      // Recalculate properly
      const updatedAnswers = [...answers];
      updatedAnswers[current] = selected;
      const total = updatedAnswers.reduce((sum: number, ans, i) => {
        return sum + (ans === questions[i].correctIndex ? 1 : 0);
      }, 0);
      setScore(total);
      addQuizScore(subject.id, total, questions.length);
      setPhase('result');
    }
  };

  const handleRetry = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers(new Array(questions.length).fill(null));
    setPhase('quiz');
    setScore(0);
  };

  // Result screen
  if (phase === 'result') {
    const pct = score / questions.length;
    const grade = pct >= 0.8 ? 'Excellent!' : pct >= 0.6 ? 'Good Job!' : pct >= 0.4 ? 'Keep Practising' : 'Need More Study';
    const gradeColor = pct >= 0.8 ? '#16A34A' : pct >= 0.6 ? subject.color : pct >= 0.4 ? '#D97706' : '#DC2626';

    return (
      <View style={[styles.root, { backgroundColor: colors.background }]}>
        <View style={[styles.resultHero, { backgroundColor: gradeColor, paddingTop: topPad + 20 }]}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [styles.backBtn, { backgroundColor: 'rgba(255,255,255,0.2)', opacity: pressed ? 0.7 : 1 }]}
          >
            <Ionicons name="close" size={22} color="#fff" />
          </Pressable>
          <Text style={styles.resultGrade}>{grade}</Text>
          <Text style={styles.resultScore}>{score}/{questions.length}</Text>
          <Text style={styles.resultSub}>{Math.round(pct * 100)}% correct</Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 60 }}>
          {questions.map((question, i) => {
            const userAns = answers[i];
            const correct = userAns === question.correctIndex;
            return (
              <View key={question.id} style={[styles.reviewCard, { backgroundColor: colors.card, borderColor: correct ? '#16A34A40' : '#DC262640', borderRadius: colors.radius }]}>
                <View style={styles.reviewTop}>
                  <View style={[styles.reviewBadge, { backgroundColor: correct ? '#16A34A20' : '#DC262620' }]}>
                    <Ionicons name={correct ? 'checkmark-circle' : 'close-circle'} size={16} color={correct ? '#16A34A' : '#DC2626'} />
                    <Text style={{ color: correct ? '#16A34A' : '#DC2626', fontSize: 12, fontFamily: 'Inter_600SemiBold' }}>
                      Q{i + 1}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.reviewQuestion, { color: colors.foreground }]}>{question.question}</Text>
                <Text style={[styles.reviewAnswer, { color: '#16A34A' }]}>
                  ✓ {question.options[question.correctIndex]}
                </Text>
                {!correct && userAns !== null && (
                  <Text style={[styles.reviewAnswer, { color: '#DC2626' }]}>
                    ✗ Your answer: {question.options[userAns]}
                  </Text>
                )}
              </View>
            );
          })}

          <View style={styles.resultActions}>
            <Pressable
              onPress={handleRetry}
              style={({ pressed }) => [styles.actionBtn, { backgroundColor: subject.color, opacity: pressed ? 0.85 : 1 }]}
            >
              <Ionicons name="refresh" size={18} color="#fff" />
              <Text style={styles.actionBtnText}>Try Again</Text>
            </Pressable>
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [styles.actionBtn, { backgroundColor: colors.secondary, opacity: pressed ? 0.85 : 1 }]}
            >
              <Ionicons name="book-outline" size={18} color={colors.primary} />
              <Text style={[styles.actionBtnText, { color: colors.primary }]}>Back to Chapters</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    );
  }

  // Quiz screen
  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.quizHeader, { backgroundColor: subject.color, paddingTop: topPad + 10 }]}>
        <View style={styles.quizHeaderRow}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [styles.backBtn, { backgroundColor: 'rgba(255,255,255,0.2)', opacity: pressed ? 0.7 : 1 }]}
          >
            <Ionicons name="close" size={22} color="#fff" />
          </Pressable>
          <Text style={styles.quizTitle}>{subject.name} Quiz</Text>
          <View style={[styles.qCounter, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
            <Text style={styles.qCounterText}>{current + 1}/{questions.length}</Text>
          </View>
        </View>

        {/* Progress bar */}
        <View style={[styles.quizProgressTrack, { backgroundColor: 'rgba(255,255,255,0.25)' }]}>
          <View style={[styles.quizProgressFill, { width: `${Math.round(progress * 100)}%` }]} />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 60, gap: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Question */}
        <View style={[styles.questionCard, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius }]}>
          <Text style={[styles.questionLabel, { color: colors.mutedForeground }]}>Question {current + 1}</Text>
          <Text style={[styles.questionText, { color: colors.foreground }]}>{q.question}</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsGrid}>
          {q.options.map((option, idx) => {
            let bgColor = colors.card;
            let borderColor = colors.border;
            let textColor = colors.foreground;
            if (selected !== null) {
              if (idx === q.correctIndex) {
                bgColor = '#DCFCE7';
                borderColor = '#16A34A';
                textColor = '#166534';
              } else if (idx === selected && selected !== q.correctIndex) {
                bgColor = '#FEE2E2';
                borderColor = '#DC2626';
                textColor = '#991B1B';
              }
            } else if (selected === idx) {
              bgColor = subject.bgColor;
              borderColor = subject.color;
            }

            return (
              <Pressable
                key={idx}
                onPress={() => handleSelect(idx)}
                style={({ pressed }) => [
                  styles.optionBtn,
                  {
                    backgroundColor: bgColor,
                    borderColor,
                    borderRadius: colors.radius,
                    opacity: pressed && selected === null ? 0.85 : 1,
                  },
                ]}
              >
                <View style={[styles.optionCircle, { borderColor: borderColor, backgroundColor: selected !== null && idx === q.correctIndex ? '#16A34A' : selected === idx ? subject.color : 'transparent' }]}>
                  <Text style={[styles.optionLetter, { color: selected !== null && (idx === q.correctIndex || idx === selected) ? '#fff' : textColor }]}>
                    {String.fromCharCode(65 + idx)}
                  </Text>
                </View>
                <Text style={[styles.optionText, { color: textColor, flex: 1 }]}>{option}</Text>
                {selected !== null && idx === q.correctIndex && (
                  <Ionicons name="checkmark-circle" size={20} color="#16A34A" />
                )}
                {selected !== null && idx === selected && selected !== q.correctIndex && (
                  <Ionicons name="close-circle" size={20} color="#DC2626" />
                )}
              </Pressable>
            );
          })}
        </View>

        {/* Explanation if answered */}
        {isAnswered && (
          <View style={[styles.explanationCard, { backgroundColor: selected === q.correctIndex ? '#DCFCE7' : '#FEE2E2', borderRadius: colors.radius }]}>
            <Ionicons
              name={selected === q.correctIndex ? 'checkmark-circle' : 'information-circle'}
              size={20}
              color={selected === q.correctIndex ? '#16A34A' : '#DC2626'}
            />
            <Text style={[styles.explanationText, { color: selected === q.correctIndex ? '#166534' : '#991B1B' }]}>
              {selected === q.correctIndex
                ? 'Correct! Well done!'
                : `The correct answer is: ${q.options[q.correctIndex]}`}
            </Text>
          </View>
        )}

        {/* Next button */}
        {isAnswered && (
          <Pressable
            onPress={handleNext}
            style={({ pressed }) => [styles.nextBtn, { backgroundColor: subject.color, opacity: pressed ? 0.85 : 1 }]}
          >
            <Text style={styles.nextBtnText}>
              {current < questions.length - 1 ? 'Next Question' : 'See Results'}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  errorText: { fontSize: 18, fontFamily: 'Inter_600SemiBold' },
  backPressable: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10 },
  quizHeader: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  quizHeaderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  quizTitle: { fontSize: 17, color: '#fff', fontFamily: 'Inter_700Bold', flex: 1, textAlign: 'center', marginHorizontal: 8 },
  qCounter: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 99 },
  qCounterText: { color: '#fff', fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  quizProgressTrack: { height: 6, borderRadius: 3, overflow: 'hidden' },
  quizProgressFill: { height: 6, backgroundColor: '#fff', borderRadius: 3 },
  questionCard: {
    padding: 20,
    borderWidth: 1,
    gap: 8,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } },
      android: { elevation: 2 },
    }),
  },
  questionLabel: { fontSize: 12, fontFamily: 'Inter_500Medium', textTransform: 'uppercase', letterSpacing: 0.5 },
  questionText: { fontSize: 18, fontFamily: 'Inter_700Bold', lineHeight: 26 },
  optionsGrid: { gap: 10 },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderWidth: 1.5,
    gap: 12,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, shadowOffset: { width: 0, height: 1 } },
      android: { elevation: 1 },
    }),
  },
  optionCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLetter: { fontSize: 13, fontFamily: 'Inter_700Bold' },
  optionText: { fontSize: 15, fontFamily: 'Inter_500Medium', lineHeight: 22 },
  explanationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 14,
  },
  explanationText: { flex: 1, fontSize: 14, fontFamily: 'Inter_500Medium', lineHeight: 20 },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 14,
    gap: 8,
  },
  nextBtnText: { color: '#fff', fontSize: 16, fontFamily: 'Inter_700Bold' },
  // Result styles
  resultHero: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    alignItems: 'center',
    gap: 8,
  },
  resultGrade: { fontSize: 28, color: '#fff', fontFamily: 'Inter_700Bold', marginTop: 16 },
  resultScore: { fontSize: 52, color: '#fff', fontFamily: 'Inter_700Bold' },
  resultSub: { fontSize: 16, color: 'rgba(255,255,255,0.8)', fontFamily: 'Inter_500Medium' },
  reviewCard: {
    borderWidth: 1,
    padding: 14,
    gap: 8,
  },
  reviewTop: { flexDirection: 'row' },
  reviewBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  reviewQuestion: { fontSize: 14, fontFamily: 'Inter_600SemiBold', lineHeight: 20 },
  reviewAnswer: { fontSize: 13, fontFamily: 'Inter_500Medium', lineHeight: 18 },
  resultActions: { flexDirection: 'column', gap: 10, marginTop: 8 },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    borderRadius: 14,
  },
  actionBtnText: { color: '#fff', fontSize: 15, fontFamily: 'Inter_700Bold' },
});
