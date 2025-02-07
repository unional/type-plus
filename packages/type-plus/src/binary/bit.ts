export type Bit = 0 | 1

/**
 * Bitwise NOT operation.
 *
 * @since 🏷️ 8.0.0
 */
export type Not<X extends Bit> = X extends 0 ? 1 : 0

/**
 * Bitwise AND operation.
 *
 * @since 🏷️ 8.0.0
 */
export type And<A extends Bit, B extends Bit> = A extends 1 ? (B extends 1 ? 1 : 0) : 0

/**
 * Bitwise OR operation.
 *
 * @since 🏷️ 8.0.0
 */
export type Or<A extends Bit, B extends Bit> = A extends 1 ? 1 : B extends 1 ? 1 : 0

/**
 * Bitwise XOR operation.
 *
 * @since 🏷️ 8.0.0
 */
export type Xor<A extends Bit, B extends Bit> = A extends 1 ? Not<B> : B
