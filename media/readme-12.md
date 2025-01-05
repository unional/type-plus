# symbol

`symbol` is a primitive type of `Symbol` in TypeScript.

## Type Checking

The `SymbolType<T>` and friends are used to check if a type is a `symbol` or not.

Note that when creating a `Symbol`, the type of the `Symbol` is `unique symbol` and not `symbol`.

There is no way to declare a `unique symbol` type in TypeScript, so `SymbolType` can only check if a type is `symbol` and treat `unique symbol` the same way.

```ts
import type { SymbolType } from 'type-plus'

type R = SymbolType<symbol> // symbol

const s = Symbol() // unique symbol
type R = SymbolType<typeof s> // unique symbol
type.equal<R, symbol>(true) // true

type R = SymbolType<1> // never
```

- [`SymbolType<T, Then = T, Else = never>`](symbol_type.ts#L16): check if `T` is `symbol`.
- [`IsSymbol<T, Then = true, Else = false`](symbol_type.ts#L35): is `T` `symbol`.
- [`NotSymbolType<T, Then = T, Else = never>`](symbol_type.ts#L50): check if `T` is not `symbol`.
- [`IsNotSymbol<T, Then = true, Else = false>`](symbol_type.ts#L65): is `T` not `symbol`.

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#symbol
