export function excludeUndefined<T>(actual: T): Exclude<T, undefined> { return actual as any }

export function acceptNoUndefined<T>(actual: Exclude<T, undefined>) { return actual }

export function isNever(_: never) {
  return true
}

export function isNumber(_: number) {
  return true
}

export function isVoid(_: void) {
  return true
}
