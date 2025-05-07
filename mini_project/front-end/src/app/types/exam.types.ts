import { UserDataType } from "./user.types";

export interface ExamStore {
  isLoading: boolean;
  error: string | null;
  exams: ExamType[] | null;
  blob: Blob | null;
  fetchExams: () => Promise<void>;
  resetError: () => void;
  downloadCertificate: (id: string) => Promise<void>;
}

export interface ExamType {
  id: string;
  score: number;
  type: string;
  startDate: string | null;
  endDate: string | null;
  code: string;
  title: string;
}

export interface ExamResponse {
  id: string;
  data: { status: string; exam: ExamType };
  userId: string;
  tag: string | null;
  user: Omit<UserDataType, "password" | "id">;
}
