export type ReplaceProperty<T extends Record<any, any>, K extends keyof T, V> = Omit<T, K> & { [P in K]: V }
