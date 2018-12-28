export type RecursiveRequired<T> = {
  [P in keyof T]-?:
  T[P] extends (infer U)[] ? RecursiveRequired<U>[] :
  T[P] extends object ? RecursiveRequired<T[P]> :
  T[P];
}
