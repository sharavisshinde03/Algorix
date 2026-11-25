import api from "./api";

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  quizScore: number | null;
  lastAccessedAt: string | null;
  completedAt: string | null;
}

export interface ProgressUpdate {
  completed?: boolean;
  quizScore?: number;
}

export interface ProgressSummary {
  totalLessonsStarted: number;
  completedLessons: number;
  averageQuizScore: number;
  completionPercentage: number;
}

export const getLessonProgress = async (): Promise<LessonProgress[]> => {
  const response = await api.get<LessonProgress[]>("/progress");
  return response.data;
};

export const saveLessonProgress = async (
  lessonId: string,
  data: ProgressUpdate
): Promise<LessonProgress> => {
  const response = await api.put<LessonProgress>(
    `/progress/${encodeURIComponent(lessonId)}`,
    data
  );
  return response.data;
};

export const getProgressSummary = async (): Promise<ProgressSummary> => {
  const response = await api.get<ProgressSummary>("/progress/summary");
  return response.data;
};
