# type-plus

![unstable][unstable-image]
[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]

[![Circle CI][circleci-image]][circleci-url]
[![Travis CI][travis-image]][travis-url]
[![Codecov][codecov-image]][codecov-url]
[![Coveralls Status][coveralls-image]][coveralls-url]

[![Greenkeeper][greenkeeper-image]][greenkeeper-url]
[![Semantic Release][semantic-release-image]][semantic-release-url]

[![Visual Studio Code][vscode-image]][vscode-url]
[![Wallaby.js][wallaby-image]][wallaby-url]

Provides additional types and type adjusted utilities for `typescript`

## API

### Identity type

- `Id<T>`: generic Id type
- `createId<T>(type: T, value: string): Id<T>`: create id
- `createIdCreator<T>(type: T): (value: string) => Id<T>`: create an id creator

### Constant Types

- `JSONTypes`: all JSON compatible types.
- `KeyTypes`: type of all keys.
- `PrimitiveTypes`: all primitive types, including `Function`, `symbol`, and `bigint`

### Object Key functions

- `filterKey()`: type adjusted filter by key.
- `findKey()`: type adjusted find by key.
- `forEachKey()`: type adjusted for each by key.
- `HasKey<T, K>`: predicate type checking `T` has key `K`.
- `hasKey()`: function of `HasKey`.
- `KeysWithDiffTypes<A, B>`: gets the keys common in `A` and `B` but with differnt value type.
- `mapKey()`: type adjusted map by key.
- `reduceKey()`: type adjusted reduce by key.
- `someKey()`: type adjusted some by key.

### Array function

- `literalArray(...entries)`: return an array those items are restricted to the provided literals.

### Promise function

- `isPromise<R>(subject: any)`: `isPromise()` type guard.
- `PromiseValue<P>`: Gets the type within the Promise.
- `mapSeries()`: Similar to `bluebird.mapSeries()` but works with `async`/`await`.

### Nominal Type

- `Flavor<FlavorT, T>`: a flavored nominal type.
- `Brand<BrandT, T>`: a branded nominal type.
- `createBrandCreator<BrandT, T>()`: creates a brand creator to create branded nominal type.

### Type manipulation

- `ANotB<A, B>`: get object with properties in `A` and not in `B`, including properties with differnt value type.
- `BNotA<A, B>`: flip of `ANotB`
- `Except<T, K>`: Deprecated. Same as `Omit<T, K>`.
- `ExcludePropType<T, U>`: excludes type `U` from properties in `T`.
- `Omit<T, K>`: From `T`, pick a set of properties whose keys are not in the union `K`. This is the opposite of `Pick<T, K>`.
- `PartialExcept<T, U>`: Deprecated. Same as `PartialOmit<T, U>`.
- `PartialOmit<T, U>`: makes the properties not specified in `U` becomes optional.
- `PartialPick<T, U>`: makes the properties specified in `U` becomes optional.
- `RecursivePartial<T>`: make type `T` optional recursively.
- `RecursiveRequired<T>`: make type `T` required recursively.
- `RequiredPick<T, U>`: makes the properties specified in `U` becomes required.
- `RequiredExcept<T, U>`: makes the properties not specified in `U` becomes required.
- `RecursiveIntersect<T, U>`: intersect type `U` onto `T` recursively.
- `ValueOf<T>`: type of the value of the properties of `T`.
- PropType: ...no helper type for this. Just do `YourType['propName']`.

### Type Predicates

Type predicates are type alias that returns `true` or `false`.
They can be used to compose complex types.

- `HasKey<T, K>`: predicate type checking `T` has key `K`.
- `IsDisjoint<A, B>`: is `A` and `B` is a disjoint set.
- `IsSame<A, B>`: is `A` and `B` has the same properties and types.
- `Not<T>`: not operator for type.

### Type assertion

- `assertType<T>(subject)`: assert `subject` satisfies type `T`.
- `assertType.isXXX(value)`: ensure typeof `value` is `XXX`
- `assertType.noXXX(value)`: ensure typeof `value` does not contain `XXX`. i.e. cannot assign `XXX` to `value`.
- `typeAssert.*` is deprecated and moved under `assertType`.
- `typeAssertion<T>()`: creates a type assertion function of type `T`

```ts
type Foo = { a: number }
const assertIsFoo = typeAssertion<Foo>()
function createFoo() {
  return assertIsFoo({ a: 1, b: 2 })
}
```

### Utility Functions

- `facade(subject, ...props)`: create a facade of `subject`.
- `getField(subject, key, defaultValue)`: get a field from a subject. Works against nullable and optional subject.
- `hasKey()`: function of `HasKey`.
- `pick(obj, ...props)`: pick properties from `obj`.
- `required(...)`: merge options and removing `Partial<T>`. From [`unpartial`](https://github.com/unional/unpartial)
- `requiredDeep(...)`: merge options deeply and removing `Partial<T>`. From [`unpartial`](https://github.com/unional/unpartial)
- `tryAssign<S, T>(from: S, to: T)`: try assign `from` to `to`. Return type `never` if not possible.
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

[circleci-image]: https://circleci.com/gh/unional/type-plus/tree/master.svg?style=shield
[circleci-url]: https://circleci.com/gh/unional/type-plus/tree/master
[codecov-image]: https://codecov.io/gh/unional/type-plus/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/unional/type-plus
[coveralls-image]: https://coveralls.io/repos/github/unional/type-plus/badge.svg
[coveralls-url]: https://coveralls.io/github/unional/type-plus
[downloads-image]: https://img.shields.io/npm/dm/type-plus.svg?style=flat
[downloads-url]: https://npmjs.org/package/type-plus
[greenkeeper-image]: https://badges.greenkeeper.io/unional/type-plus.svg
[greenkeeper-url]: https://greenkeeper.io/
[npm-image]: https://img.shields.io/npm/v/type-plus.svg?style=flat
[npm-url]: https://npmjs.org/package/type-plus
[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]: https://github.com/semantic-release/semantic-release
[travis-image]: https://img.shields.io/travis/unional/type-plus/master.svg?style=flat
[travis-url]: https://travis-ci.org/unional/type-plus?branch=master
[unstable-image]: https://img.shields.io/badge/stability-unstable-yellow.svg
[vscode-image]: https://img.shields.io/badge/vscode-ready-green.svg
[vscode-url]: https://code.visualstudio.com/
[wallaby-image]: https://img.shields.io/badge/wallaby.js-configured-green.svg
[wallaby-url]: https://wallabyjs.com
