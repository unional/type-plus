# number

## [IsNumber](./is_number.ts)

`IsNumber<T, { distributive: true, selection: 'predicate' | 'filter', $then: true, $else: false }>`

🎭 *predicate*

Validate if `T` is `number` or `number` literals.

```ts
type R = IsNumber<number> // true
type R = IsNumber<1> // true

type R = IsNumber<never> // false
type R = IsNumber<unknown> // false
type R = IsNumber<string | boolean> // false

type R = IsNumber<string | number> // boolean
```

🔢 *customize*

Filter to ensure `T` is `number` or `number` literals, otherwise returns `never`.

```ts
type R = IsNumber<number, { selection: 'filter' }> // number
type R = IsNumber<1, { selection: 'filter' }> // 1

type R = IsNumber<never, { selection: 'filter' }> // never
type R = IsNumber<unknown, { selection: 'filter' }> // never
type R = IsNumber<string | boolean, { selection: 'filter' }> // never

type R = IsNumber<string | number> // number
```

🔢 *customize*:

Disable distribution of union types.

```ts
type R = IsNumber<number | 1> // boolean
type R = IsNumber<number | 1, { distributive: false }> // false
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsNumber<number, $SelectionBranch> // $Then
type R = IsNumber<string, $SelectionBranch> // $Else
```

## [IsNotNumber](./is_not_number.ts)

`IsNotNumber<T, { distributive: true, selection: 'predicate' | 'filter', $then: false, $else: true }>`

🎭 *predicate*

Validate if `T` is not `number` nor `number` literals.

```ts
type R = IsNotNumber<number> // false
type R = IsNotNumber<1> // false

type R = IsNotNumber<never> // true
type R = IsNotNumber<unknown> // true
type R = IsNotNumber<string | number> // boolean
```

🔢 *customize*

Filter to ensure `T` is not `number` nor `number` literals, otherwise returns `never`.

```ts
type R = IsNotNumber<number, { selection: 'filter' }> // never
type R = IsNotNumber<1, { selection: 'filter' }> // never

type R = IsNotNumber<never, { selection: 'filter' }> // never
type R = IsNotNumber<unknown, { selection: 'filter' }> // unknown
type R = IsNotNumber<string | 1, { selection: 'filter' }> // string
```

🔢 *customize*

Disable distribution of union types.

```ts
type R = IsNotNumber<number | 1> // boolean
type R = IsNotNumber<number | 1, { distributive: false }> // true
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsNotNumber<string, $SelectionBranch> // $Then
type R = IsNotNumber<number, $SelectionBranch> // $Else
```

## [IsStrictNumber](./is_strict_number.ts)

`IsStrictNumber<T, { distributive: true, selection: 'predicate' | 'filter', $then: true, $else: false }>`

🎭 *predicate*

Validate if `T` is `number`, returns false for number literals or other types.

```ts
type R = IsStrictNumber<number> // true

type R = IsStrictNumber<1> // false
type R = IsStrictNumber<never> // false
type R = IsStrictNumber<unknown> // false
type R = IsStrictNumber<string | boolean> // false

type R = IsStrictNumber<string | number> // boolean
```

🔢 *customize*

Filter to ensure `T` is `number`, returns `never` for number literals or other types.

```ts
type R = IsStrictNumber<number, { selection: 'filter' }> // number

type R = IsStrictNumber<1, { selection: 'filter' }> // never
type R = IsStrictNumber<never, { selection: 'filter' }> // never
type R = IsStrictNumber<unknown, { selection: 'filter' }> // never
type R = IsStrictNumber<string | boolean, { selection: 'filter' }> // never

type R = IsStrictNumber<string | number> // number
```

🔢 *customize*:

Disable distribution of union types.

```ts
type R = IsStrictNumber<number | string> // boolean
type R = IsStrictNumber<number | string, { distributive: false }> // false
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsStrictNumber<number, $SelectionBranch> // $Then
type R = IsStrictNumber<string, $SelectionBranch> // $Else
```

## [IsNotStrictNumber](./is_not_strict_number.ts)

`IsNotStrictNumber<T, { distributive: true, selection: 'predicate' | 'filter', $then: false, $else: true }>`

🎭 *predicate*

Validate if `T` is not `number`, returns false for number literals or other types.

```ts
type R = IsNotStrictNumber<number> // false
type R = IsNotStrictNumber<1> // false

type R = IsNotStrictNumber<never> // true
type R = IsNotStrictNumber<unknown> // true
type R = IsNotStrictNumber<string | boolean> // true
```

🔢 *customize*

Filter to ensure `T` is not `number`, returns `never` for number literals or other types.


🎭 *predicate*

Validate if `T` is not strictly `number`, returns true for number literals or other types.

```ts
type R = IsNotStrictNumber<number> // false
type R = IsNotStrictNumber<1> // true

type R = IsNotStrictNumber<never> // true
type R = IsNotStrictNumber<unknown> // true
type R = IsNotStrictNumber<string | boolean> // true
```

🔢 *customize*

Filter to ensure `T` is not strictly `number`, returns `T` for number literals or other types.

```ts
type R = IsNotStrictNumber<number, { selection: 'filter' }> // never
type R = IsNotStrictNumber<1, { selection: 'filter' }> // 1

type R = IsNotStrictNumber<never, { selection: 'filter' }> // never
type R = IsNotStrictNumber<unknown, { selection: 'filter' }> // unknown
type R = IsNotStrictNumber<string | boolean, { selection: 'filter' }> // string | boolean
```

🔢 *customize*

Disable distribution of union types.

```ts
type R = IsNotStrictNumber<number | string> // boolean
type R = IsNotStrictNumber<number | string, { distributive: false }> // true
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsNotStrictNumber<string, $SelectionBranch> // $Then
type R = IsNotStrictNumber<number, $SelectionBranch> // $Else
```

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean
