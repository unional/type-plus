# boolean

`boolean` is a type that represents the two values: `true` and `false`.

Unlike other types, `boolean` is a primitive union type.
It is exactly equivalent to the union type `true | false`.

## [IsBoolean](./is_boolean.ts)

`IsBoolean<T, { distributive: true, selection: 'predicate' | 'filter', $then: true, $else: false }>`

🎭 *predicate*

Validate if `T` is `boolean`, including `true` and `false`.

```ts
type R = IsBoolean<boolean> // true
type R = IsBoolean<true> // true
type R = IsBoolean<false> // true

type R = IsBoolean<number> // false
type R = IsBoolean<unknown> // false
type R = IsBoolean<string | boolean> // boolean
```

🔢 *customize*

Filter to ensure `T` is `boolean`, including `true` and `false`, otherwise returns `never`.

```ts
type R = IsBoolean<boolean, { selection: 'filter' }> // boolean
type R = IsBoolean<true, { selection: 'filter' }> // true
type R = IsBoolean<false, { selection: 'filter' }> // true

type R = IsBoolean<number, { selection: 'filter' }> // never
type R = IsBoolean<unknown, { selection: 'filter' }> // never
type R = IsBoolean<never, { selection: 'filter' }> // never
type R = IsBoolean<string | boolean, { selection: 'filter' }> // boolean
```

🔢 *customize*:

Disable distribution of union types.

```ts
type R = IsBoolean<boolean | 1> // boolean
type R = IsBoolean<boolean | 1, { distributive: false }> // false
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsBoolean<boolean, $SelectionBranch> // $Then
type R = IsBoolean<string, $SelectionBranch> // $Else
```

## [IsTrue](./is_true.ts)

`IsTrue<T, { distributive: true, selection: 'predicate' | 'filter', $then: true, $else: false }>`

🎭 *predicate*

Validate if `T` is `true`.

```ts
type R = IsTrue<boolean> // boolean
type R = IsTrue<true> // true
type R = IsTrue<false> // false

type R = IsTrue<number> // false
type R = IsTrue<unknown> // false
type R = IsTrue<string | boolean> // boolean
```

🔢 *customize*

Filter to ensure `T` is `true`, otherwise returns `never`.

```ts
type R = IsTrue<boolean, { selection: 'filter' }> // true
type R = IsTrue<true, { selection: 'filter' }> // true
type R = IsTrue<false, { selection: 'filter' }> // never

type R = IsTrue<number, { selection: 'filter' }> // never
type R = IsTrue<unknown, { selection: 'filter' }> // never
type R = IsTrue<never, { selection: 'filter' }> // never
type R = IsTrue<string | boolean, { selection: 'filter' }> // true
```

🔢 *customize*:

Disable distribution of union types.

```ts
type R = IsTrue<true | 1> // boolean
type R = IsTrue<boolean | 1> // boolean
type R = IsTrue<true | 1, { distributive: false }> // false
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsTrue<true, $SelectionBranch> // $Then
type R = IsTrue<boolean, $SelectionBranch> // $Then | $Else
type R = IsTrue<string, $SelectionBranch> // $Else
```

## [IsFalse](./is_false.ts)

`IsFalse<T, { distributive: true, selection: 'predicate' | 'filter', $then: true, $else: false }>`

🎭 *predicate*

Validate if `T` is `false`.

```ts
type R = IsFalse<boolean> // boolean
type R = IsFalse<true> // false
type R = IsFalse<false> // true

type R = IsFalse<number> // false
type R = IsFalse<unknown> // false
type R = IsFalse<string | boolean> // boolean
```

🔢 *customize*

Filter to ensure `T` is `false`, otherwise returns `never`.

```ts
type R = IsFalse<boolean, { selection: 'filter' }> // false
type R = IsFalse<true, { selection: 'filter' }> // never
type R = IsFalse<false, { selection: 'filter' }> // false

type R = IsFalse<number, { selection: 'filter' }> // never
type R = IsFalse<unknown, { selection: 'filter' }> // never
type R = IsFalse<never, { selection: 'filter' }> // never
type R = IsFalse<string | boolean, { selection: 'filter' }> // false
```

🔢 *customize*:

Disable distribution of union types.

```ts
type R = IsFalse<false | 1> // boolean
type R = IsFalse<boolean | 1> // boolean
type R = IsFalse<boolean | 1, { distributive: false }> // false
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsFalse<false, $SelectionBranch> // $Then
type R = IsFalse<boolean, $SelectionBranch> // $Then | $Else
type R = IsFalse<string, $SelectionBranch> // $Else
```

## [IsNotBoolean](./is_not_boolean.ts)

`IsNotBoolean<T, { distributive: true, selection: 'predicate' | 'filter', $then: true, $else: false }>`

🎭 *predicate*

Validate if `T` is not `boolean`.

```ts
type R = IsNotBoolean<boolean> // false
type R = IsNotBoolean<true> // false
type R = IsNotBoolean<false> // false

type R = IsNotBoolean<number> // true
type R = IsNotBoolean<unknown> // true
type R = IsNotBoolean<string | boolean> // boolean
 ```

🔢 *customize*

Filter to ensure `T` is not `boolean`, including `true` and `false`, otherwise returns `never`.

```ts
type R = IsNotBoolean<boolean, { selection: 'filter' }> // never
type R = IsNotBoolean<true, { selection: 'filter' }> // never
type R = IsNotBoolean<false, { selection: 'filter' }> // never

type R = IsNotBoolean<number, { selection: 'filter' }> // number
type R = IsNotBoolean<unknown, { selection: 'filter' }> // unknown
type R = IsNotBoolean<never, { selection: 'filter' }> // never
type R = IsNotBoolean<string | boolean, { selection: 'filter' }> // string
```

🔢 *customize*:

Disable distribution of union types.

```ts
type R = IsNotBoolean<boolean | 1> // boolean
type R = IsNotBoolean<boolean | 1, { distributive: false }> // true
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsNotBoolean<boolean, $SelectionBranch> // $Else
type R = IsNotBoolean<string, $SelectionBranch> // $Then
```

## [IsNotTrue](./is_not_true.ts)

`IsNotTrue<T, { distributive: true, selection: 'predicate' | 'filter', $then: true, $else: false }>`

🎭 *predicate*

Validate if `T` is not `true`.

```ts
type R = IsNotTrue<boolean> // boolean
type R = IsNotTrue<true> // false
type R = IsNotTrue<false> // true

type R = IsNotTrue<number> // true
type R = IsNotTrue<unknown> // true
type R = IsNotTrue<string | boolean> // boolean
```

🔢 *customize*

Filter to ensure `T` is not `true`, otherwise returns `never`.

```ts
type R = IsNotTrue<boolean, { selection: 'filter' }> // false
type R = IsNotTrue<true, { selection: 'filter' }> // never
type R = IsNotTrue<false, { selection: 'filter' }> // false

type R = IsNotTrue<number, { selection: 'filter' }> // number
type R = IsNotTrue<never, { selection: 'filter' }> // never
type R = IsNotTrue<unknown, { selection: 'filter' }> // unknown
type R = IsNotTrue<string | boolean, { selection: 'filter' }> // string | false
type R = IsNotTrue<string | true, { selection: 'filter' }> // string
```

🔢 *customize*:

Disable distribution of union types.

```ts
type R = IsNotTrue<boolean | 1> // boolean
type R = IsNotTrue<true | 1> // boolean
type R = IsNotTrue<false | 1> // true
type R = IsNotTrue<boolean | 1, { distributive: false }> // true
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsNotTrue<true, $SelectionBranch> // $Else
type R = IsNotTrue<boolean, $SelectionBranch> // $Then | $Else
type R = IsNotTrue<string, $SelectionBranch> // $Then
```

## [IsNotFalse](./is_not_false.ts)

`IsNotFalse<T, { distributive: true, selection: 'predicate' | 'filter', $then: true, $else: false }>`

🎭 *predicate*

Validate if `T` is not `false`.

```ts
type R = IsNotFalse<boolean> // boolean
type R = IsNotFalse<true> // true
type R = IsNotFalse<false> // false

type R = IsNotFalse<number> // true
type R = IsNotFalse<unknown> // true
type R = IsNotFalse<string | boolean> // boolean
```

🔢 *customize*

Filter to ensure `T` is not `false`, otherwise returns `never`.

```ts
type R = IsNotFalse<boolean, { selection: 'filter' }> // true
type R = IsNotFalse<true, { selection: 'filter' }> // true
type R = IsNotFalse<false, { selection: 'filter' }> // never

type R = IsNotFalse<number, { selection: 'filter' }> // number
type R = IsNotFalse<never, { selection: 'filter' }> // never
type R = IsNotFalse<unknown, { selection: 'filter' }> // unknown
type R = IsNotFalse<string | boolean, { selection: 'filter' }> // string | true
type R = IsNotFalse<string | false, { selection: 'filter' }> // string
```

🔢 *customize*:

Disable distribution of union types.

```ts
type R = IsNotFalse<false | 1> // boolean
type R = IsNotFalse<boolean | 1> // boolean
type R = IsNotFalse<boolean | 1, { distributive: false }> // true
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsNotFalse<false, $SelectionBranch> // $Else
type R = IsNotFalse<boolean, $SelectionBranch> // $Then | $Else
type R = IsNotFalse<string, $SelectionBranch> // $Then
```

## [IsStrictBoolean](./is_strict_boolean.ts)

`IsStrictBoolean<T, { distributive: true, selection: 'predicate' | 'filter', $then: true, $else: false }>`

🎭 *predicate*

Validate if `T` is exactly `boolean`.

```ts
type R = IsStrictBoolean<boolean> // true
type R = IsStrictBoolean<true> // false
type R = IsStrictBoolean<false> // false

type R = IsStrictBoolean<number> // false
type R = IsStrictBoolean<unknown> // false
type R = IsStrictBoolean<string | boolean> // boolean
```

🔢 *customize*

Filter to ensure `T` is exactly `boolean`, otherwise returns `never`.

```ts
type R = IsStrictBoolean<boolean, { selection: 'filter' }> // boolean
type R = IsStrictBoolean<true, { selection: 'filter' }> // never
type R = IsStrictBoolean<false, { selection: 'filter' }> // never

type R = IsStrictBoolean<number, { selection: 'filter' }> // never
type R = IsStrictBoolean<unknown, { selection: 'filter' }> // never
type R = IsStrictBoolean<never, { selection: 'filter' }> // never
type R = IsStrictBoolean<string | boolean, { selection: 'filter' }> // boolean
type R = IsStrictBoolean<string | true, { selection: 'filter' }> // never
```

🔢 *customize*:

Disable distribution of union types.

```ts
type R = IsStrictBoolean<boolean | 1> // boolean
type R = IsStrictBoolean<boolean | 1, { distributive: false }> // false
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsStrictBoolean<boolean, $SelectionBranch> // $Then
type R = IsStrictBoolean<true, $SelectionBranch> // $Else
type R = IsStrictBoolean<false, $SelectionBranch> // $Else
type R = IsStrictBoolean<string, $SelectionBranch> // $Else
```

## [IsNotStrictBoolean](./is_not_strict_boolean.ts)

`IsNotStrictBoolean<T, { distributive: true, selection: 'predicate' | 'filter', $then: true, $else: false }>`

🎭 *predicate*

Validate if `T` is not exactly `boolean`.

```ts
type R = IsNotStrictBoolean<boolean> // false
type R = IsNotStrictBoolean<true> // true
type R = IsNotStrictBoolean<false> // true

type R = IsNotStrictBoolean<number> // true
type R = IsNotStrictBoolean<unknown> // true
type R = IsNotStrictBoolean<string | boolean> // boolean
 ```

🔢 *customize*

Filter to ensure `T` is not exactly `boolean`, otherwise returns `never`.

```ts
type R = IsNotStrictBoolean<boolean, { selection: 'filter' }> // never
type R = IsNotStrictBoolean<true, { selection: 'filter' }> // true
type R = IsNotStrictBoolean<false, { selection: 'filter' }> // false

type R = IsNotStrictBoolean<number, { selection: 'filter' }> // number
type R = IsNotStrictBoolean<unknown, { selection: 'filter' }> // unknown
type R = IsNotStrictBoolean<never, { selection: 'filter' }> // never
type R = IsNotStrictBoolean<string | boolean, { selection: 'filter' }> // string
```

🔢 *customize*:

Disable distribution of union types.

```ts
type R = IsNotStrictBoolean<boolean | 1> // boolean
type R = IsNotStrictBoolean<boolean | 1, { distributive: false }> // true
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsNotStrictBoolean<boolean, $SelectionBranch> // $Else
type R = IsNotStrictBoolean<true, $SelectionBranch> // $Then
type R = IsNotStrictBoolean<false, $SelectionBranch> // $Then
type R = IsNotStrictBoolean<string, $SelectionBranch> // $Then
```
