// istanbul ignore file

import { any, Any } from './Any'
// import { undef, Undefined } from './Undefined'
// import { Union, union } from './Union'

export type BigInt<Value extends bigint | Any = bigint | Any> = { name: 'bigint', value: Value }

/**
 * Creates a single value type.
 */
function create<Value extends bigint | Any>(value: Value): BigInt<Value> {
  // Cannot name this function as `const` because it is a reserved keyword.
  return { name: 'bigint', value }
}


export const bigint = {
  ...create(any),
  create,
  // Note: adding this requires Union type to include BigInt
  // optional: {
  //   ...union.create(create(any), undef),
  //   /**
  //    * Creates an optional bigint constant type.
  //    */
  //   create<Value extends bigint>(value: Value): Union<[BigInt<Value>, Undefined]> {
  //     return union.create(create(value), undef)
  //   }
  // }
}
