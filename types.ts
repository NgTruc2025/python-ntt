
export enum Difficulty {
  Easy = 'Dễ',
  Medium = 'Trung bình',
  Hard = 'Khó'
}

export interface Student {
  name: string;
  email: string;
  enrolledAt: string;
  completedTopics: string[]; // Danh sách ID các bài học đã hoàn thành
  completedExercises: string[]; // Danh sách ID các bài tập đã làm xong
}

export interface PythonFunction {
  name: string;
  description: string;
  syntax: string;
  example: string;
  commonErrors: string[];
  tips: string;
}

export interface PythonLibrary {
  name: string;
  description: string;
  category: string;
  isStandard: boolean;
  installCommand?: string;
  keyFeatures: string[];
  example: string;
}

export interface KnowledgeTopic {
  id: string;
  title: string;
  content: string;
  category: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  initialCode: string;
  hint: string;
  isAiGenerated?: boolean;
}

export interface AIAnalysisResult {
  isCorrect: boolean;
  output: string;
  explanation: string;
  suggestion?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}
