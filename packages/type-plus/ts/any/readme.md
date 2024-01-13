# Any

`any` is one of the two top types in TypeScript.
It is a supertype of all types.
It is a way to opt-out of type checking and let the values pass through compile-time checks.

## [IsAny](./is_any.ts)

`IsAny<T, $O = { selection: 'predicate' | 'filter', $then: true, $else: false }>`

🎭 *predicate*

Validate if `T` is exactly `any`.

```ts
type R = IsAny<any> // true

type R = IsAny<never> // false
type R = IsAny<unknown> // false
type R = IsAny<string | boolean> // false
```

🔢 *customize*

Filter to ensure `T` is exactly `any`.

```ts
type R = IsAny<any, { selection: 'filter' }> // any

type R = IsAny<never, { selection: 'filter' }> // never
type R = IsAny<unknown, { selection: 'filter' }> // never
type R = IsAny<string | boolean, { selection: 'filter' }> // never
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsAny<any, $SelectionBranch> // $Then
type R = IsAny<string, $SelectionBranch> // $Else
```

### [IsNotAny](./is_not_any.ts)

`IsNotAny<T, $O = { selection: 'predicate' | 'filter', $then: true, $else: false }>`

🎭 *predicate*

Validate if `T` is not exactly `any`.

```ts
type R = IsNotAny<any> // false

type R = IsNotAny<never> // true
type R = IsNotAny<unknown> // true
type R = IsNotAny<string | boolean> // true
```

🔢 *customize*

Filter to ensure `T` is not exactly `any`.

```ts
type R = IsNotAny<any, { selection: 'filter' }> // never

type R = IsNotAny<never, { selection: 'filter' }> // never
type R = IsNotAny<unknown, { selection: 'filter' }> // unknown
type R = IsNotAny<string | boolean, { selection: 'filter' }> // string | boolean
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsNotAny<any, $SelectionBranch> // $Else
type R = IsNotAny<string, $SelectionBranch> // $Then
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
