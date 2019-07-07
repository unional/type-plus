
export type HasKey<T, K> = K extends keyof T ? true : false

export function hasKey<T extends object, K extends string>(subject: T, ...keys: K[]): HasKey<T, K> {
  return !keys.some(key => !(subject as any)[key]) as any
}

