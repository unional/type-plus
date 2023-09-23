# undefined

`undefined` is one of the two primitive values in JavaScript to represent the absence of a value.

## [IsUndefined](./is_undefined.ts)

`IsUndefined<T, { $then: $Then, $else: $Else }>`

🎭 *predicate*
🔢 *customize*

Validate if `T` is exactly `undefined`.

```ts
type R = IsUndefined<undefined> // $Then

type R = IsUndefined<never> // $Else
type R = IsUndefined<unknown> // $Else
type R = IsUndefined<string | boolean> // $Else

type R = IsUndefined<undefined, $SelectionPredicate> // true
type R = IsUndefined<string, $SelectionPredicate> // false
```

## [IsNotUndefined](./is_not_undefined.ts)

`IsNotUndefined<T, { $then: $Then, $else: $Else }>`

🎭 *predicate*
🔢 *customize*

Validate if `T` is not exactly `undefined`.

```ts
type R = IsNotUndefined<undefined> // $Else

type R = IsNotUndefined<never> // $Then
type R = IsNotUndefined<unknown> // $Then
type R = IsNotUndefined<string | boolean> // $Then

type R = IsNotUndefined<undefined, $SelectionPredicate> // false
type R = IsNotUndefined<string, $SelectionPredicate> // true
```

## [HasUndefined](./has_undefined.ts)

`HasUndefined<T, { $then: $Then, $else: $Else }>`

🎭 *predicate*
🔢 *customize*

Validate if `T` is `undefined` or union with `undefined`.

```ts
type R = HasUndefined<undefined> // $Then
type R = HasUndefined<undefined | 1> // $Then

type R = HasUndefined<number> // $Else

type R = HasUndefined<undefined, $SelectionPredicate> // true
type R = HasUndefined<string, $SelectionPredicate> // false
```



## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-undefined
