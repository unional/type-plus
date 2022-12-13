---
'type-plus': major
---

Deprecates `isConstructor`.
It cannot reliably detect non-constructors as normal functions and transpiled arrow functions are both returned true.

Add `isInstanceof()` to do `instanceof` check against `unknown` or union types of constructor and other types.

`isType()` does not accept `AnyConstructor` anymore. Use `isInstanceof()` instead (breaking).
