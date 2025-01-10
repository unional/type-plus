/**
 * 🧰 *type util*
 *
 * A type that causes the error:
 *
 * `Type instantiation is excessively deep and possibly infinite.ts(2589)`
 *
 * This is used interally to test type path execution.
 * It is not exported and likely not useful in real world.
 */
export type Excessive<T = any> = T extends any ? Excessive<T> : never
