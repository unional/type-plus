---
title: Options
description: Common options available to the types.
---

These are typical options available to the types and what do they mean.

## 🎭 Predicate

> 🎭 :performing_arts:

Predicate is also known as *validate* or *logical*.
When the input satisfies the predicate, the type returns `true`. Otherwise, `false`.

It is one of the `$Selection` options (`selection: 'predicate'`).
Typically, it is the default option.

(other icons considered: ⭕)

## 🌪️ Filter

> 🌪️ :tornados:

Filter is a type or function that filters the input.
If the input passes the filter, it is returned unchanged. Otherwise, it returns `never`.

Filter is also known as *pares*, as in [Parse, don't validate][parse-dont-validate].

It is one of the `$Selection` options (`selection: 'filter'`).

The returned input can be narrowed if [🔀 distributive](#-distributive) is also enabled.
This means it is better to infer the return type instead of reusing the input type:

```ts
type IsUndefined<T> = T extends undefined ? T : never

// yes, these are silly, but just an example
type Bad<T> = IsUndefined<T> extends T ? T : never
type Good<T> = IsUndefined<T> extends infer R ? R : never

type R1 = Bad<undefined | number> // undefined | number
type R2 = Good<undefined | number> // undefined
```

(other icons considered: ↪️👉🚋⏩🐾🔑🚪💂🧲🙅‍♂️🪚)

## 🔀 Distributive

> 🔀 :twisted_rightwards_arrows:

Distributive means each value in a union type will be evaluated separately in conditional types,
so both branches may be executed.

```ts
type R = IsUndefined<string | undefined> // true | false -> boolean
```

Typically, most types are distributive by default.

## 📌 Exact

> 📌 :pushpin:

Exact means type comparison will be performed strictly, treating subtype as separate types.

```ts
type R1 = IsString<'a', { exact: true }> // false
```

## 🔱 Branching

> 🔱 :trident:

Branching allows you to control the behavior of the types with [type branching](../api/type-branching.mdx).

```ts
type R = IsNever<Input, {
	$any: 1,
	$unknown: 2,
	$then: 3,
	$else: 4,
}>
```

[parse-dont-validate]: https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/
