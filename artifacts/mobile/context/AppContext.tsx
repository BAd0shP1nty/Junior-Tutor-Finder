import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = '@tuitionhub:appState';

export interface ChapterProgress {
  completed: boolean;
  completedAt: string;
}

export interface QuizScore {
  date: string;
  score: number;
  total: number;
}

export interface SubjectProgress {
  chapters: Record<string, ChapterProgress>;
  quizScores: QuizScore[];
}

export interface AppState {
  studentName: string;
  selectedClass: number;
  progress: Record<string, SubjectProgress>;
  studyStreak: number;
  lastStudyDate: string;
}

const defaultState: AppState = {
  studentName: '',
  selectedClass: 8,
  progress: {},
  studyStreak: 0,
  lastStudyDate: '',
};

interface AppContextType {
  state: AppState;
  isLoaded: boolean;
  setStudentName: (name: string) => void;
  setSelectedClass: (cls: number) => void;
  markChapterComplete: (subjectId: string, chapterId: string) => void;
  addQuizScore: (subjectId: string, score: number, total: number) => void;
  getSubjectProgress: (subjectId: string) => SubjectProgress;
  getCompletedChapterCount: (subjectId: string) => number;
  getTotalChapterCount: (subjectId: string, totalChapters: number) => number;
  getOverallProgress: (totalChapters: number) => number;
  getRecentQuizScores: (limit?: number) => Array<QuizScore & { subjectId: string }>;
}

const defaultSubjectProgress: SubjectProgress = { chapters: {}, quizScores: [] };

const AppContext = createContext<AppContextType>({
  state: defaultState,
  isLoaded: false,
  setStudentName: () => {},
  setSelectedClass: () => {},
  markChapterComplete: () => {},
  addQuizScore: () => {},
  getSubjectProgress: () => defaultSubjectProgress,
  getCompletedChapterCount: () => 0,
  getTotalChapterCount: () => 0,
  getOverallProgress: () => 0,
  getRecentQuizScores: () => [],
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) {
          const saved = JSON.parse(raw) as AppState;
          setState(saved);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoaded(true));
  }, []);

  const persist = useCallback((next: AppState) => {
    setState(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
  }, []);

  const setStudentName = useCallback(
    (name: string) => persist({ ...state, studentName: name }),
    [state, persist],
  );

  const setSelectedClass = useCallback(
    (cls: number) => persist({ ...state, selectedClass: cls }),
    [state, persist],
  );

  const markChapterComplete = useCallback(
    (subjectId: string, chapterId: string) => {
      const subjectProg = state.progress[subjectId] ?? { chapters: {}, quizScores: [] };
      if (subjectProg.chapters[chapterId]?.completed) return;

      const now = new Date().toISOString();
      const today = now.split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

      let newStreak = state.studyStreak;
      if (state.lastStudyDate !== today) {
        newStreak = state.lastStudyDate === yesterday ? state.studyStreak + 1 : 1;
      }

      persist({
        ...state,
        studyStreak: newStreak,
        lastStudyDate: today,
        progress: {
          ...state.progress,
          [subjectId]: {
            ...subjectProg,
            chapters: {
              ...subjectProg.chapters,
              [chapterId]: { completed: true, completedAt: now },
            },
          },
        },
      });
    },
    [state, persist],
  );

  const addQuizScore = useCallback(
    (subjectId: string, score: number, total: number) => {
      const subjectProg = state.progress[subjectId] ?? { chapters: {}, quizScores: [] };
      const today = new Date().toISOString().split('T')[0];
      persist({
        ...state,
        progress: {
          ...state.progress,
          [subjectId]: {
            ...subjectProg,
            quizScores: [
              { date: today, score, total },
              ...subjectProg.quizScores,
            ].slice(0, 20),
          },
        },
      });
    },
    [state, persist],
  );

  const getSubjectProgress = useCallback(
    (subjectId: string) => state.progress[subjectId] ?? defaultSubjectProgress,
    [state],
  );

  const getCompletedChapterCount = useCallback(
    (subjectId: string) => {
      const prog = state.progress[subjectId];
      if (!prog) return 0;
      return Object.values(prog.chapters).filter((c) => c.completed).length;
    },
    [state],
  );

  const getTotalChapterCount = useCallback((_subjectId: string, totalChapters: number) => totalChapters, []);

  const getOverallProgress = useCallback(
    (totalChapters: number) => {
      if (totalChapters === 0) return 0;
      const total = Object.values(state.progress).reduce((sum, sp) => {
        return sum + Object.values(sp.chapters).filter((c) => c.completed).length;
      }, 0);
      return Math.min(1, total / totalChapters);
    },
    [state],
  );

  const getRecentQuizScores = useCallback(
    (limit = 5) => {
      const all: Array<QuizScore & { subjectId: string }> = [];
      Object.entries(state.progress).forEach(([subjectId, sp]) => {
        sp.quizScores.forEach((q) => all.push({ ...q, subjectId }));
      });
      return all.sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
    },
    [state],
  );

  return (
    <AppContext.Provider
      value={{
        state,
        isLoaded,
        setStudentName,
        setSelectedClass,
        markChapterComplete,
        addQuizScore,
        getSubjectProgress,
        getCompletedChapterCount,
        getTotalChapterCount,
        getOverallProgress,
        getRecentQuizScores,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
