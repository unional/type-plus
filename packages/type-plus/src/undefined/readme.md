# undefined

`undefined` is one of the three primitive types in TypeScript to represent the absence of a value.

The other two are `null` and `void`.

## [`IsUndefined`](./is_undefined.ts)

🏷️ **since 8.0.0**

```ts
IsUndefined<T, {
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

🎭 *predicate*

Validate if `T` is `undefined`.

```ts
type R = IsUndefined<undefined> // true
type R = IsUndefined<never> // false
type R = IsUndefined<unknown> // false
type R = IsUndefined<string | boolean> // false
type R = IsUndefined<string | undefined> // boolean
```

🌪️ **filter**

Filter to ensure `T` is `undefined`, otherwise returns `never`.

```ts
type R = IsUndefined<undefined, { selection: 'filter' }> // undefined

type R = IsUndefined<never, { selection: 'filter' }> // never
type R = IsUndefined<unknown, { selection: 'filter' }> // never
type R = IsUndefined<string | boolean, { selection: 'filter' }> // never
type R = IsUndefined<string | undefined, { selection: 'filter' }> // undefined
```

🔀 **distributive**

Disable distribution of union types.

```ts
type R = IsUndefined<undefined | 1> // boolean
type R = IsUndefined<undefined | 1, { distributive: false }> // false
```

🔱 **branching**

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsUndefined<undefined, $SelectionBranch> // $Then
type R = IsUndefined<string, $SelectionBranch> // $Else

type R = IsUndefined<any, IsUndefined.Branch> // $Any
type R = IsUndefined<unknown, IsUndefined.Branch> // $Unknown
type R = IsUndefined<never, IsUndefined.Branch> // $Never
type R = IsUndefined<void, IsUndefined.Branch> // $Void
```

## [`IsNotUndefined`](./is_not_undefined.ts)

🏷️ **since 8.0.0**

```ts
IsNotUndefined<T, {
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

🎭 *predicate*

Validate if `T` is not `undefined`.

```ts
type R = IsNotUndefined<undefined> // false
type R = IsNotUndefined<never> // true
type R = IsNotUndefined<unknown> // true
type R = IsNotUndefined<string | boolean> // true
type R = IsNotUndefined<string | undefined> // boolean
```

🌪️ **filter**

Filter to ensure `T` is not `undefined`, otherwise returns `never`.

```ts
type R = IsNotUndefined<undefined, { selection: 'filter' }> // never

type R = IsNotUndefined<never, { selection: 'filter' }> // never
type R = IsNotUndefined<unknown, { selection: 'filter' }> // unknown
type R = IsNotUndefined<string | boolean, { selection: 'filter' }> // string | boolean
```

🔀 **distributive**

Disable distribution of union types.

```ts
type R = IsNotUndefined<undefined | 1> // boolean
type R = IsNotUndefined<undefined | 1, { distributive: false }> // true
```

🔱 **branching**

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsNotUndefined<string, $Selection.Branch> // $Then
type R = IsNotUndefined<undefined, $Selection.Branch> // $Else

type R = IsNotUndefined<any, IsNotUndefined.Branch> // $Any
type R = IsNotUndefined<unknown, IsNotUndefined.Branch> // $Unknown
type R = IsNotUndefined<never, IsNotUndefined.Branch> // $Never
type R = IsNotUndefined<void, IsNotUndefined.Branch> // $Void
```

## [`HasUndefined`](./has_undefined.ts)

🏷️ **since 8.0.0**

```ts
HasUndefined<T, {
	selection: 'predicate' | 'filter',
	$then: unknown = true,
	$else: unknown = false,
}>
```

🎭 **predicate**

Validate if `T` is `undefined` or a union with `undefined`.

```ts
type R = HasUndefined<undefined> // true
type R = HasUndefined<undefined | 1> // true

type R = HasUndefined<number> // false
```

🌪️ **filter**

Filter to ensure `T` is `undefined` or an union with `undefined`, otherwise returns `never`.

```ts
type R = HasUndefined<undefined> // undefined
type R = HasUndefined<undefined | 1> // undefined | 1

type R = HasUndefined<number> // never
```

🔱 **branching**

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = HasUndefined<undefined, $Selection.Branch> // $Then
type R = HasUndefined<string, $Selection.Branch> // $Else
```

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-undefined
