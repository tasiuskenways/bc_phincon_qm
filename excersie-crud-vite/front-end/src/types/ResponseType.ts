export interface ResponseType<T> {
  status: string;
  message: string;
  data: T;
}
