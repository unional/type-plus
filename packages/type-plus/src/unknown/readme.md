# `unknown`

`unknown` is one of the top types in TypeScript.
It is a "safer" variant of `any` that you cannot use the value until there are some type guards or type assertions to the value.

`unknown | T => unknown` except `unknown | any => any`.

`unknown & T => T`

## [`IsUnknown`](./is_unknown.ts)

```ts
IsUnknown<T, $Options = {
	selection: 'predicate' | 'filter' = 'predicate',
	$then: unknown = true,
	$else: unknown = false,
	$any: unknown,
	$never: unknown,
	$void: unknown
}>
```

🎭 **predicate**

Validate if `T` is exactly `unknown`.

```ts
type R = IsUnknown<unknown> // true
type R = IsUnknown<any> // false
type R = IsUnknown<never> // false
type R = IsUnknown<number> // false
```

🌪️ **filter**

Filter to ensure `T` is exactly `unknown`.

```ts
type R = IsUnknown<unknown, { selection: 'filter' }> // unknown
type R = IsUnknown<never, { selection: 'filter' }> // never
type R = IsUnknown<number, { selection: 'filter' }> // never
```

🔱 **branching**

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsUnknown<unknown, $Selection.Branch> // $Then
type R = IsUnknown<string, $Selection.Branch> // $Else
```

### [`IsNotUnknown`](./is_not_unknown.ts)

```ts
IsNotUnknown<T, $Options = {
	selection: 'predicate' | 'filter' = 'predicate',
	$then: unknown = true,
	$else: unknown = false,
	$any: unknown,
	$never: unknown,
	$void: unknown
}>
```

🎭 **predicate**

Validate if `T` is not exactly `unknown`.

```ts
type R = IsNotUnknown<unknown> // false

type R = IsNotUnknown<number> // true
type R = IsNotUnknown<never> // true
```

🌪️ **filter**

Filter to ensure `T` is not exactly `unknown`.

```ts
type R = IsNotUnknown<unknown, { selection: 'filter' }> // never

type R = IsNotUnknown<number, { selection: 'filter' }> // number
type R = IsNotUnknown<never, { selection: 'filter' }> // never
```

🔱 **branching**

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsNotUnknown<unknown, $Selection.Branch> // $Else
type R = IsNotUnknown<string, $Selection.Branch> // $Then
```

### [`NotUnknownOr`](./not_unknown_or.ts)

`NotUnknownOr<T, Else>`

🔄 **alias**

Alias of [`IsNotUnknown<T, { selection: 'filter', $else: Else }>`](./is_not_unknown.ts)

🌪️ **filter**

Returns `T` if `T` is not `unknown`, otherwise `$Unknown`.

```ts
type R = NotUnknownOr<number> // number
type R = NotUnknownOr<unknown> // $Unknown
```

Replace `unknown` branch with `Replace`.

```ts
type R = NotUnknownOr<unknown, number> // number
```

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown
