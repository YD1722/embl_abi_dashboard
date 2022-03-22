export interface LazyLoadResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
