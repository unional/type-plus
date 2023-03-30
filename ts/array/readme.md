# Array

`Array<T>` or `T[]` is a type that represents an array of `T`.

## Type Checking

The `ArrayType<T>` and friends are used to check if a type is exactly `Array<T>` or not.

They are strict type checks, meaning they match only the type `Array<T>`,
and not [tuple], union, or intersection types.

```ts
import type { ArrayType } from 'type-plus'

type R = ArrayType<number[]> // number[]

type R = ArrayType<[1]> // never
type R = ArrayType<number[] | 1> // never
type R = ArrayType<number[] & { a: 1 }> // never
```

- [`ArrayType<T, Then = T, Else = never>`](array_type.ts#L15): check if `T` is exactly `Array<X>`.
- [`IsArray<T, Then = true, Else = false`](array_type.ts#L33): is `T` exactly `Array<X>`.
- [`NotArrayType<T, Then = T, Else = never>`](array_type.ts#L47): check if `T` is not exactly `Array<X>`.
- [`IsNotArray<T, Then = true, Else = false>`](array_type.ts#L61): is `T` not exactly `Array<X>`.

## References

- [handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays
[tuple]: ../tuple/readme.md
