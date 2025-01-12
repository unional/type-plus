---
title: Options
description: Common options available to the types.
---

These are typical options available to the types and what do they mean.

## 🔀 Distributive

Distributive (🔀 twisted_rightwards_arrows) means each value in a union type will be evaluated separately in conditional types,
so both branches may be executed.

```ts
type R = IsUndefined<string | undefined> // true | false -> boolean
```

Typically, most types are distributive by default.

## 📌 Exact

Exact (📌 pushpin) means type comparison will be performed strictly, treating subtype as separate types.

```ts
type R1 = IsString<'a', { exact: true }> // false
```

## 🔱 Branching

Branching (🔱 trident) allows you to control the behavior of the types with [type branching](../api/type-branching.mdx).

```ts
type R = IsNever<Input, {
	$any: 1,
	$unknown: 2,
	$then: 3,
	$else: 4,
}>
```
