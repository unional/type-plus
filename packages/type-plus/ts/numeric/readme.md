# number

## Type Checking

`Numeric` type is either `number` or `bigint`.

The `NumericType<T>` and friends are used to check if `T` is `number` or `bigint`.

```ts
import type { NumericType } from 'type-plus'

type R = NumericType<number> // number
type R = NumericType<bigint> // bigint
type R = NumericType<1> // 1
type R = NumericType<1n> // 1n

type R = NumericType<never> // never
```

- [`NumericType<T, Then = T, Else = never>`](numeric_type.ts#L27): check if `T` is `number` or `bigint`.
- [`IsNumeric<T, Then = true, Else = false>`](numeric_type.ts#L42): is `T` `number` or `bigint`.
- [`NotNumericType<T, Then = T, Else = never>`](numeric_type.ts#L57): check if `T` is not `number` nor `bigint`.
- [`IsNotNumeric<T, Then = true, Else = false>`](numeric_type.ts#L72): is `T` not `number` nor `bigint`.

---

`Integer<T>` and friends are used to check if `T` is an integer.

```ts
import type { Integer } from 'type-plus'

type R = Integer<1> // 1
type R = Integer<1.0> // 1.0

type R = Integer<1.1> // never
```

- [`Integer<T, Then = T, Else = never>`](integer.ts#L17): check if `T` is an integer.
- [`IsInteger<T, Then = true, Else = false>`](integer.ts#L36): is `T` an integer.
- [`NotIntegerType<T, Then = T, Else = never>`](integer.ts#L51): check if `T` is not an integer.
- [`IsNotInteger<T, Then = true, Else = false>`](integer.ts#L66): is `T` not an integer.
- [`IsWhole<T, Then = true, Else = false>`](integer.ts#L81): same as `Integer<T>`, will be deprecated in the future.

---

`Positive<T>` and friends are used to check if `T` is a positive numeric value.

The `number` and `bigint` can be considered as a union of all positive and negative numeric literals.

That is why `IsPositive<T>` will yield `boolean` as the union is distributive.
`Positive<T>` returns `T` for `number` and `bigint` for the same reason.
It is a bit confusing but it is correct as it really returns `T | never`,
which resolves to `T`.

This behavior is different than `TrueType<T>` which `TrueType<boolean>` returns `never`.

This is because `TrueType<T>` is checking for the exact `true` type,
while `Positive<T>` is checking for a criteria of types (i.e. a set).

```ts
import type { Positive } from 'type-plus'

type R = Positive<1> // 1
type R = Positive<1.0> // 1.0
type R = Positive<1n> // 1n

type R = Positive<-1> // never
type R = Positive<'1'> // never
```

- [`Positive<T, Then = T, Else = never>`](positive.ts#L17): check if `T` is a positive numeric value.
- [`IsPositive<T, Then = true, Else = false>`](positive.ts#L40): is `T` a positive numeric value.
- [`NotPositiveType<T, Then = T, Else = never>`](positive.ts#L54): check if `T` is not a positive numeric value.
- [`IsNotPositive<T, Then = true, Else = false>`](positive.ts#L68): is `T` not a positive numeric value.

---

`Negative<T>` and friends are used to check if `T` is a negative numeric value.

The `number` and `bigint` can be considered as a union of all negative and negative numeric literals.

That is why `IsNegative<T>` will yield `boolean` as the union is distributive.
`Negative<T>` returns `T` for `number` and `bigint` for the same reason.
It is a bit confusing but it is correct as it really returns `T | never`,
which resolves to `T`.

This behavior is different than `TrueType<T>` which `TrueType<boolean>` returns `never`.

This is because `TrueType<T>` is checking for the exact `true` type,
while `Negative<T>` is checking for a criteria of types (i.e. a set).

```ts
import type { Negative } from 'type-plus'

type R = Negative<1> // never
type R = Negative<1.0> // never
type R = Negative<1n> // never

type R = Negative<number> // number
type R = Negative<any> // any

type R = Negative<-1> // -1
type R = Negative<'1'> // '1'
```

- [`Negative<T, Then = T, Else = never>`](negative.ts#L21): check if `T` is a negative numeric value.
- [`IsNegative<T, Then = true, Else = false>`](negative.ts#L57): is `T` a negative numeric value.
- [`NotNegativeType<T, Then = T, Else = never>`](negative.ts#L75): check if `T` is not a negative numeric value.
- [`IsNotNegative<T, Then = true, Else = false>`](negative.ts#L109): is `T` not a negative numeric value.

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean
