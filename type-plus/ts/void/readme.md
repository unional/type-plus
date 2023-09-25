# void

`void` is a type that represents the absence of type information.
It is typically used as the return type of a function that does not explicitly return a value.

## [IsVoid](./is_void.ts)

`IsVoid<T, { distributive: true, selection: 'predicate' | 'filter' | 'filter-unknown', $then: true, $else: false }>`

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

🔢 *customize*

Filter to ensure `T` is `void`, otherwise returns `unknown`.

```ts
type R = IsVoid<string | boolean, { selection: 'filter-unknown' }> // unknown
type R = IsVoid<string | void, { selection: 'filter-unknown' }> // unknown
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

`IsNotVoid<T, { distributive: true, selection: 'predicate' | 'filter' | 'filter-unknown', $then: true, $else: false }>`

🎭 *predicate*

Validate if `T` is not `undefined`.

```ts
type R = IsNotUndefined<undefined> // false

type R = IsNotUndefined<never> // true
type R = IsNotUndefined<unknown> // true
type R = IsNotUndefined<string | boolean> // true
```

🔢 *customize*

Filter to ensure `T` is not `undefined`, otherwise returns `never`.

```ts
type R = IsNotUndefined<undefined, { selection: 'filter' }> // never

type R = IsNotUndefined<never, { selection: 'filter' }> // never
type R = IsNotUndefined<unknown, { selection: 'filter' }> // unknown
type R = IsNotUndefined<string | boolean, { selection: 'filter' }> // string | boolean
```

🔢 *customize*

Filter to ensure `T` is not `undefined`, otherwise returns `unknown`.

```ts
type R = IsNotUndefined<string | boolean, { selection: 'filter-unknown' }> // string | boolean
type R = IsNotUndefined<string | undefined, { selection: 'filter-unknown' }> // unknown
```

🔢 *customize*

Disable distribution of union types.

```ts
type R = IsNotUndefined<undefined | 1> // boolean
type R = IsNotUndefined<undefined | 1, { distributive: false }> // true
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsNotUndefined<string, $SelectionBranch> // $Then
type R = IsNotUndefined<undefined, $SelectionBranch> // $Else
```

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/functions.html#void
