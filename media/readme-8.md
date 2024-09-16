# object

## Type Checking

The `ObjectType<T>` and friends are used to check if a type is `object` or object types.

Note that `Function` are also considered `object` in TypeScript.

```ts
import type { ObjectType } from 'type-plus'

type R = ObjectType<object> // object
type R = ObjectType<{}> // {}
type R = ObjectType<{ a: number }> // { a: number }

type R = ObjectType<1> // never
```

- [`ObjectType<T, Then = T, Else = never>`](object_type.ts#L16): check if `T` is `object`.
- [`IsObject<T, Then = true, Else = false`](object_type.ts#L33): is `T` `object`.
- [`NotObjectType<T, Then = T, Else = never>`](object_type.ts#L48): check if `T` is not `object`.
- [`IsNotObject<T, Then = true, Else = false>`](object_type.ts#L65): is `T` not `object`.

## IsOptionalKey

> `IsOptionalKey<T, K, Then = true, Else = false>`

Validate if the key `K` in `T` is optional.

```ts
import type { IsOptionalKey } from 'type-plus'

type R = IsOptionalKey<{ a?: number }, 'a'> // true
type R = IsOptionalKey<{ a: number }, 'a'> // false
```

## OptionalKeys

> `OptionalKeys<T>`

Gets the optional keys of `T`.

```ts
import type { OptionalKeys } from 'type-plus'

type R = OptionalKeys<{ a?: number; b: string }> // 'a'
```

## OptionalProps

> `OptionalProps<T>`

Gets the optional properties of `T`.

```ts
import type { OptionalProps } from 'type-plus'

type R = OptionalProps<{ a?: number; b: string }> // { a?: number }
```

## [ObjectPlus.Merge](./merge.ts)

`Merge<A, B, Options = { }>`

⚗️ *transform*
🔢 *customizable*

Merges type `A` and type `B`.

This type performs the same operations as `{ ...a, ...b }` but at the type level.

It handles cases like A or B are `Record`,
joining between required and optional props, etc.

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#object-types
