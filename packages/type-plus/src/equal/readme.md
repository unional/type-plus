# Equality

Equality check in TypeScript is hard.

In fact, it is impossible to implement a perfect equality check in TypeScript,
unless TypeScript itself provides a built-in type for it.

## [`Equal`](./equal.ts)

🏷️ **since 8.0.0**

`Equal<A, B>` checks if `A` and `B` are equal.

Note that intersection type checks only works at first level.
It cannot be checked recursively,
or else will run into infinite recursion if the type includes recursive types.

## [`IsEqual`](./is_equal.ts)

💀 **deprecated since 8.0.0**: use [`Equal`] instead.

`IsEqual<A, B>` and friends check if `A` and `B` are equal.

It is a type-level version of `===`.
It handles special types (`any`, `unknown`, `never`, `void`) correctly.

```ts
import { type IsEqual } from 'type-plus'

type R = IsEqual<1, 1> // true
type R = IsEqual<any, any> // true
type R = IsEqual<boolean, boolean> // true
type R = IsEqual<true, true> // true
type R = IsEqual<[1], [1]> // true

type R = IsEqual<boolean, true> // false
type R = IsEqual<any, 1> // false
type R = IsEqual<[any], [1]> // false
type R = IsEqual<{ a: 1 }, { a: 1; b: 2 }> // false
```

Note that intersection type checks only works at first level.
It cannot be check recursively,
or else will run into infinite recursion if the type includes recursive types.

i.e.

```ts
// true
IsEqual<{ a: 1 } & { b: 2 }, { a: 1; b: 2 }>

// false
IsEqual<{ nested: { a: number; b: string } }, { nested: { a: number } & { b: string } }>
```

- [`IsEqual<A, B, Then = true, Else = false>`](equal.ts#L27): check if `A` and `B` are equal.
- [`IsNotEqual<A, B, Then = true, Else = false>`](equal.ts#L88): check if `A` and `B` are not equal.

---

[![Just Code: Equality is hard][equality-is-hard]][equality-is-hard-url]
[![Just Code: Equality is hard part 2][equality-is-hard-2]][equality-is-hard-2-url]

[equality-is-hard]: https://img.youtube.com/vi/VEqrFzCzo28/0.jpg
[equality-is-hard-url]: https://www.youtube.com/watch?v=VEqrFzCzo28
[equality-is-hard-2]: https://img.youtube.com/vi/l6G6Rz1n9Sw/0.jpg
[equality-is-hard-2-url]: https://www.youtube.com/watch?v=l6G6Rz1n9Sw
