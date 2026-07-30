export interface Chapter {
  id: string;
  title: string;
  duration: string;
  topics: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  darkColor: string;
  description: string;
  chapters: Record<number, Chapter[]>;
  quiz: Record<number, QuizQuestion[]>;
}

export const SUBJECTS: Subject[] = [
  {
    id: "math",
    name: "Mathematics",
    icon: "calculator",
    color: "#2563EB",
    bgColor: "#DBEAFE",
    darkColor: "#1D4ED8",
    description: "Numbers, algebra, geometry & more",
    chapters: { 6: [], 7: [], 8: [], 9: [], 10: [] },
    quiz: { 6: [], 7: [], 8: [], 9: [], 10: [] },
  },
  {
    id: "science",
    name: "Science",
    icon: "flask",
    color: "#16A34A",
    bgColor: "#DCFCE7",
    darkColor: "#15803D",
    description: "Physics, Chemistry & Biology",
    chapters: { 6: [], 7: [], 8: [], 9: [], 10: [] },
    quiz: { 6: [], 7: [], 8: [], 9: [], 10: [] },
  },
];

export function getSubjectById(id: string): Subject | undefined {
  return SUBJECTS.find((s) => s.id === id);
}

export const CLASSES = [6, 7, 8, 9, 10];
