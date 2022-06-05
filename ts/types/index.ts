/**
 * A turing complete solution inspired by many.
 * The types is in Pascal Cases
 * because lower case type names (e.g. true) is a reserved keyword.
 * https://github.com/microsoft/TypeScript/issues/14833
 * https://github.com/tycho01/typical
 */

// export * from './BigInt.js'
export type { AllType } from './AllType.js'
export * from './Any.js'
export * from './Array.js'
export * from './Boolean.js'
export * from './check.js'
export * from './conform.js'
export type { Generate } from './Generate.js'
export { nil as null, Null } from './Null.js'
export * from './Number.js'
export { keys, object, ObjectType as Object } from './Object.js'
export * from './Record'
export * from './satisfy.js'
export * from './String.js'
export * from './Symbol.js'
export * from './Tuple.js'
export * from './types.js'
export { undef as undefined, Undefined } from './Undefined'
export * from './Union.js'
export * from './Unknown.js'
