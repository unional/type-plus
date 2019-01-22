// From @basarat
// https://basarat.gitbooks.io/typescript/docs/tips/nominalTyping.html

/**
 * Generic Id type
 */
export type Id<T extends string> = {
  type: T,
  value: string
}

export function createId<T extends string>(type: T, value: string): Id<T> {
  return {
    type,
    value
  }
}

export function createIdCreator<T extends string>(type: T) {
  return function createId(value: string): Id<T> {
    return {
      type,
      value
    }
  }
}
