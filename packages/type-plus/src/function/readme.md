# Function

`Function` is a type to represent functions.

## Type Checking

The `FunctionType<T>` and friends are used to check if a type is `Function` or not.

They are loose type checks, meaning they match `Function` and function signatures,
function overloads, as well as intersection types.

```ts
import type { FunctionType } from 'type-plus'

type R = FunctionType<Function> // Function
type R = FunctionType<() => void> // () => void
type R = FunctionType<(() => void) | { a: 1 }> // (() => void) | { a: 1 }

type R = FunctionType<{ a: 1 }> // never
type R = FunctionType<never> // never
type R = FunctionType<unknown> // never
```

- [`FunctionType<T, Then = T, Else = never>`](function_type.ts#L18): check if `T` is `Function` or Function literal.
- [`IsFunction<T, Then = true, Else = false`](function_type.ts#L39): is `T` `Function`.
- [`NotFunctionType<T, Then = T, Else = never>`](function_type.ts#L56): check if `T` is not `Function`.
- [`IsNotFunction<T, Then = true, Else = false>`](function_type.ts#L72): is `T` not `Function`.

---

The `StrictFunctionType<T>` and friends are used to check if a type is exactly `Function` or not.

They are strict type checks, meaning they match only the type `Function` only.

```ts
import type { StrictFunctionType } from 'type-plus'

 * type R = StrictFunctionType<Function> // Function
 *
 * type R = StrictFunctionType<() => void> // never
 * type R = StrictFunctionType<Function & { a: 1 }> // never
```

- [`StrictFunctionType<T, Then = T, Else = never>`](strict_function_type.ts#L15): check if `T` is exactly `Function`.
- [`IsStrictFunction<T, Then = true, Else = false`](strict_function_type.ts#L33): is `T` exactly `Function`.
- [`NotStrictFunctionType<T, Then = T, Else = never>`](strict_function_type.ts#L47): check if `T` is not exactly `Function`.
- [`IsNotStrictFunction<T, Then = true, Else = false>`](strict_function_type.ts#L61): is `T` not exactly `Function`.

---

`AnyFunction` is a type to represent any function.

You can also use it to build specific signatures.

```ts
import type { AnyFunction } from 'type-plus'

type R = AnyFunction // (...args: any[]) => any
type R = AnyFunction<[a: string, b: number], boolean> // (a: string, b: number) => boolean
```

---

`ExtractFunction<T>` extracts the function type from a type.
Note that it does not work with function overloads.

```ts
import type { ExtractFunction } from 'type-plus'

type R = ExtractFunction<{
  () => void
  a: 1
}> // () => void
```

---

`extractFunction` is the function form of `ExtractFunction<T>`.

## References

- [mdn web docs: BigInt][mdn]

[mdn]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
