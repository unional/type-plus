---
"type-plus": patch
---

Use `fn.apply` instead of spread.
It has better performance and function that are already bound continue to work as expected.

```ts
const bindFn = fn.bind(This)

bindFn.apply(null, args) // `this` is not affected
```
