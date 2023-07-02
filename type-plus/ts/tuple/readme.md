# Tuple

In TypeScript, the type of an JavaScript array can be an [array](../array/readme.md) or a [tuple](#tuple).

A *tuple type* is an array with fixed number of entries.
Each entry in the *tuple* is specified explicitly.

## Type Checking

The `TupleType<T>` and friends are used to check if `T` is a tuple, excluding array.

```ts
import type { TupleType } from 'type-plus'

type R = TupleType<[]> // []
type R = TupleType<[1]> // [1]

type R = TupleType<number[]> // never
type R = TupleType<number> // never
```

- [`TupleType<T, Then = T, Else = never>`](tuple_type.ts#L16): check if `T` is a *tuple*.
- [`IsTuple<T, Then = true, Else = false`](tuple_type.ts#L35): is `T` *tuple*.
- [`NotTupleType<T, Then = T, Else = never>`](tuple_type.ts#L50): check if `T` is not *tuple*.
- [`IsNotTuple<T, Then = true, Else = false>`](tuple_type.ts#L65): is `T` not *tuple*.

## [CommonPropKeys](./common_prop_keys.ts)

`CommonPropKeys<T extends Record[], Cases = { array, no_common_keys }>`

Gets the common property keys of the elements in tuple `T`.

⚗️ *transform*

```ts
import { CommonPropKeys } from 'type-plus'

type R = CommonPropKeys<[{ a: number }, { b: number }]> // never
type R = CommonPropKeys<[{ a: number, c: 1 }, { b: number, c: 2 }]> // 'c'
```

Overridable cases:

- `array`: if `T` is array, it returns the key of the record type in the array.
- `no_common_keys`: if there are no common keys, it returns `never`.

## [DropFirst](./drop.ts)

`DropFirst<T extends unknown[], Cases = { array, empty_tuple }>`

Drops the first entry in the tuple `T`.

⚗️ *transform*

```ts
import { DropFirst } from 'type-plus'

type R = DropFirst<[1, 2, 3]> // [2, 3]
```

Overridable cases:

- `array`: if `T` is array, it returns `T`.
- `empty_tuple`: if `T` is `[]`, it returns `[]`.

## [DropLast](./drop.ts)

`DropLast<T extends unknown[], Cases = { array, empty_tuple }>`

Drops the last entry in the tuple `T`.

⚗️ *transform*

```ts
import { DropLast } from 'type-plus'

type R = DropLast<[1, 2, 3]> // [1, 2]
```

Overridable cases:

- `array`: if `T` is array, it returns `T`.
- `empty_tuple`: if `T` is `[]`, it returns `[]`.

## [DropMatch](./drop.ts)

`DropMatch<A extends Readonly<Array<unknown>>, Criteria>`

Drops entries matching `Criteria` in array or tuple `A`.

⚗️ *transform*

```ts
type R = DropMatch<Array<string | undefined>, undefined> // string[]
type R = DropMatch<Array<string>, string> // never[]
type R = DropMatch<Array<1 | 2>, number> // never[]
```

## [TuplePlus](./tuple_plus.ts)

`TuplePlus` contains type utilities specific for *tuple*.
The input type are not checked and assumed to be *tuple*.

### [TuplePlus.Filter](./tuple_plus.filter.ts)

`TuplePlus.Filter<T, Criteria>`

Filter entries matching `Criteria` in tuple `T`.

⚗️ *transform*

```ts
import { TuplePlus } from 'type-plus'

type R = TuplePlus.Filter<[1, 2, '3'], number> // [1, 2]
```

### [TuplePlus.PadStart](./tuple_plus.pad_start.ts)

`TuplePlus.PadStart<T, MaxLength, PadWith>`

Pad `T` with `PadWith` at the start of the tuple.

If the `MaxLength` is less than the length of the tuple,
the `Tuple` will be returned unchanged.

⚗️ *transform*

```ts
PadStart<[1, 2, 3], 5, 0> // [0, 0, 1, 2, 3]

// Ignore if MaxLength is less than the length of the tuple
PadStart<[1, 2, 3], 2> // [1, 2, 3]

// Default to unknown
PadStart<[1, 2, 3], 5> // [unknown, unknown, 1, 2, 3]
```

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types
