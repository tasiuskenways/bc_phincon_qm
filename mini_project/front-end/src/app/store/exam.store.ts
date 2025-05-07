import { create } from "zustand";
import { ExamResponse, ExamStore, ExamType } from "../types/exam.types";
import { downloadCertificate, getAllExams } from "../services/api/ExamApi";

export const useExamStore = create<ExamStore>((set) => ({
  isLoading: false,
  error: null,
  exams: null,
  blob: null,
  fetchExams: async () => {
    try {
      set({ isLoading: true });
      const response = await getAllExams();
      const examsData: ExamType[] = response.data.map((item: ExamResponse) => {
        return {
          examId: item.data.exam.id,
          id: item.id,
          score: item.data.exam.score,
          type: item.data.exam.type,
          startDate: item.data.exam.startDate,
          endDate: item.data.exam.endDate,
          code: item.data.exam.code,
          title: item.data.exam.title,
        };
      });

      set({ isLoading: false, exams: examsData });
    } catch (error: any) {
      console.error(error);
      set({ isLoading: false, error: error.message });
    }
  },
  resetError: () => {
    set({ error: null });
  },
  downloadCertificate: async (id: string) => {
    try {
      set({ isLoading: true });
      const blob = await downloadCertificate(id);

      set({ isLoading: false, blob });
    } catch (error: any) {
      set({ isLoading: false, error: error.message });
    }
  },
}));
