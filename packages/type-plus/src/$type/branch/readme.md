# Type-level branching

This folder contains utility types related to type-level branching.

Type-level branching is a core mechanism in [`type-plus`](../../../readme.md) for type-level programming.

In essence, type-level branching is a way to separate the type-level logic based on some conditions.

There are a few elements to make branching work:

## Branch Options

To participate in branching, a type should accept a `$O` option.

The option would accept a branch property, typically with `unknown` as the type.
The branch property it accustomed to be named `$<key>`.
Its key can also be referred to as branch identifier,
but typically we would just call it by name.

Here we use [`IsAny`](../../any/is_any.ts) as an example:

```ts
type IsAny<T, $O extends {
	$unknown?: unknown
	$never?: unknown
	$then?: unknown
	$else?: unknown
 }> = ...
```

Note that the actual definition of `IsAny` looks different, but the idea is the same.

The property keys `$unknown`, `$never`, `$then`, and `$else` are branch identifiers.
They come from individual options: `$Unknown.$Options`, `$Never.$Options`, `$SelectionOptions`.

When you implement your type with branching support,
you can use these branch options and compose them.

## Branch Selectors

Branch selectors are used to select a branch during resolution.
There are a few branch selectors provided in [`type-plus`](../../../readme.md): `$Any`, `$Unknown`, `$Never`, `$Void`, `$Then`, and `$Else`.

They are primarily used with `$ResolveBranch` inside the type.

```ts
export type SomeType<T, $O extends $SelectionOptions> = ...
	? $ResolveBranch<$O, [$Then], T>
	: $ResolveBranch<$O, [$Else]>
```

## Branching Types

There are a few branching provided in [`type-plus`](../../../readme.md).

### Selection Branching

The most common branching is `$Selection`, referring to "selection" in the 3 fundamental building blocks of structured programming: sequence, selection, and iteration.

Using `IsAny` as an example, we can see how branching works:

```ts
type R = IsAny<any, { $then: 1, $else: 2 }> // 1
type R = IsAny<number, { $then: 1, $else: 2 }> // 2
```

### Special Types Branching

Special types in TypeScript are: `any`, `unknown`, `never`, and `void`.

Besides selection branching, many types in [`type-plus`](../../../readme.md) provide specific branching for special types in TypeScript.

Using `IsAny` as an example again:

```ts
type R = IsAny<unknown, { $unknown: 'u', $then: 1, $else: 2 }> // u
type R = IsAny<never, { $never: 'n', $then: 1, $else: 2 }> // n
```
