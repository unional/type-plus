# type-plus

[![NPM version][npm_image]][npm_url]
[![NPM downloads][downloads_image]][npm_url]

[![Release][github_release]][github_action_url]
[![Codecov][codecov_image]][codecov_url]

[![Visual Studio Code][vscode_image]][vscode_url]
[![Wallaby.js][wallaby_image]][wallaby_url]

Advance type utilities for [TypeScript].

## Legend

Each type and function has an icon associated with it.
They indicate what kind of feature they offer:

- 🚦 *assertion* (:vertical_traffic_light:): assertion function
- 💀 *deprecated* (:skull:): deprecated and will be removed soon
- 🛡️ *guard* (:shield:): type guard function
- 💥 *immediate* (:boom:): The effect of the type can be observed immediately during development.
- 🌪️ *filter* (:tornado:): a.k.a. *parse* These types perform some kind of test. If the input passes the test, the input is returned. Otherwise, it returns `never` (other icons considered: ↪️👉🚋⏩🐾🔑🚪💂🧲🙅‍♂️🪚).
- 🏃 *runtime* (:runner:): The function has runtime effect
- 🩳 *shortcut* (:shorts:): Shortcut or convenient types
- 🧪 *testing* (:test_tube:): The type or function are designed for test.
- ⚗️ *transform* (:alembic:): These types transforms the input to another category.
- 🦴 *utilities* (:bone:): provide various functionalities (other icons considered: 🔧🔨).
- 🎭 *predicate* (:performing_arts:): a.k.a. *validate* or *logical*. These types perform some kind of test. If the input passes the test, it returns `true` or `false` (other icons considered: ⭕).

## Feature Highlights

- [Type assertions](./ts/assertion/readme.md)
- [Type Guard](./ts/type-guard/readme.md)
- [Type Checking](#type-checking)
- [Type Utilities](#type-utilities)
- [Nominal Types](#nominal-types)
- [Functional Types](#functional-types)

## Installation

```sh
npm install type-plus

yarn add type-plus

pnpm add type-plus
```

## Type Assertions

Type assertion is one of the main features of `type-plus`.

Type assertions can be `immediate` compile time check, or they can have `runtime` behavior.

There are 4 kinds of type assertions:

- `logical`: functions or generic types that returns `true` or `false` type to be used in type level programming.
- `filter`: generic type that returns `never` if the test fails.

`Equal<A, B>`:
`IsEqual<A, B>`:

✔️ `logical`

Check if `A` and `B` are the same.

`NotEqual<A, B>`:
`IsNotEqual<A, B>`:

✔️ `logical`

Check if `A` and `B` are not the same.

`IsExtend<A, B>`:
`IsNotExtend<A, B>`:

✔️ `logical`

Check if `A` extends or not extends `B`.

`Extendable<A, B>`:
`NotExtendable<A, B>`:

✔️ `filter`

Check if `A` extends or not extends `B`.

`IsAssign<A, B>`:
`CanAssign<A, B>`:

✔️ `logical`

Check if `A` can be assigned to `B`.
A typical usage is using it with `assertType`:

```ts
assertType.isFalse(false as CanAssign<boolean, { a: string }>)
assertType.isTrue(true as CanAssign<{ a:string, b:number }, { a: string }>)
```

`canAssign<T>(): (subject) => true`:

✔️ `immediate`, `logical`

Returns a compile-time validating function to ensure `subject` is assignable to `T`.

```ts
const isConfig = canAssign<{ a: string }>()
assertType.isTrue(isConfig({ a: 'a' }))
```

`canAssign<T>(false): (subject) => false`:

✔️ `immediate`, `logical`

Returns a compile-time validating function to ensure `subject` is not assignable to `T`.

```ts
const notA = canAssign<{ a: string }>(false)
assertType.isTrue(notA({ a: 1 }))

notA({ a: '' }) // TypeScript complains
```

`IsNever<T>`:

✔️ `logical`

Check if `A` is `never`.

```ts
IsNever<never> // true
IsNever<1>     // false
```

## Type Checking

[type-plus](./README.md) privides type checking utilities for every type.

Each type has at least 4 type checks.
Using `string` as an example, there are `StringType<T>`, `IsString<T>`, `NotStringType<T>`, and `IsNotString<T>`.

Some types will have more checks, such as `boolean` has `StrictBooleanType<T>`, `TrueType<T>`, `FalseType<T>`.

You can learn more in their respective sections:

- [any](./ts/any/readme.md)
- [array](./ts/array/readme.md)
- [bigint](./ts/bigint/readme.md)
- [boolean](./ts/boolean/readme.md)
- [function](./ts/function/readme.md)
- [never](./ts/never/readme.md)
- [null](./ts/null/readme.md)
- [number](./ts/number/readme.md)
- [object](./ts/object/readme.md)
- [string](./ts/string/readme.md)
- [symbol](./ts/symbol/readme.md)
- [tuple](./ts/tuple/readme.md)
- [undefined](./ts/undefined/readme.md)
- [unknown](./ts/unknown/readme.md)
- [void](./ts/void/readme.md)

## Type Utilities

`type-plus` also provides additional type utilities.
These utilities include utility types and type-adjusted functions.

Note that most `predicate` types (such as `IsAny<>`) have a `Then` and `Else` that you can override.

e.g.:

```ts
type Yes = IsAny<any, 'yes', 'no'> // 'yes'
type No = IsAny<1, 'yes', 'no'> // 'no'
```

### Any

- [`AnyType<T, Then = T, Else = never>`](ts/any_plus/any.ts#L14): `T === any`.
- [`IsAny<T, Then = true, Else = false>`](ts/any_plus/any.ts#L29): `T === any` (origin: [ts-essentials]).

### Array

- [`At<A, N, Fail = never>`](ts/array_plus/array.ts#L19): gets the element type at index `N` in the array `A`.
- `CommonPropKeys<A>`: gets common keys inside the records in the array `A` (deprecate `CommonKeys`).
- [`Concat<A, B>`](ts/array_plus/array.ts#L38): `[...A, ...B]`.
- `CreateTuple<L, T>`: Creates `Tuple<T>` with `L` number of elements.
- `drop(array, value)`: drop a particular value from an array.
- `DropFirst<A>`: drops the first value type of `A`.
- `DropLast<A>`: drops the last value type of `A`.
- `DropMatch<A, Criteria>`: drops entries matching `Criteria` in array or tuple `A`.
- `DropUndefined<A>`: drop undefined entries from array of tuple `A`.
- `Filter<A, Criteria>`: filter the array or tuple `A`, keeping entries satisfying `Criteria`. **Deprecated. Renaming to `KeepMatch`**
- `FindFirst<A, Criteria>`: gets the first type satisfying `Criteria`.
- `FindLast<A, Criteria>`: gets the last type satisfying `Criteria`.
- `Head<A>`: gets the first entry in the array.
- `IntersectOfProps<A, K>`: gets the intersect of `A[K]` types (deprecate `MapToProp`)
- `IsArray<T>`: `logical` predicate for `Array`.
- `KeepMatch<A, Criteria>`: keeps entries satisfying `Criteria` in array or tuple `A`.
- `Last<A>`: gets the last type of array or tuple.
- `literalArray(...entries)`: return an array whose items are restricted to the provided literals.
- `PadLeft<A, Total, PadWith>`: pads `A` with `PadWith` if the length of `A` is less than `L`.
- `reduceWhile()`: `reduce()` with predicate for early termination. \
  A simple version of the same function in the `ramda` package.
- `Reverse<A>`: reverses the order of `A`.
- `Some<A, Criteria>`: true if some elements in `A` matches `Criteria`.
- `Tail<A>`: Gets the types of a tuple except the first entry.
- `UnionOfProps<A, K>`: gets the union of `A[K]` types (deprecate `PropUnion`).
- `UnionOfValues<A>`: gets the union of value types in `A` (deprecate `ArrayValue`).
- [`ArrayPlus.IndexAt<A, N, Fail = never>`](ts/array_plus/array_plus.ts#L23): gets the normalized index for `A`.
- [`ArrayPlus.IsIndexOutOfBound<A, N, Then = true, Else = false>`](ts/array_plus/array_plus.ts#L62): Is `N` an out of bound index of `A`. Supports negative numbers.
- [`ArrayType<T, Then = N, Else = never>`](ts/array_plus/array.ts#L48): Is the type `T` exactly an array and not a tuple.

### Constant Types

- `KeyTypes`: type of all keys.
- `PrimitiveTypes`: all primitive types, including `Function`, `symbol`, and `bigint`.
- `ComposableTypes`: Types that can contain custom properties. i.e. `object`, `array`, `function`.
- `NonComposableTypes`: Types that cannot contain custom properties. i.e. not composable.

### JSON Support

- `JSONPrimitive`: primitive types valid in JSON
- `JSONObject`: JSON object
- `JSONArray`: JSON array
- `JSONTypes`: all JSON compatible types.
- `JSONTypes.get<T>(obj, ...props)`: get a cast value in JSON

```ts
import { JSONTypes } from 'type-plus'

const someJson: JSONTypes = { a: { b: ['z', { c: 'miku' }]}}

JSONTypes.get<string>(someJson, 'a', 'b', 1, 'c') // miku
```

### Object utilities

- `filterKey()`: type adjusted filter by key.
- `findKey()`: type adjusted find by key.
- `forEachKey()`: type adjusted for each by key.
- `HasKey<T, K>`: predicate type checking `T` has key `K`.
- `hasKey()`: function of `HasKey`.
- `IsRecord<T>`: `logical` predicate for `Record`.
- `KeysWithDiffTypes<A, B>`: gets the keys common in `A` and `B` but with different value type.
- `mapKey()`: type adjusted map by key.
- `RecordValue<R>`: gets the value type `T`from `Record<any, T>` [video](https://www.youtube.com/watch?v=1J7xK6FUqPw).
- `reduceByKey()`: type adjusted reduce by key.
- `someKey()`: type adjusted some by key.
- `SpreadRecord<A, B>`: type for `{...a, ...b}` when both `a` and `b` are `Record`\
  for array, just do `[...A, ...B]`.

### Promise utilities

- `AwaitedProp<T, V>`: `Awaited` on specified props `P` in `T`.
- `isPromise<R>(subject: any)`: `isPromise()` type guard.
- `MaybePromise<T>`: Alias of `T | Promise<T>`.
- `PromiseValue<P>`: Gets the type within the Promise.
- `PromiseValueMerge<P1, P2, ...P9>`: Merge the values of multiple promises.
- `mapSeries()`: Similar to `bluebird.mapSeries()` but works with `async`/`await`.
- `transformMaybePromise(value, transformer)`: Apply the `transformer` to the `value`.\
  It is also exported under `MaybePromise.transform()`.

### Type manipulation

- `ANotB<A, B>`: get object with properties in `A` and not in `B`, including properties with a different value type.
- `BNotA<A, B>`: flip of `ANotB`
- `as<T>(subject)`: assert `subject` as `T`. Avoid ASI issues such as `;(x as T).abc`
- `asAny(subject)`: assert `subject` as `any`. Avoid ASI issue such as `;(x as any).abc`
- `EitherAnd<A, B, [C, D]>`: combines 2 to 4 types as `A | B | (A & B)`. This is useful for combining options. **Deprecated**. Renamed to `EitherOrBoth`.
- `EitherOrBoth<A, B, [C, D]>`: combines 2 to 4 types as `A | B | (A & B)`. This is useful for combining options [video](https://youtu.be/jBxx03NT4Ik).
- `Except<T, K>`: Deprecated. Same as `Omit<T, K>`.
- `ExcludePropType<T, U>`: excludes type `U` from properties in `T`.
- `KeyofOptional<T>`: `keyof` that works with `Record<any, any> | undefined`.
- `KnownKeys<T>`: extract known (defined) keys from type `T`.
- `LeftJoin<A, B>`: left join `A` with `B`
- `NonNull<T>`: remove `null`
- `NonUndefined<T>`: remove `undefined`
- `Omit<T, K>`: From `T`, pick a set of properties whose keys are not in the union `K`. This is the opposite of `Pick<T, K>`.
- `OptionalKeys<T>`: gets keys of optional properties in `T`.
- `PartialExcept<T, U>`: Deprecated. Same as `PartialOmit<T, U>`.
- `PartialOmit<T, U>`: makes the properties not specified in `U` becomes optional.
- `PartialPick<T, U>`: makes the properties specified in `U` becomes optional.
- `Pick<T, K>`: pick properties `K` from `T`. Works with unions.
- `RecursivePartial<T>`: make type `T` optional recursively.
- `RecursiveRequired<T>`: make type `T` required recursively.
- `ReplaceProperty<T, K, V>`: replace property `K` in `T` with `V`.
- `RequiredKeys<T>`: gets keys of required properties in `T`.
- `RequiredPick<T, U>`: makes the properties specified in `U` become required.
- `RequiredExcept<T, U>`: makes the properties not specified in `U` become required.
- `RecursiveIntersect<T, U>`: intersect type `U` onto `T` recursively.
- `ValueOf<T>`: type of the value of the properties of `T`.
- `Widen<T>`: widen literal types.
- PropType: ...no helper type for this. Just do `YourType['propName']`.

### Type Predicates

Type predicates are type alias that returns `true` or `false`.
They can be used to compose complex types.

- `HasKey<T, K>`: predicate type checking `T` has key `K`.
- `IsAny<T>`: `T === any` (updated to impl: [expect-type]).
- `IsBoolean<T>`: check for `boolean`, but not for `true` nor `false`.
- `IsDisjoint<A, B>`: is `A` and `B` is a disjoint set.
- `IsEmptyObject<T>`: is `T === {}`.
- `IsLiteral<T>`: is `T` a literal type (literal string or number).

#### Logical

- `If<Condition, Then = true, Else = false>`: if statement.
- `And<A, B, Then = true, Else = false>`: logical `AND`.
- `Or<A, B, Then = true, Else = false>`: logical `OR`.
- `Xor<A, B, Then = true, Else = false>`: logical `XOR`.
- `Not<X, Then = true, Else = false>`: logical `NOT`.

Note that these types work correctly with the `boolean` type.
e.g.:

- `And<boolean, true> -> boolean`
- `Not<boolean> -> boolean`

There is a problem with generic distribution: <https://github.com/microsoft/TypeScript/issues/41053>
So you may encounter some weird behavior if your logic is complex.

### Number

- [`Numeric`](ts/number_plus/number.ts#L4): either `number` or `bigint` (origin: [type-fest]).
- [`Zero`](ts/number_plus/number.ts#L9): `0` in `number` or `bigint` (origin: [type-fest]).
- [`Integer<N, Then = N, Else = never>`](ts/number_plus/number.ts#L27): is integer (origin: [type-fest]).
- [`IsInteger<N, Then = true, Else = false>`](ts/number_plus/number.ts#L46): is integer.
- [`IsWhole<N, Then = true, Else = false>`](ts/number_plus/number.ts#L62): is integer.
- [`Negative<N, Then = N, Else = never>`](ts/number_plus/number.ts#L77): is negative (origin: [type-fest]).
- [`NonNegative<N, Then = N, Else = never>`](ts/number_plus/number.ts#L96): is non-negative (origin: [type-fest])
- [`NumberType<T, Then = N, Else = never>`](ts/number_plus/number.ts#L108): Is the type `T` exactly `number`.
- [`Positive<N, Then = N, Else = never>`](ts/number_plus/number.ts#L124): is positive.
- [`IsPositive<N, Then = N, Else = never>`](ts/number_plus/number.ts#L144): is positive.

### Math

- `Abs<N, Fail=never>`: `Abs(N)`, `Abs<number>` returns `Fail`.
- `Max<A, B, Fail=never>`: `max(A, B)`, for whole number, `Fail` otherwise.
- `GreaterThan<A, B, Fail=never>`: `A > B` for whole numbers, `Fail` otherwise.

#### Arithmetic

- `Add<A, B, Fail=never>`: `A + B` for positive and whole numbers, `Fail` otherwise.
- `Subtract<A, B, Fail=never>`: `A - B` for positive and whole numbers, `Fail` otherwise.
- `Increment<A, Fail=never>`: alias of `Add<A, 1, Fail>`.
- `Decrement<A, Fail=never>`: alias of `Subtract<A, 1, Fail>`.

### Tuple

- [`TupleType`](ts/tuple/readme.md#tupletype)

### Utility Functions

- `amend(subject)...`: amend subject as union or intersect of `T`.
- `facade(subject, ...props)`: create a facade of `subject`.
- `getField(subject, key, defaultValue)`: get a field from a subject. Works against nullable and optional subject.
- `hasKey()`: function of `HasKey`.
- `hasProperty(value, prop)`: assert `value` has property `prop`. This will pick the correct union type.
- `isConstructor(subject)`: type guard `subject` is a constructor.
- `isSystemError(code, err)`: type guard `err` with NodeJS error code.
- `omit(obj, ...props)`: omit properties from `obj`.
- `pick(obj, ...props)`: pick properties from `obj`.
- `record<K, V>(value?)`: create a `Record<K, V>` without extra object prototype.
- `record<R>(value?)`: create a record `R` (e.g. `{ a: number }`) without extra object prototype.
- `required(...)`: merge options and remove `Partial<T>`. From [`unpartial`](https://github.com/unional/unpartial)
- `requiredDeep(...)`: merge options deeply and remove `Partial<T>`. From [`unpartial`](https://github.com/unional/unpartial)
- `split(target, ...splitters)`: split one object into multiple objects.
- `stub<T>(value)`: stub a particular type `T`.
- `stub.build<T>(init?)`: build a stub for particular type `T`.
- `typeOverrideIncompatible<T>()`: override only the incompatible portion between two types.
- `unpartial()`: merge options and remove `Partial<T>` values. From [`unpartial`](https://github.com/unional/unpartial)

```ts
type A =  {
  foo: boolean,
  bar: string,
  baz: string
}

const overrider = typeOverrideIncompatible<A>()
const source = {
  foo: 1,
  bar: 'bar',
  baz: 'baz'
}

// only the `foo` property is available to override.
overrider(source, { foo: !!source.foo })
```

## Nominal Types

The TypeScript type system is structural.

In some cases, we want to express a type with nominal behavior.
`type-plus` provides two kinds of nominal types: `Brand` and `Flavor`.

`Brand<B, T>`:

`brand(type, subject?)`:

Branded nominal type is the stronger nominal type of the two.
It disallows unbranded type assigned to it:

```ts
const a = brand('a', { a: 1 })
const b = { a: 1 }
a = b // error
```

`subject` can be any type, from primitive to strings to objects.

`brand(type)`:

If you do not provide `subject`, `brand(type)` will return a brand creator,
so that you can use it to create multiple branded values:

```ts
const nike = brand('nike')
const shirt = nike('shirt')
const socks = nike('socks')
```

`Flavor<F, T>`:

`flavor(type, subject?)`:

The key difference between `Flavor` and `Brand` is that
unflavored type can be assigned to `Flavor`:

```ts
let f = flavor('orange', 'soda')
f = 'mist' // ok
```

Also, `Brand` of the same name can be assigned to `Flavor`,
but `Flavor` of the same name cannot be assigned to `Brand`.

`nominalMatch(a, b)`:

`nominalMatch()` can be used to compare `Brand` or `Flavor`.

```ts
const b1 = brand('x', 1)
const b2 = brand('y', 1)

nominalMatch(b1, b2) // false
```

## Function Utilties

- `AnyFunction<P, R>`: a generic type for any function
- `ExtractFunction<F>`: extract the function signature from a type `F`.
- `extractFunction(fn: F)`: adjust type of `fn` to its function signature only.
- `inspect<T>(value: T, inspector?: (v: T) => void)`: inspect a value and return it.\
  Inspector defaults to `console.dir()`

## Functional Types

- `ChainFn<T>: T`: chain function that returns the input type.
- `compose(...fns): F`: compose functions

## Context Builder

- `context()`: a context builder. This is useful to build context for functional programming.\
  It is a sync version of the `AsyncContext` from [async-fp](https://unional/async-fp).

```ts
import { context } from 'type-plus'

// { a: 1, b: 2 }
const ctx = context({ a: 1 })
  .extend(c => ({ b: c.a + 1 }))
  .build()
```

## Attribution

Some code in this library is created by other people in the TypeScript community.
I'm merely adding them in and maybe making some adjustments.
Whenever possible, I add attribution to the person who created those **codes** in the file.

## Useful Tips

- <https://github.com/microsoft/TypeScript/wiki/Performance>

## Similar projects

- [expect-type]: Compile-time tests for types
- [hotscript]: Higher-order TypeScript
- [spec.ts]: write tests for your types!
- [ts-essentials]: all essential TypeScript types in one place.
- [ts-expect]: Checks values in TypeScript match expectations.
- [ts-toolbelt]: TypeScript's largest utility library.
- [type-fest]: a collection of essential TypeScript types.
- [type-zoo]: a modest type lib usable today.
- [typepark]: a new type collection offering tuple manipulation and `Pipe`.
- [typelevel-ts]: a type lib by [@gcanti], author of several FP libraries in TS.
- [typical]: a playground of type-level operations for TypeScript.
- [utility-types]: collection of utility types, complementing TypeScript build-in mapped types ans aliases.

## Contribute

```sh
# after fork and clone
npm install

# begin making changes
git checkout -b <branch>
npm run watch

# after making change(s)
git commit -m "<commit message>"
git push

# create PR
```

## Wallaby.js

[![Wallaby.js][wallaby_image_lg]][wallaby_url]

This repository contributors are welcome to use
[Wallaby.js OSS License][wallaby_url] to get
test results immediately as you type, and see the results in
your editor right next to your code.

[@gcanti]: https://github.com/gcanti
[codecov_image]: https://codecov.io/gh/unional/type-plus/branch/master/graph/badge.svg
[codecov_url]: https://codecov.io/gh/unional/type-plus
[downloads_image]: https://img.shields.io/npm/dm/type-plus.svg?style=flat
[expect-type]: https://github.com/mmkal/expect-type
[github_action_url]: https://github.com/unional/type-plus/actions
[github_release]: https://github.com/unional/type-plus/workflows/release/badge.svg
[hotscript]: https://github.com/gvergnaud/hotscript
[npm_image]: https://img.shields.io/npm/v/type-plus.svg?style=flat
[npm_url]: https://npmjs.org/package/type-plus
[spec.ts]: https://github.com/aleclarson/spec.ts
[ts-essentials]: https://github.com/ts-essentials/ts-essentials
[ts-expect]: https://github.com/TypeStrong/ts-expect
[ts-toolbelt]: https://github.com/millsp/ts-toolbelt
[type-fest]: https://github.com/sindresorhus/type-fest
[type-zoo]: https://github.com/pelotom/type-zoo
[typelevel-ts]: https://github.com/gcanti/typelevel-ts
[typepark]: https://github.com/kgtkr/typepark
[TypeScript]: https://www.typescriptlang.org
[typical]: https://github.com/KiaraGrouwstra/typical
[utility-types]: https://github.com/piotrwitek/utility-types
[vscode_image]: https://img.shields.io/badge/vscode-ready-green.svg
[vscode_url]: https://code.visualstudio.com/
[wallaby_image]: https://img.shields.io/badge/wallaby.js-powered-blue.svg?style=flat&logo=github
[wallaby_image_lg]: https://img.shields.io/badge/wallaby.js-powered-blue.svg?style=for-the-badge&logo=github
[wallaby_url]: https://wallabyjs.com/oss/
