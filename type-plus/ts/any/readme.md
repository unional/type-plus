# Any

`any` is one of the two top types in TypeScript.
It is a supertype of all types.
It is a way to opt-out of type checking and let the values pass through compile-time checks.

## Type Checking

The `AnyType<T>` and friends are used to check if a type is `any` or not.

They are strict type checks, meaning they match only the type `any`.
Union and intersections are not a factor here they are resolved to `any`,
except `any & never` which is `never`.

- [`AnyType<T, Then = T, Else = never>`](any_type.ts#L15): check if `T` is exactly `any`.
- [`IsAny<T, Then = true, Else = false`](any_type.ts#L30): is `T` exactly `any`.
- [`NotAnyType<T, Then = T, Else = never>`](any_type.ts#L45): check if `T` is not exactly `any`.
- [`IsNotAny<T, Then = true, Else = false>`](any_type.ts#L60): is `T` not exactly `any`.

## Trivia

> Both `any` and `unknown` are top types?

Well, yeah:

```ts
type A = any extends unknown ? 1 : 2 // 1
type B = unknown extends any ? 1 : 2 // 1
```

> Aren't using `any` is bad?

If you use it to simply tell TypeScript to shut up because you are lazy, then yes.

But it is ok to use `any` in many cases, as the type system of TypeScript is not sounded.

There are many cases it is not possible to induce the type correctly.

## References

- [handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any
