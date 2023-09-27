# bigint

`bigint` is a type to represent integers that are too large to be represented by a `number`.

## [IsBigint](./is_bigint.ts)

`IsBigint<T, { distributive: true, selection: 'predicate' | 'filter', $then: true, $else: false }>`

🎭 *predicate*

Validate if `T` is `bigint` or `bigint` literals.

```ts
type R = IsBigint<bigint> // true
type R = IsBigint<1n> // true

type R = IsBigint<never> // false
type R = IsBigint<unknown> // false
type R = IsBigint<string | boolean> // false

type R = IsBigint<string | bigint> // boolean
```

🔢 *customize*

Filter to ensure `T` is `bigint` or `bigint` literals, otherwise returns `never`.

```ts
type R = IsBigint<bigint, { selection: 'filter' }> // bigint
type R = IsBigint<1n, { selection: 'filter' }> // bigint

type R = IsBigint<never, { selection: 'filter' }> // never
type R = IsBigint<unknown, { selection: 'filter' }> // never
type R = IsBigint<string | boolean, { selection: 'filter' }> // never

type R = IsBigint<string | bigint> // bigint
```

🔢 *customize*:

Disable distribution of union types.

```ts
type R = IsBigint<bigint | 1> // boolean
type R = IsBigint<bigint | 1, { distributive: false }> // false
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsBigint<bigint, $SelectionBranch> // $Then
type R = IsBigint<string, $SelectionBranch> // $Else
```

## [IsNotBigint](./is_not_bigint.ts)

`IsNotBigint<T, { distributive: true, selection: 'predicate' | 'filter', $then: false, $else: true }>`

🎭 *predicate*

Validate if `T` is not `bigint` nor `bigint` literals.

```ts
type R = IsNotBigint<bigint> // false
type R = IsNotBigint<1n> // false

type R = IsNotBigint<never> // true
type R = IsNotBigint<unknown> // true
type R = IsNotBigint<string | boolean> // true
```

🔢 *customize*

Filter to ensure `T` is not `bigint` nor `bigint` literals, otherwise returns `never`.

```ts
type R = IsNotBigint<bigint, { selection: 'filter' }> // never
type R = IsNotBigint<1n, { selection: 'filter' }> // never

type R = IsNotBigint<never, { selection: 'filter' }> // never
type R = IsNotBigint<unknown, { selection: 'filter' }> // unknown
type R = IsNotBigint<string | boolean, { selection: 'filter' }> // string | boolean
```

🔢 *customize*

Disable distribution of union types.

```ts
type R = IsNotBigint<bigint | 1> // boolean
type R = IsNotBigint<bigint | 1, { distributive: false }> // true
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsNotBigint<string, $SelectionBranch> // $Then
type R = IsNotBigint<bigint, $SelectionBranch> // $Else
```

## [IsStrictBigint](./is_strict_bigint.ts)

`IsStrictBigint<T, { distributive: true, selection: 'predicate' | 'filter', $then: true, $else: false }>`

🎭 *predicate*

Validate if `T` is `bigint`, excluding bigint literal.

```ts
type R = IsStrictBigint<bigint> // true

type R = IsStrictBigint<1n> // false
type R = IsStrictBigint<never> // false
type R = IsStrictBigint<unknown> // false
type R = IsStrictBigint<string | boolean> // false

type R = IsStrictBigint<string | bigint> // boolean
```

🔢 *customize*

Filter to ensure `T` is `bigint`, excluding bigint literal, otherwise returns `never`.

```ts
type R = IsStrictBigint<bigint, { selection: 'filter' }> // bigint

type R = IsStrictBigint<1n, { selection: 'filter' }> // never
type R = IsStrictBigint<never, { selection: 'filter' }> // never
type R = IsStrictBigint<unknown, { selection: 'filter' }> // never
type R = IsStrictBigint<string | boolean, { selection: 'filter' }> // never

type R = IsStrictBigint<string | bigint> // bigint
```

🔢 *customize*:

Disable distribution of union types.

```ts
type R = IsStrictBigint<bigint | 1> // boolean
type R = IsStrictBigint<bigint | 1, { distributive: false }> // false
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsStrictBigint<bigint, $SelectionBranch> // $Then
type R = IsStrictBigint<string, $SelectionBranch> // $Else
```

## [IsNotStrictBigint](./is_not_strict_bigint.ts)

`IsNotStrictBigint<T, { distributive: true, selection: 'predicate' | 'filter', $then: true, $else: false }>`

/**
🎭 *predicate*

Validate if `T` is not strictly `bigint`, but accept `bigint` literal.

```ts
type R = IsNotStrictBigint<bigint> // false
type R = IsNotStrictBigint<1n> // true

type R = IsNotStrictBigint<never> // true
type R = IsNotStrictBigint<unknown> // true
type R = IsNotStrictBigint<string | boolean> // true
```

🔢 *customize*

Filter to ensure `T` is not strictly `bigint`, but accept `bigint` literal, otherwise returns `never`.

```ts
type R = IsNotStrictBigint<bigint, { selection: 'filter' }> // never
type R = IsNotStrictBigint<1n, { selection: 'filter' }> // 1n

type R = IsNotStrictBigint<never, { selection: 'filter' }> // never
type R = IsNotStrictBigint<unknown, { selection: 'filter' }> // unknown
type R = IsNotStrictBigint<string | boolean, { selection: 'filter' }> // string | boolean
```

🔢 *customize*

Disable distribution of union types.

```ts
type R = IsNotStrictBigint<bigint | 1> // boolean
type R = IsNotStrictBigint<bigint | 1, { distributive: false }> // true
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsNotStrictBigint<string, $SelectionBranch> // $Then
type R = IsNotStrictBigint<bigint, $SelectionBranch> // $Else
```

## References

- [mdn web docs: BigInt][mdn]

[mdn]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
