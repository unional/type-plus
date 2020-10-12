// From @basarat
// https://basarat.gitbooks.io/typescript/docs/tips/nominalTyping.html

/**
 * A generic Id type
 */
export type Id<T extends string> = {
  type: T,
  value: string,
}

export function createId<T extends string>(type: T): (value: string) => Id<T>
export function createId<T extends string>(type: T, value: string): Id<T>
export function createId<T extends string>(type: T, value?: string) {
  if (value === undefined) {
    return function (value: string) {
      return { type, value }
    }
  }
  return { type, value }
}
