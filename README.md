# type-plus

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[![Github NodeJS][github-nodejs]][github-action-url]
[![Codecov][codecov-image]][codecov-url]

[![Semantic Release][semantic-release-image]][semantic-release-url]

[![Visual Studio Code][vscode-image]][vscode-url]
[![Wallaby.js][wallaby-image]][wallaby-url]

Provides additional types and type adjusted utilities for [TypeScript](https://www.typescriptlang.org/).

## Feature Highlights

- [Runtime type checker](#runtime-type-checker)
- [Type assertion](#type-assertion)
- [Nominal Types](#nominal-type)
- [Type Utilities](#type-utilities)

## Installation

```sh
npm install type-plus
// or
yarn add type-plus
```

## Runtime type checker

Bringing the power of TypeScript to JavaScript runtime.

```ts
const eslintConfig = T.object.create({
  env: O.object.create({
    es6: O.boolean
  }),
  parseOptions: O.object.create({
    ecmaVersion: O.number.list(3, 5, 6, 7, 8, 9, 10, 11, 12),
    sourceType: O.string.list('script', 'module'),
    ecmaFeatures: O.object.create({
      globalReturn: O.boolean,
      impliedStrict: O.boolean,
      jsx: O.boolean
    })
  }),
  ...
})

const config: unknown = require('.eslintrc.json')
if (T.satisfy(eslintConfig, config)) {
  // `config` is typed here
  config.parseOptions?.ecmaVersion // 3 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}
else {
  console.error(T.satify.getReport())
}

```

All type checker functionalities are exposed as `types` (alias to `T`).
In addition, `O` and `R` are exposed to make it easier to access optional types and required types respectively.

Types supported: `any`, `array`, `boolean`, `null`, `number`, `object`, `record`, `string`, `symbol`, `tuple`, `undefined`, `union`, `unknown`.

i.e., most of the basic types are supported except `bigint`.
It is left out for backward compatibility reasons.

You can use one of the three functions to perform type check:

`satisfy(type, subject)`:
A loose type check that permits extra elements in `Tuple` and properties in `Object`.

`conform(type, subject)`:
A strick type check that does not allow extra elements in `Tuple` and properties in `Object`.

`check(options, type, subject)`:
A general form of `satisfy()` and `conform()`.

## Type Assertion

Besides the [runtime type checker](#runtime-type-checker),
`type-plus` also provides a few other ways to do type assertions.

There are actually at least 5 kinds of type assertions:

- `runtime`: validates during runtime.
- `immediate`: validates at compile time.
- `type guard`: [User-defined type guard functions](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards) (`if (isBool(s))`) introduced in TypeScript 1.6.
- `assertion function`: [assertion functions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions) (`assertIsBool(a)`) introduced in TypeScript 3.7.
- `logical`: functions or generic types that returns `true` or `false` type to be used in type level programming.
- `filter`: generic types that returns `never` if the test fails.

Here are the type assertions provided in `type-plus`.
Use the one that fits your specific needs.

`assertType<T>(subject)`:

✔️ `immediate`

It ensures `subject` satisfies `T`.
It is similar to `const x: T = subject` without introducing unused variable.
You need to specify `T` for it to work.

`assertType<T>(subject, validator)`:

`assertType<T>(subject, Class)`:

✔️ `assertion function`, `runtime`

These overloads of `assertType` allows you to specify a `validator`.
With these overloads, `subject` can be `unknown` or `any`.

If `subject` fails the assertion,
a standard `TypeError` will be thrown and provide better error info.
For example:

```ts
const s: any = 1

// TypeError: subject fails to satisfy s => typeof s === 'boolean'
assertType<boolean>(s, s => typeof s === 'boolean')
```

The message beautification is provided by [`tersify`](https://github.com/unional/tersify).

`assertType.isUndefiend(subject)`:

`assertType.isNull(subject)`:

`assertType.isNumber(subject)`:

`assertType.isBoolean(subject)`:

`assertType.isTrue(subject)`:

`assertType.isFalse(subject)`:

`assertType.isString(subject)`:

`assertType.isFunction(subject)`:

`assertType.isConstructor(subject)`:

`assertType.isError(subject)`:

✔️ `immediate`, `assertion function`, `runtime`

Compiler and runtime assertion with type narrowing from `any`.
They assert the type of `subject` is that specific type.
i.e. union type will fail at type level:

```ts
const s: number | undefined = undefined
assertType.isUndefined(s) // TypeScript complains
```

They accepts `any` and will be narrowed to the specific type.

```ts
const s: any = undefined
assertType.isUndefined(s)
s // type is undefined
```

`assertType.isNever(subject)`:

✔️ `immediate`

Check if the subject type is `never`.
This function is not very useful in actual code as TypeScript will indicate the error.
But it can be useful when writing tests for type.

This is useful for variable. For type level only check, do the following:

```ts
assertType.isTrue(true as Equal<YourType, never>)
```

`assertType.noUndefiend(subject)`:

`assertType.noNull(subject)`:

`assertType.noNumber(subject)`:

`assertType.noBoolean(subject)`:

`assertType.noTrue(subject)`:

`assertType.noFalse(subject)`:

`assertType.noString(subject)`:

`assertType.noFunction(subject)`:

`assertType.noError(subject)`:

✔️ `immediate`, `runtime`

Compiler and runtime assertion.
Assert `subject` type does not contain the specific type.
Work againsts unions.

```ts
const s: number | undefined = 1
assertType.noUndefined(s) // TypeScript complains
```

They accepts `subject` with type `any` or `unknown`,
assertion will happens in runtime to ensure `subject` is the specific type.

`isType<T>(subject: T)`:

✔️ `immediate`

It ensures `subject` satisfies `T`.
It is identical to `assertType<T>(subject: T)`.
You need to specify `T`.

`isType<T>(subject, validator)`:

`isType<T>(subject, Class)`:

✔️ `type guard`, `runtime`

These overloads of `isType` allows you to specify a `validator`.
With these overloads, `subject` can be `unknown` or `any`.

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

Returns a compile time validating function to ensure `subject` is assignable to `T`.

```ts
const isConfig = canAssign<{ a: string }>()
assertType.isTrue(isConfig({ a: 'a' }))
```

`canAssign<T>(false): (subject) => false`:

✔️ `immediate`, `logical`

Returns a compile time validating function to ensure `subject` is not assignable to `T`.

```ts
const notA = canAssign<{ a: string }>(false)
assertType.isTrue(notA({ a: 1 }))

notA({ a: '' }) // TypeScript complains
```

## Nominal Type

TypeScript type system is structural.

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

## Functional Types

- `ChainFn<T>: T`: chain function that return the input type.

## Type Utilities

`type-plus` also provides additional type utilities.
These utilities includes utiltiy types and type adjusted functions.

### Array function

- `CommonKeys<A>`: gets common keys inside the records in the array `A`.
- `Head<A>`: gets the first entry in the array.
- `IsArray<T>`: `logical` predicate for `Array`.
- `literalArray(...entries)`: return an array those items are restricted to the provided literals.
- `MapToProp<A, K>`: Map `A: Array<E>` to `Array<E[K]>`.
- `reduceWhile()`: `reduce()` with predicate for early termination. \
  A simple version of the same function in the `ramda` package.
- `Tail<A>`: gets the remaining entries in the array except the first.

### Constant Types

- `JSONTypes`: all JSON compatible types.
- `KeyTypes`: type of all keys.
- `PrimitiveTypes`: all primitive types, including `Function`, `symbol`, and `bigint`.

### Object Key functions

- `filterKey()`: type adjusted filter by key.
- `findKey()`: type adjusted find by key.
- `forEachKey()`: type adjusted for each by key.
- `HasKey<T, K>`: predicate type checking `T` has key `K`.
- `hasKey()`: function of `HasKey`.
- `IsRecord<T>`: `logical` predicate for `Record`.
- `KeysWithDiffTypes<A, B>`: gets the keys common in `A` and `B` but with differnt value type.
- `mapKey()`: type adjusted map by key.
- `reduceKey()`: type adjusted reduce by key.
- `someKey()`: type adjusted some by key.
- `SpreadRecord<A, B>`: type for `{...a, ...b}` when both `a` and `b` are `Record`. \
  for array, just do `[...A, ...B]`.

### Promise function

- `isPromise<R>(subject: any)`: `isPromise()` type guard.
- `PromiseValue<P>`: Gets the type within the Promise.
- `PromiseValueMerge<P1, P2, ...P9>`: Merge the values of multiple promises.
- `mapSeries()`: Similar to `bluebird.mapSeries()` but works with `async`/`await`.

### Type manipulation

- `ANotB<A, B>`: get object with properties in `A` and not in `B`, including properties with differnt value type.
- `BNotA<A, B>`: flip of `ANotB`
- `Except<T, K>`: Deprecated. Same as `Omit<T, K>`.
- `ExcludePropType<T, U>`: excludes type `U` from properties in `T`.
- `KeyofOptional<T>`: `keyof` that works with `Record<any, any> | undefined`.
- `KnownKeys<T>`: extract known (defined) keys from type `T`.
- `LeftJoin<A, B>`: left join `A` with `B`
- `Omit<T, K>`: From `T`, pick a set of properties whose keys are not in the union `K`. This is the opposite of `Pick<T, K>`.
- `OptionalKeys<T>`: gets keys of optional properties in `T`.
- `PartialExcept<T, U>`: Deprecated. Same as `PartialOmit<T, U>`.
- `PartialOmit<T, U>`: makes the properties not specified in `U` becomes optional.
- `PartialPick<T, U>`: makes the properties specified in `U` becomes optional.
- `Pick<T, K>`: pick properties `K` from `T`. Works with union.
- `RecursivePartial<T>`: make type `T` optional recursively.
- `RecursiveRequired<T>`: make type `T` required recursively.
- `ReplaceProperty<T, K, V>`: replace property `K` in `T` with `V`.
- `RequiredKeys<T>`: gets keys of required properties in `T`.
- `RequiredPick<T, U>`: makes the properties specified in `U` becomes required.
- `RequiredExcept<T, U>`: makes the properties not specified in `U` becomes required.
- `RecursiveIntersect<T, U>`: intersect type `U` onto `T` recursively.
- `ValueOf<T>`: type of the value of the properties of `T`.
- `Widen<T>`: widen literal types.
- PropType: ...no helper type for this. Just do `YourType['propName']`.

### Type Predicates

Type predicates are type alias that returns `true` or `false`.
They can be used to compose complex types.

- `HasKey<T, K>`: predicate type checking `T` has key `K`.
- `IsDisjoint<A, B>`: is `A` and `B` is a disjoint set.

### Logical

- `And<A, B>`: logical `AND`.
- `Or<A, B>`: logical `OR`.
- `Xor<A, B>`: logical `XOR`.
- `Not<X>`: logical `NOT`.

Note that these types work correctly with `boolean` type.
e.g.:

- `And<boolean, true> -> boolean`
- `Not<boolean> -> boolean`

There is a problem with generic distribution: <https://github.com/microsoft/TypeScript/issues/41053>
So you may encounter some weird behavior if your logic is complex.

### Utility Functions

- `facade(subject, ...props)`: create a facade of `subject`.
- `getField(subject, key, defaultValue)`: get a field from a subject. Works against nullable and optional subject.
- `hasKey()`: function of `HasKey`.
- `hasProperty(value, prop)`: assert `value` has property `prop`. This will pick the correct union type.
- `isConstructor(subject)`: type guard `subject` is a constructor.
- `pick(obj, ...props)`: pick properties from `obj`.
- `omit(obj, ...props)`: omit properties from `obj`.
- `required(...)`: merge options and removing `Partial<T>`. From [`unpartial`](https://github.com/unional/unpartial)
- `requiredDeep(...)`: merge options deeply and removing `Partial<T>`. From [`unpartial`](https://github.com/unional/unpartial)
- `typeOverrideIncompatible<T>()`: override only the incompatiable portion between two types.

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

## Attribution

Some of the code in this library are created by other people in the TypeScript community.
I merely adding them in and may be making some adjustments.
When ever possible, I add attribution to the person who created those code in the file.

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

[codecov-image]: https://codecov.io/gh/unional/type-plus/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/unional/type-plus
[downloads-image]: https://img.shields.io/npm/dm/type-plus.svg?style=flat
[downloads-url]: https://npmjs.org/package/type-plus
[github-nodejs]: https://github.com/unional/type-plus/workflows/nodejs/badge.svg
[github-action-url]: https://github.com/unional/type-plus/actions
[npm-image]: https://img.shields.io/npm/v/type-plus.svg?style=flat
[npm-url]: https://npmjs.org/package/type-plus
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[vscode-image]: https://img.shields.io/badge/vscode-ready-green.svg
[vscode-url]: https://code.visualstudio.com/
[wallaby-image]: https://img.shields.io/badge/wallaby.js-configured-green.svg
[wallaby-url]: https://wallabyjs.com
