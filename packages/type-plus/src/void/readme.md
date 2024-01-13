# void

`void` is a type that represents the absence of type information.
It is typically used as the return type of a function that does not explicitly return a value.

## [IsVoid](./is_void.ts)

`IsVoid<T, { distributive: true, selection: 'predicate' | 'filter', $then: true, $else: false }>`

🎭 *predicate*

Validate if `T` is `void`.

```ts
type R = IsVoid<void> // true

type R = IsVoid<never> // false
type R = IsVoid<unknown> // false
type R = IsVoid<string | boolean> // false

type R = IsVoid<string | void> // boolean
```

🔢 *customize*

Filter to ensure `T` is `void`, otherwise returns `never`.

```ts
type R = IsVoid<void, { selection: 'filter' }> // void

type R = IsVoid<never, { selection: 'filter' }> // never
type R = IsVoid<unknown, { selection: 'filter' }> // never
type R = IsVoid<string | boolean, { selection: 'filter' }> // never

type R = IsVoid<string | void> // void
```

🔢 *customize*:

Disable distribution of union types.

```ts
type R = IsVoid<void | 1> // boolean
type R = IsVoid<void | 1, { distributive: false }> // false
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsVoid<void, $SelectionBranch> // $Then
type R = IsVoid<string, $SelectionBranch> // $Else
```

## [IsNotVoid](./is_not_void.ts)

`IsNotVoid<T, { distributive: true, selection: 'predicate' | 'filter', $then: true, $else: false }>`

🎭 *predicate*

Validate if `T` is not `void`.

```ts
type R = IsNotVoid<void> // false

type R = IsNotVoid<never> // true
type R = IsNotVoid<unknown> // true
type R = IsNotVoid<string | boolean> // true

type R = IsNotVoid<string | void> // boolean
```

🔢 *customize*

Filter to ensure `T` is not `void`, otherwise returns `never`.

```ts
type R = IsNotVoid<void, { selection: 'filter' }> // never

type R = IsNotVoid<never, { selection: 'filter' }> // never
type R = IsNotVoid<unknown, { selection: 'filter' }> // unknown
type R = IsNotVoid<string | void, { selection: 'filter' }> // string
```

🔢 *customize*:

Disable distribution of union types.

```ts
type R = IsNotVoid<void | string> // boolean
type R = IsNotVoid<void | string, { distributive: false }> // true
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsNotVoid<void, $SelectionBranch> // $Else
type R = IsNotVoid<string, $SelectionBranch> // $Then
```

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/functions.html#void
