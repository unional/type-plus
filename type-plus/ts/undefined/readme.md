# undefined

`undefined` is one of the two primitive values in JavaScript to represent the absence of a value.

## [IsUndefined](./is_undefined.ts)

`IsUndefined<T, { distributive: true, $then: true, $else: false }>`

🎭 *predicate*
🔢 *customize*

Validate if `T` is exactly `undefined`.

```ts
type R = IsUndefined<undefined> // $Then

type R = IsUndefined<never> // $Else
type R = IsUndefined<unknown> // $Else
type R = IsUndefined<string | boolean> // $Else

// customize: branch logic
type R = IsUndefined<undefined, $SelectionPredicate> // true
type R = IsUndefined<string, $SelectionPredicate> // false

// customize: disable distributive
type R = IsUndefined<undefined | 1> // boolean
type R = IsUndefined<undefined | 1, { distributive: false }> // false
```

## [IsNotUndefined](./is_not_undefined.ts)

`IsNotUndefined<T, { distributive: true, $then: true, $else: false }>`

🎭 *predicate*
🔢 *customize*

Validate if `T` is not exactly `undefined`.

```ts
type R = IsNotUndefined<undefined> // false

type R = IsNotUndefined<never> // true
type R = IsNotUndefined<unknown> // true
type R = IsNotUndefined<string | boolean> // true

// customize: branch logic
type R = IsNotUndefined<string, $SelectionBranch> // $Then
type R = IsNotUndefined<undefined, $SelectionBranch> // $Else

// customize: disable distributive
type R = IsNotUndefined<undefined | 1> // boolean
type R = IsNotUndefined<undefined | 1, { distributive: false }> // false
```

## [HasUndefined](./has_undefined.ts)

`HasUndefined<T, { $then: true, $else: false }>`

🎭 *predicate*
🔢 *customize*

Validate if `T` is `undefined` or an union with `undefined`.

```ts
type R = HasUndefined<undefined> // true
type R = HasUndefined<undefined | 1> // true

type R = HasUndefined<number> // false

// customize: branching
type R = HasUndefined<undefined, $SelectionBranch> // $Then
type R = HasUndefined<string, $SelectionBranch> // $Else
```

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-undefined
