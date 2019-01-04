export function excludeUndefined<T>(actual: T): Exclude<T, undefined> { return actual as any }
