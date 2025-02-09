# `void`

`void` is a type that represents the absence of type information.
It is typically used as the return type of function that does not explicitly return a value.

## [`IsVoid`](./is_void.ts)

```ts
IsVoid<T, {
	distributive: boolean = true,
	selection: 'predicate' | 'filter' = 'predicate',
	$then: unknown = true,
	$else: unknown = false,
	$any: unknown,
	$unknown: unknown,
	$never: unknown,
}>
```

🎭 **predicate**

Validate if `T` is `void`.

```ts
type R = IsVoid<void> // true

type R = IsVoid<never> // false
type R = IsVoid<unknown> // false
type R = IsVoid<undefined> // false
type R = IsVoid<string | boolean> // false
type R = IsVoid<string | void> // boolean
```

🌪️ **filter**

Filter to ensure `T` is `void`, otherwise returns `never`.

```ts
type R = IsVoid<void, { selection: 'filter' }> // void

type R = IsVoid<never, { selection: 'filter' }> // never
type R = IsVoid<unknown, { selection: 'filter' }> // never
type R = IsVoid<string | boolean, { selection: 'filter' }> // never
type R = IsVoid<string | void, { selection: 'filter' }> // void
```

🔀 **distributive**

Disable distribution of union types.

```ts
type R = IsVoid<void | 1> // boolean
type R = IsVoid<void | 1, { distributive: false }> // false
```

🔱 **branching**

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsVoid<void, $Selection.Branch> // $Then
type R = IsVoid<string, $Selection.Branch> // $Else
type R = IsVoid<any, IsVoid.Branch> // $Any
type R = IsVoid<unknown, IsVoid.Branch> // $Unknown
type R = IsVoid<never, IsVoid.Branch> // $Never
```

## [`IsNotVoid`](./is_not_void.ts)

```ts
IsNotVoid<T, {
	distributive: boolean = true,
	selection: 'predicate' | 'filter' = 'predicate',
	$then: unknown = true,
	$else: unknown = false,
	$any: unknown,
	$unknown: unknown,
	$never: unknown
}>
```

🎭 **predicate**

Validate if `T` is not `void`.

```ts
type R = IsNotVoid<void> // false

type R = IsNotVoid<never> // true
type R = IsNotVoid<unknown> // true
type R = IsNotVoid<string | boolean> // true

type R = IsNotVoid<string | void> // boolean
```

🌪️ **filter**

Filter to ensure `T` is not `void`, otherwise returns `never`.

```ts
type R = IsNotVoid<void, { selection: 'filter' }> // never

type R = IsNotVoid<never, { selection: 'filter' }> // never
type R = IsNotVoid<unknown, { selection: 'filter' }> // unknown
type R = IsNotVoid<string | void, { selection: 'filter' }> // string
```

🔀 **distributive**

Disable distribution of union types.

```ts
type R = IsNotVoid<void | string> // boolean
type R = IsNotVoid<void | string, { distributive: false }> // true
```

🔱 **branching**

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsNotVoid<void, $Selection.Branch> // $Else
type R = IsNotVoid<string, $Selection.Branch> // $Then
```

## [`IsVoid.$`](./is_void.ts)

Type-level utility for `IsVoid`.
It does not check for special types like `any`, `unknown`, and `never`.

```ts
type R = IsVoid.$<void> // true
type R = IsVoid.$<undefined> // false
type R = IsVoid.$<string | void> // boolean
```

## [`IsNotVoid.$`](./is_not_void.ts)

Type-level utility for `IsNotVoid`.
It does not check for special types like `any`, `unknown`, and `never`.

```ts
type R = IsNotVoid.$<void> // false
type R = IsNotVoid.$<undefined> // true
type R = IsNotVoid.$<string | void> // boolean
```

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/functions.html#void
