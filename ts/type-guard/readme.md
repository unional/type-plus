# Type Guard

[User-defined type guard functions][type_guard] is a function which its return type is specified as `x as T`.

It is introduced in TypeScript 1.6.

For example:

```ts
function isBool(x: unknown): x is boolean {
  return typeof x === 'boolean';
}
```

## isType

> `isType<T>(subject: T): subject is T`

✔️ `immediate`

It ensures `subject` satisfies `T`.
You need to specify `T`.

> `isType<T>(subject: unknown, validator: (s: T) => unknown): subject is T`

It is a generic type guard.
You can use it for do quick type guard without creating a custom one.

```ts
const s: unknown = 1

if (isType<1>(s, v => v === 1)) {
  // s is narrowed to type `1` here.
}
```

[type_guard]: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
