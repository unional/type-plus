# Type-level programming

This folder contains utility types for type-level programming.

These utility types are not meant to be used directly.
They are primarily used to build custom types.

Most of these types are named with a `$` prefix to distinguish them from regular types.

## [`$Type`](./$type.ts)

🏷️ **since 8.0.0**

`$Type` is a branded type to define unique types for type-level programming.

It supports all primitive types and object types.

When using object types, the type intersect with the specified type to give easy access to its properties.

Internally, it uses the properties `_$type` and `_$value` to store the type and value.
The type you provide should avoid specifying these properties.

If needed, use `$O: { bare: true }` to avoid the intersection.

## [`$Error`](./error.ts)

🏷️ **since 8.0.0**

`$Error<M, V = unknown>` is a basic type-level error.
You can use this for some ad-hoc errors.

This is analogous to the `Error` class in JavaScript.

```ts
type YourComplexType<A, B, C> = A extends B ?
  ... // and many more hard work later...
  : $Error<'you are doing something wrong!'>

type YourComplexType<A, B, C> = A extends B ?
  ... // and many more hard work later...
  : $Error<'you are doing something wrong!', C>
```

## [`$InferError`](./infer_error.ts)

🏷️ **since 8.0.0**

`$InferError<T>` is an error for unexpected failure when inferring type.

In your type,
you can use `T extends infer U extends V` to specify the type of the inferred type `U`.

But doing so means you have to do an extra conditional type.

This type can be use in the else case to indicate unexpected failure to infer the type.

```ts
type F<T> = T extends infer U extends V
  ? ...your type logic...
  : InferError<'some message', T>
```

## [`Failed`](./failed.ts)

💀 **deprecated 8.0.0**: use `$Error` instead.

`Failed<Msg>` is a type to describe a failure.

Use the same concept to create your own failure types.

```ts
type YourComplexType<A,B,C> = A extends B ?
  ... // and many more hard work later...
  : Failed<'you are doing something wrong!'>
```

[![Just Code: I failed][failed-type]][failed-type-url]

## [`NoInfer`](./utils/no_infer.ts)

💀 **deprecated 8.0.0**: use the built-in `NoInfer` from TypeScript 5.4 instead.

`NoInfer<T>` is a type to prevent type inference.

```ts
import { type NoInfer } from 'type-plus'

 function assertEqual<T>(a: T, b: NoInfer<T>) {
   return a === b
 }

 function stub<T>(v: RecursivePartial<NoInfer<T>>): T { return v }
```

[failed-type]: https://img.youtube.com/vi/3pEXVe6KJO4/0.jpg
[failed-type-url]: https://www.youtube.com/live/3pEXVe6KJO4
