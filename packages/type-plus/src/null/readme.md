# `null`

`null` is one of the three primitive values in TypeScript to represent the absence of a value.

Most of the time it is used when working with objects from JSON.

The other two are `undefined` and `void`.

## [`IsNull`](./is_null.ts)

🏷️ **since 8.0.0**

```ts
IsNull<T, {
	distributive: true,
	selection: 'predicate' | 'filter',
	$then: unknown = true,
	$else: unknown = false,
	$any: unknown,
	$unknown: unknown,
	$never: unknown,
	$void: unknown,
}>
```

🎭 **predicate**

Validate if `T` is `null`.

```ts
type R = IsNull<null> // true

type R = IsNull<never> // false
type R = IsNull<unknown> // false
type R = IsNull<string | boolean> // false
type R = IsNull<string | null> // boolean
```

🌪️ **filter**

Filter to ensure `T` is `null`, otherwise returns `never`.

```ts
type R = IsNull<null, { selection: 'filter' }> // null

type R = IsNull<never, { selection: 'filter' }> // never
type R = IsNull<unknown, { selection: 'filter' }> // never
type R = IsNull<string | boolean, { selection: 'filter' }> // never
type R = IsNull<string | null, { selection: 'filter' }> // null
```

🔀 **distributive**

Disable distribution of union types.

```ts
type R = IsNull<null | 1> // boolean
type R = IsNull<null | 1, { distributive: false }> // false
```

🔱 **branching**

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsNull<null, IsNull.Branch> // $Then
type R = IsNull<string, IsNull.Branch> // $Else
type R = IsNull<any, IsNull.Branch> // $Any
type R = IsNull<unknown, IsNull.Branch> // $Unknown
type R = IsNull<never, IsNull.Branch> // $Never
type R = IsNull<void, IsNull.Branch> // $Void
```

## [`IsNotnull`](./is_not_null.ts)

🏷️ **since 8.0.0**

```ts
IsNotnull<T, {
	distributive: true,
	selection: 'predicate' | 'filter',
	$then: unknown = true,
	$else: unknown = false,
	$any: unknown,
	$unknown: unknown,
	$never: unknown,
	$void: unknown,
}>
```

🎭 **predicate**

Validate if `T` is not `null`.

```ts
type R = IsNotnull<null> // false
type R = IsNotnull<never> // true
type R = IsNotnull<unknown> // true
type R = IsNotnull<string | boolean> // true
type R = IsNotnull<string | null> // boolean
```

🌪️ **filter**

Filter to ensure `T` is not `null`, otherwise returns `never`.

```ts
type R = IsNotnull<null, { selection: 'filter' }> // never

type R = IsNotnull<never, { selection: 'filter' }> // never
type R = IsNotnull<unknown, { selection: 'filter' }> // unknown
type R = IsNotnull<string | boolean, { selection: 'filter' }> // string | boolean
type R = IsNotnull<string | null, { selection: 'filter' }> // string
```

🔀 **distributive**

Disable distribution of union types.

```ts
type R = IsNotnull<null | 1> // boolean
type R = IsNotnull<null | 1, { distributive: false }> // true
```

🔱 **branching**

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsNotnull<string, IsNotnull.Branch> // $Then
type R = IsNotnull<null, IsNotnull.Branch> // $Else

type R = IsNotnull<any, IsNotnull.Branch> // $Any
type R = IsNotnull<unknown, IsNotnull.Branch> // $Unknown
type R = IsNotnull<never, IsNotnull.Branch> // $Never
type R = IsNotnull<void, IsNotnull.Branch> // $Void
```

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-null
