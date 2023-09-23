# Any

`any` is one of the two top types in TypeScript.
It is a supertype of all types.
It is a way to opt-out of type checking and let the values pass through compile-time checks.

## [IsAny](./is_any.ts)

`IsAny<T, $O = { $then: true, $else: false }>`

🎭 *predicate*
🔢 *customize*

Validate if `T` is exactly `any`.

```ts
import type { IsAny } from 'type-plus'

type R = IsAny<any> // true

type R = IsAny<never> // false
type R = IsAny<unknown> // false
type R = IsAny<string | boolean> // false

// customize: branching
type R = IsAny<any, $SelectionBranch> // $Then
type R = IsAny<string, $SelectionBranch> // $Else
```

### [IsNotAny](./is_not_any.ts)

`IsNotAny<T, $O = { $then: true, $else: false }>`

🎭 *predicate*
🔢 *customize*

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
