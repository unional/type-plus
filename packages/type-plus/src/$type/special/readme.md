# Special Types Handling

"Special types" in TypeScript are `any`, `unknown`, `never`, and `void`.
They serve as the top and bottom types of the type system,
and not corresponding to a specific type in JavaScript.

In type-level programming, in many cases we want to handle these types specially.

## [`$Special`](./$special.ts)

🏷️ **since 8.0.0**

`$Special` is a type to handle special types in TypeScript.

🎭 **predicate**
By default, it acts as a predicate type:

```ts
type A = $Special<any> // true
type A = $Special<unknown> // true
type A = $Special<never> // true
type A = $Special<void> // true
type A = $Special<number> // false
```

🔢 **customize**

`$Special` can be used as a `filter`:

```ts
type A = $Special<any, { selection: 'filter' }> // any
type A = $Special<unknown, { selection: 'filter' }> // unknown
type A = $Special<never, { selection: 'filter' }> // never
type A = $Special<void, { selection: 'filter' }> // void
type A = $Special<number, { selection: 'filter' }> // never
```

🔱 **branching**

Most of the time, `$Special` is used with branching to handle special types.

```ts
type A<T> = $Special<T, {
	$any: ...,
	$unknown: ...,
	$never: ...,
	$void: ...,
	$then: ...,
	$else: ...,
}>
```
