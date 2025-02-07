# Type-level Errors

This folder contains error types for type-level programming.

## [`$Error`](./error.ts)

🏷️ **since 8.0.0**

`$Error<M, V = unknown>` is a basic type-level error.
You can use this for some ad-hoc errors.

This is analogous to the `Error` class ~~in~~ JavaScript.

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

[failed-type]: https://img.youtube.com/vi/3pEXVe6KJO4/0.jpg
[failed-type-url]: https://www.youtube.com/live/3pEXVe6KJO4
