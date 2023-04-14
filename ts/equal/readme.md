# Equal

`Equal<A, B>` and friends check if `A` and `B` are equal.

It is a type-level version of `===`.
It handles special types (`any`, `unknown`, `never`, `void`) correctly.

```ts
import { type Equal } from 'type-plus'

type R = Equal<1, 1> // true
type R = Equal<any, any> // true
type R = Equal<boolean, boolean> // true
type R = Equal<true, true> // true
type R = Equal<[1], [1]> // true

type R = Equal<boolean, true> // false
type R = Equal<any, 1> // false
type R = Equal<[any], [1]> // false
type R = Equal<{ a: 1 }, { a: 1; b: 2 }> // false
```

- [`Equal<A, B, Then = true, Else = false>`](equal.ts#L27): check if `A` and `B` are equal.
- [`NotEqual<A, B, Then = true, Else = false>`](equal.ts#L88): check if `A` and `B` are not equal.

---

[![Just Code: Equality is hard][equality-is-hard]][equality-is-hard-url]
[![Just Code: Equality is hard part 2][equality-is-hard-2]][equality-is-hard-2-url]

[equality-is-hard]: https://img.youtube.com/vi/VEqrFzCzo28/0.jpg
[equality-is-hard-url]: https://www.youtube.com/watch?v=VEqrFzCzo28
[equality-is-hard-2]: https://img.youtube.com/vi/l6G6Rz1n9Sw/0.jpg
[equality-is-hard-2-url]: https://www.youtube.com/watch?v=l6G6Rz1n9Sw
