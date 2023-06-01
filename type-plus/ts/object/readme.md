# object

## Type Checking

The `ObjectType<T>` and friends are used to check if a type is `object` or object types.

Note that `Function` are also considered `object` in TypeScript.

```ts
import type { ObjectType } from 'type-plus'

type R = ObjectType<object> // object
type R = ObjectType<{}> // {}
type R = ObjectType<{ a: number }> // { a: number }

type R = ObjectType<1> // never
```

- [`ObjectType<T, Then = T, Else = never>`](object_type.ts#L16): check if `T` is `object`.
- [`IsObject<T, Then = true, Else = false`](object_type.ts#L33): is `T` `object`.
- [`NotObjectType<T, Then = T, Else = never>`](object_type.ts#L48): check if `T` is not `object`.
- [`IsNotObject<T, Then = true, Else = false>`](object_type.ts#L65): is `T` not `object`.

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#object-types
