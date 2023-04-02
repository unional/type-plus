# string

## Type Checking

The `StringType<T>` and friends are used to check if a type is `string` or string literals.

```ts
import type { StringType } from 'type-plus'

type R = StringType<string> // string
type R = StringType<'a'> // 'a'

type R = StringType<1> // never
```

- [`StringType<T, Then = T, Else = never>`](string_type.ts#L18): check if `T` is `string`.
- [`IsString<T, Then = true, Else = false`](string_type.ts#L35): is `T` `string`.
- [`NotStringType<T, Then = T, Else = never>`](string_type.ts#L52): check if `T` is not `string`.
- [`IsNotString<T, Then = true, Else = false>`](string_type.ts#L69): is `T` not `string`.

---

The `StrictStringType<T>` and friends are used to check if a type is exactly `string` type.

```ts
import type { StrictStringType } from 'type-plus'

type R = StrictStringType<string> // string

type R = StrictStringType<'a'> // never
type R = StrictStringType<1> // never
```

- [`StrictStringType<T, Then = T, Else = never>`](strict_string_type.ts#L18): check if `T` is exactly `string`.
- [`IsStrictString<T, Then = true, Else = false`](strict_string_type.ts#L35): is `T` exactly `string`.
- [`NotStrictStringType<T, Then = T, Else = never>`](strict_string_type.ts#L52): check if `T` is not exactly `string`.
- [`IsNotStrictString<T, Then = true, Else = false>`](strict_string_type.ts#L69): is `T` not exactly `string`.

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean
