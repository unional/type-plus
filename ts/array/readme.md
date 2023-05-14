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

- [`ArrayType<T, Then = T, Else = never>`](array_type.ts#L15): check if `T` is an array and not a tuple.
- [`IsArray<T, Then = true, Else = false`](array_type.ts#L33): is `T` an array and not a tuple.
- [`NotArrayType<T, Then = T, Else = never>`](array_type.ts#L47): check if `T` is not an array (can be a tuple).
- [`IsNotArray<T, Then = true, Else = false>`](array_type.ts#L61): is `T` not an array (can be a tuple).

## ArrayPlus

`ArrayPlus` contains all types and type utilities related to array.
Whenever possible, these types and type utilities also work with *tuples*,
as *tuples* is a subset of array.

For *tuple* specific types and type utilities,
please check [`TuplePlus`](../tuple/readme.md#TuplePlus).

### [`ArrayPlus.At`](./array.ts#L17)

> `ArrayPlus.At<A, N, Fail = never>`

Gets the type of the array or tuple `A` at index `N`.

For array, it will return the union of the type of the array value and `undefined`,
as there is no way to guarantee the array has value at `N`.

```ts
type A = Array<string | number>

ArrayPlus.At<A, 0> // string | number | undefined
```

For tuple, it will return the type of the tuple value at index `N`.

```ts
type T = [number, string, 1, 2, 3]

ArrayPlus.At<T, 0> // number
ArrayPlus.At<T, -1> // 3
```

If the `N` is out of bound,
or `N` is not a valid index,
`ArrayPlus.At` will return the `Fail` case, which defaults to `never`.

### [`ArrayPlus.Concat`](./array.ts#L35)

> `ArrayPlus.Concat<A, B>`

Concats two arrays or tuples.

It is just an alias of `[...A, ...B]`.
It is added for completeness.

You are encouraged to use `[...A, ...B]` directly.

## References

- [handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays
[tuple]: ../tuple/readme.md
