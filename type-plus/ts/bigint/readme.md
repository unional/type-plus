# bigint

`bigint` is a type to represent integers that are too large to be represented by a `number`.

## Type Checking

The `BigintType<T>` and friends are used to check if a type is `bigint` or not.

They are loose type checks, meaning they match `bigint` and bigint literals,
as well as intersection types.

```ts
import type { BigintType } from 'type-plus'

type R = BigintType<bigint> // bigint

type R = BigintType<1n> // bigint
type R = BigintType<bigint & { a: 1}> // bigint
```

- [`BigintType<T, Then = T, Else = never>`](bigint_type.ts#L15): check if `T` is `bigint` or bigint literal.
- [`IsBigint<T, Then = true, Else = false`](bigint_type.ts#L33): is `T` `bigint`.
- [`NotBigintType<T, Then = T, Else = never>`](bigint_type.ts#L47): check if `T` is not `bigint`.
- [`IsNotBigInt<T, Then = true, Else = false>`](bigint_type.ts#L61): is `T` not `bigint`.

---

The `StrictBigintType<T>` and friends are used to check if a type is exactly `bigint` or not.

They are strict type checks, meaning they match only the type `bigint`,
and not bigint literals or intersection types.

```ts
import type { StrictBigintType } from 'type-plus'

type R = StrictBigintType<bigint> // bigint

type R = StrictBigintType<1n> // never
type R = StrictBigintType<bigint & { a: 1}> // never
```

- [`StrictBigintType<T, Then = T, Else = never>`](strict_bigint_type.ts#L15): check if `T` is exactly `bigint`.
- [`IsStrictBigint<T, Then = true, Else = false`](strict_bigint_type.ts#L33): is `T` exactly `bigint`.
- [`NotStrictBigintType<T, Then = T, Else = never>`](strict_bigint_type.ts#L47): check if `T` is not exactly `bigint`.
- [`IsNotStrictBigint<T, Then = true, Else = false>`](strict_bigint_type.ts#L61): is `T` not exactly `bigint`.

## References

- [mdn web docs: BigInt][mdn]

[mdn]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
