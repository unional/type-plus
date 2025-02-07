# Special Types Handling

"Special types" in TypeScript are `any`, `unknown`, `never`, and `void`.
They serve as the top and bottom types of the type system,
and not corresponding to a specific type in JavaScript.

In type-level programming, in many cases we want to handle these types specially.

## [`$Special`](./special.ts)

🏷️ **since 8.0.0**

`$Special` is a type to handle special types in TypeScript.
