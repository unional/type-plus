// /**
//  * Try casting the value to specified type.
//  * If the object cannot be casted,
//  * the type will becomes never.
//  * Not that due to current TypeScript limitation of `infer` usage,
//  * this function does not work at type level with primitive types.
//  */
// export function tryCast<T, infer V>(value: V): Extract<V, T> {
//   if (value === null || typeof value !== 'object') {
//     throw new Error('tryCase() cannot work with primitive types')
//   }
//   return value as any
// }
