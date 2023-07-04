# Tuple

In TypeScript, the type of an JavaScript array can be an [array](../array/readme.md) or a [tuple](#tuple).

A *tuple type* is an array with fixed number of entries.
Each entry in the *tuple* is specified explicitly.

## Type Checking

The `TupleType<T>` and friends are used to check if `T` is a tuple, excluding array.

### [TupleType](./tuple_type.ts#l21)

`TupleType<T, Then = T, Else = never, Cases = { never }>`

🌪️ *filter*

Filter `T` to ensure it is an array, excluding tuple.

```ts
import type { TupleType } from 'type-plus'

 type R = TupleType<[]>       // []
 type R = TupleType<[1]>      // [1]

 type R = TupleType<number[]> // never
 type R = TupleType<string>   // never
 type R = TupleType<never>    // never
 type R = TupleType<unknown>  // never
```

Overridable cases:

- `never`: if `T` is `never`, it returns `Else`.

### [IsTuple](./array_type.ts#l47)

`IsTuple<T, Then = true, Else = false, Cases = { never }>`

🎭 *validate*

Validate that `T` is an array, excluding tuple.

```ts
import type { IsTuple } from 'type-plus'

type R = IsTuple<[]>       // true

type R = IsTuple<number[]> // false
type R = IsTuple<string>   // false
type R = IsTuple<never>    // false
type R = IsTuple<unknown>  // false
```

Overridable cases:

- `never`: if `T` is `never`, it returns `Else`.

### [NotTupleType](./tuple_type.ts#l70)

`NotArrayType<T, Then = T, Else = never, Cases = { never }>`

🌪️ *filter*

Filter `T` to ensure it is not an tuple, excluding array.

```ts
import type { NotArrayType } from 'type-plus'

type R = NotTupleType<[]>       // never
type R = NotTupleType<[1]>      // never

type R = NotTupleType<number[]> // number[]
type R = NotTupleType<string>   // string
type R = NotTupleType<never>    // never
type R = NotTupleType<unknown>  // unknown
```

Overridable cases:

- `never`: if `T` is `never`, it returns `Else`.

### [IsNotTupleType](./tuple_type.ts#l92)

`IsNotTupleType<T, Then = true, Else = false, Cases = { never }>`

🎭 *validate*

Validate that `T` is not a tuple, excluding array.

```ts
import type { IsNotTupleType } from 'type-plus'

type R = IsNotTuple<[]>       // false
type R = IsNotTuple<[1]>      // false

type R = IsNotTuple<number[]> // true
type R = IsNotTuple<string>   // true
type R = IsNotTuple<never>    // true
type R = IsNotTuple<unknown>  // true
```

Overridable cases:

- `never`: if `T` is `never`, it returns `Else`.

## [CommonPropKeys](./common_prop_keys.ts#l17)

`CommonPropKeys<T extends Record[], Cases = { array, no_common_keys }>`

⚗️ *transform*

Gets the common property keys of the elements in tuple `T`.

```ts
import { CommonPropKeys } from 'type-plus'

type R = CommonPropKeys<[{ a: number }, { b: number }]> // never
type R = CommonPropKeys<[{ a: number, c: 1 }, { b: number, c: 2 }]> // 'c'
```

Overridable cases:

- `array`: if `T` is array, it returns the key of the record type in the array.
- `no_common_keys`: if there are no common keys, it returns `never`.

## [DropFirst](./drop.ts#l19)

`DropFirst<T extends unknown[], Cases = { array, empty_tuple }>`

⚗️ *transform*

Drops the first entry in the tuple `T`.

```ts
import { DropFirst } from 'type-plus'

type R = DropFirst<[1, 2, 3]> // [2, 3]
```

Overridable cases:

- `array`: if `T` is array, it returns `T`.
- `empty_tuple`: if `T` is `[]`, it returns `[]`.

## [DropLast](./drop.ts#l50)

`DropLast<T extends unknown[], Cases = { array, empty_tuple }>`

⚗️ *transform*

Drops the last entry in the tuple `T`.

```ts
import { DropLast } from 'type-plus'

type R = DropLast<[1, 2, 3]> // [1, 2]
```

Overridable cases:

- `array`: if `T` is array, it returns `T`.
- `empty_tuple`: if `T` is `[]`, it returns `[]`.

## [DropMatch](./drop.ts)

`DropMatch<A extends Readonly<Array<unknown>>, Criteria>`

⚗️ *transform*

Drops entries matching `Criteria` in array or tuple `A`.

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

⚗️ *transform*

Filter entries matching `Criteria` in tuple `T`.

```ts
import { TuplePlus } from 'type-plus'

type R = TuplePlus.Filter<[1, 2, '3'], number> // [1, 2]
```

### [TuplePlus.PadStart](./tuple_plus.pad_start.ts)

`TuplePlus.PadStart<T, MaxLength, PadWith>`

⚗️ *transform*

Pad `T` with `PadWith` at the start of the tuple.

If the `MaxLength` is less than the length of the tuple,
the `Tuple` will be returned unchanged.

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
