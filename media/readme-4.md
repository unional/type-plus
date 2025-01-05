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
type R = IsBigint<1n, { selection: 'filter' }> // 1n

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

## References

- [mdn web docs: BigInt][mdn]

[mdn]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
