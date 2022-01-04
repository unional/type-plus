export function as<T>(subject: unknown): subject is T {
  return true
}

export function asAny(subject: unknown): subject is any {
  return true
}
