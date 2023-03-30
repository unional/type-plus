# Any

`any` is one of the two top type in TypeScript. It is the supertype of all types. It is a way to opt-out of type checking and let the values pass through compile-time checks.

## Type Checking

The `AnyType<T>` and friends are used to check if a type is `any` or not.

They are strict type checks, meaning they match only the type `any`.
Union and intersections are not a factor here they are resolved to `any`,
except `any & never` which is `never`.

- [`AnyType<T, Then = T, Else = never>`](any_type.ts#L15): check if `T` is exactly `any`.
- [`IsAny<T, Then = true, Else = false`](any_type.ts#L30): is `T` exactly `any`.
- [`NotAnyType<T, Then = T, Else = never>`](any_type.ts#L45): check if `T` is not exactly `any`.
- [`IsNotAny<T, Then = true, Else = false>`](any_type.ts#L60): is `T` not exactly `any`.

## Type Utilities

- [`IsAnyOrNever<T, Then = true, Else = false>`](any_or_never.ts#L17)]: is `T` type `any` or `never`.

## References

- [handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any
