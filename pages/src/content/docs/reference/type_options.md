---
title: Options
description: A reference page in my new Starlight docs site.
---

# Type Options

These are typical options available ti the types and what do they mean.

## 🔀 Distributive

Distributive (🔀 twisted_rightwards_arrows) means each value in a union type will be evaluated separately in conditional types,
so both branches may be executed.

```ts
type R = IsUndefined<string | undefined> // true | false -> boolean
```

## 📌 Exact

Exact (📌 pushpin) means type comparison will be performed strictly, treating subtype as separate types.

```ts
type R1 = IsString<'a', { exact: true }> // false
```
