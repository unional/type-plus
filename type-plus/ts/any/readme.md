# Any

`any` is one of the two top types in TypeScript.
It is a supertype of all types.
It is a way to opt-out of type checking and let the values pass through compile-time checks.

## Type Checking

The `AnyType<T>` and friends are used to check if a type is `any` or not.

They are strict type checks, meaning they match only the type `any`.
Union and intersections are not a factor here they are resolved to `any`,
except `any & never` which is `never`.

### [AnyType](./any_type.ts)

`AnyType<T, Then = T, Else = never>`

🌪️ *filter*

Filter `T` to ensure it is exactly `any`.

```ts
import type { AnyType } from 'type-plus'

type R = AnyType<any> // any

type R = AnyType<never> // never
type R = AnyType<unknown> // never
type R = AnyType<string | boolean> // never
```

### [IsAny](./is_any.ts)

`IsAny<T, Then = true, Else = false>`

🎭 *predicate*

Validate if `T` is exactly `any`.

```ts
import type { IsAny } from 'type-plus'

type R = IsAny<any> // true

type R = IsAny<never> // false
type R = IsAny<unknown> // false
type R = IsAny<string | boolean> // false
```

### [NotAnyType](./not_any_type.ts)

`NotAnyType<T, Then = T, Else = never>`

🌪️ *filter*

Filter `T` to ensure it is not exactly `any`.

```ts
import type { NotAnyType } from 'type-plus'

type R = NotAnyType<any> // never

type R = NotAnyType<never> // never
type R = NotAnyType<unknown> // never
type R = NotAnyType<string | boolean> // string | boolean
```

### [IsNotAny](./is_not_any.ts)

`IsNotAny<T, Then = true, Else = false>`

🎭 *predicate*

Validate if `T` is not exactly `any`.

```ts
import type { IsNotAny } from 'type-plus'

type R = IsNotAny<any> // false

type R = IsNotAny<never> // true
type R = IsNotAny<unknown> // true
type R = IsNotAny<string | boolean> // true
```

## Trivia

> Both `any` and `unknown` are top types?

Well, yeah:

```ts
type A = any extends unknown ? 1 : 2 // 1
type B = unknown extends any ? 1 : 2 // 1
```

> Aren't using `any` is bad?

If you use it to simply tell TypeScript to shut up because you are lazy, then yes.

But it is ok to use `any` in many cases, as the type system of TypeScript is not sounded.

There are many cases it is not possible to induce the type correctly.

## References

- [handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any
