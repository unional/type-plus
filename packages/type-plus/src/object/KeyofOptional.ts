/**
 * @deprecated renamed to `KeysOfOptional`
 */
export type KeyofOptional<T> = T extends Record<infer U, any> ? U : never

export type KeysOfOptional<T> = T extends Record<infer U, any> ? U : never
