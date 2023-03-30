# bigint

`bigint` is a type to represent integers that are too large to be represented by a `number`.

## Type Checking

The `BigIntType<T>` and friends are used to check if a type is `bigint` or not.

They are loose type checks, meaning they match `bigint` and bigint literals,
as well as intersection types.

```ts
import type { BigIntType } from 'type-plus'

type R = BigIntType<bigint> // bigint

type R = BigIntType<1n> // bigint
type R = BigIntType<bigint & { a: 1}> // bigint
```

- [`BigIntType<T, Then = T, Else = never>`](bigint_type.ts#L15): check if `T` is `bigint` or bigint literal.
- [`IsBigInt<T, Then = true, Else = false`](bigint_type.ts#L33): is `T` `bigint`.
- [`NotBigIntType<T, Then = T, Else = never>`](bigint_type.ts#L47): check if `T` is not `bigint`.
- [`IsNotBigInt<T, Then = true, Else = false>`](bigint_type.ts#L61): is `T` not `bigint`.

---

The `StrictBigIntType<T>` and friends are used to check if a type is exactly `bigint` or not.

They are strict type checks, meaning they match only the type `bigint`,
and not bigint literals or intersection types.

```ts
import type { StrictBigIntType } from 'type-plus'

type R = StrictBigIntType<bigint> // bigint

type R = StrictBigIntType<1n> // never
type R = StrictBigIntType<bigint & { a: 1}> // never
```

- [`StrictBigIntType<T, Then = T, Else = never>`](strict_bigint_type.ts#L15): check if `T` is exactly `bigint`.
- [`IsStrictBigInt<T, Then = true, Else = false`](strict_bigint_type.ts#L33): is `T` exactly `bigint`.
- [`NotStrictBigIntType<T, Then = T, Else = never>`](strict_bigint_type.ts#L47): check if `T` is not exactly `bigint`.
- [`IsNotStrictBigInt<T, Then = true, Else = false>`](strict_bigint_type.ts#L61): is `T` not exactly `bigint`.

## References

- [mdn web docs: BigInt][mdn]

[mdn]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
