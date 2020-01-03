export type KeyofOptional<T> = T extends Record<infer U, any> ? U : never
