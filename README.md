# type-plus

[![NPM version][npm_image]][npm_url]
[![NPM downloads][downloads_image]][npm_url]

[![Release][github_release]][github_action_url]
[![Codecov][codecov_image]][codecov_url]

[![Visual Studio Code][vscode_image]][vscode_url]
[![Wallaby.js][wallaby_image]][wallaby_url]

More than 200 type utilities for [TypeScript].

## Table of Contents

1. [Assertion Function](#assertion-function)
   1. [assertType](#asserttype)
2. [Type Guard](#type-guard)
3. [Type Utilities](#type-utilities)
4. [Type Checking](#type-checking)
   1. [any](#any)
   2. [Array](#array)
   3. [bigint](#bigint)
   4. [boolean](#boolean)
   5. [function](#function)
   6. [never](#never)
   7. [null](#null)
   8. [number](#number)
   9. [numeric](#numeric)
   10. [object](#object)
   11. [Promise](#promise)
   12. [string](#string)
   13. [symbol](#symbol)
   14. [tuple](#tuple)
   15. [undefined](#undefined)
   16. [unknown](#unknown)
   17. [void](#void)
5. [Constant Types](#constant-types)
6. [JSON Support](#json-support)
7. [Type manipulation](#type-manipulation)
8. [Type Predicates](#type-predicates)
   1. [Logical](#logical)
9. [Math](#math)
10. [Utility Functions](#utility-functions)
11. [Nominal Types](#nominal-types)
12. [Functional Types](#functional-types)
13. [Attribution](#attribution)
14. [Useful Tips](#useful-tips)
15. [Similar projects](#similar-projects)
16. [Contribute](#contribute)
17. [Wallaby.js](#wallabyjs)

## Installation

```sh
npm install type-plus

yarn add type-plus

pnpm add type-plus
```

## Assertion Function

[Assertion Functions][assertion_functions] are special functions that asserts certain conditions of your program.

It is introduced in TypeScript 3.7.

They throw an error if the condition is not met, and return nothing otherwise.

These assertion functions are typically used in runtime,
so that that type of the value can be narrowed down.

### assertType

[`assertType`](./ts/assertion/assert_type.ts) provides a generic assertion function,
as well as many assertion functions for builtin types.

> [`assertType<T>(subject)`](./ts/assertion/readme.md#asserttype)

💀 deprecated. Use `assertType.as()` instead.

`assertType<T>(subject, validator)`:

🚦`assertion`: assert the `subject` is type `T` with the specified `validator`.

If `subject` fails the assertion,
a standard `TypeError` will be thrown and provide better error info.
For example:

```ts
const s: unknown = 1

// TypeError: subject fails to satisfy s => typeof s === 'boolean'
assertType<boolean>(s, s => typeof s === 'boolean')
```

The message beautification is provided by [`tersify`](https://github.com/unional/tersify).

> [`assertType.isUndefined()`](./ts/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is `undefined`.

> [`assertType.noUndefined()`](./ts/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is not `undefined`.

> [`assertType.isNull()`](./ts/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is `null`.

> [`assertType.noNull()`](./ts/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is not `null`.

> [`assertType.isNumber()`](./ts/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is `number`.

> [`assertType.noNumber()`](./ts/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is not `number`.

> [`assertType.isBoolean()`](./ts/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is `boolean`.

> [`assertType.noBoolean()`](./ts/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is not `boolean`.

> [`assertType.isTrue()`](./ts/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is `true`.

> [`assertType.noTrue()`](./ts/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is not `true`.

> [`assertType.isFalse()`](./ts/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is `false`.

> [`assertType.noFalse()`](./ts/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is not `false`.

> [`assertType.isString()`](./ts/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is `string`.

> [`assertType.noString()`](./ts/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is not `string`.

> [`assertType.isFunction()`](./ts/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is `function`.

> [`assertType.noFunction()`](./ts/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is not `function`.

> [`assertType.isError()`](./ts/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is an `Error`.

> [`assertType.noError()`](./ts/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is not an `Error`.

> [`assertType.isConstructor()`](./ts/assertion/readme.md#asserttype)

💀 deprecated. It does not work in all cases.

It passes for function that can be called with `new`.
If the subject is an arrow function, it can still return true after compilation.

> [`assertType.isNever()`](./ts/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is `never`.

> [`assertType.custom()`](./ts/assertion/readme.md#asserttype)

🚦`assertion`: creates a custom assertion function.

Using it to create a custom assertion function that provides better error messages.

The message beautification is provided by [`tersify`](https://github.com/unional/tersify).

> [`assertType.as<T>()`](./ts/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` as `T` without validator.

This works similar to manual assertion `;(subject as T)`

## Type Guard

[User-defined type guard functions][type_guard] is a function which its return type is specified as `x is T`.

> [`isType()`](./ts/type-guard/readme.md#istype)

🛡️ `guard`: a generic type guard function

> [`isType.t()`](./ts/type-guard/readme.md#istype)

💀 `deprecated`: use `testType.true()` instead.

> [`isType.f()`](./ts/type-guard/readme.md#istype)

💀 `deprecated`: use `testType.false()` instead.

> [`isType.never()`](./ts/type-guard/readme.md#istype)

💀 `deprecated`: use `testType.never()` instead.

> [`isType.equal()`](./ts/type-guard/readme.md#istype)

💀 `deprecated`: use `testType.equal()` instead.

## Type Utilities

> `Equal<A, B, Then = true, Else = false>`

💀 deprecated. use `IsEqual` instead. This will be converted to a ↪️ `parse`.

> `IsEqual<A, B, Then = true, Else = false>`

⭕ `predicate`: if `A` and `B` are the same.

> `NotEqual<A, B, Then = true, Else = false>`

💀 deprecated. use `IsNotEqual` instead. This will be converted to a ↪️ `parse`.

> `IsNotEqual<A, B, Then = true, Else = false>`:

⭕ `predicate`: check if `A` and `B` are not the same.

> `Extendable<A, B, Then = A, Else = never>`

↪️ `parse`: check if `A` extends `B`.

> `IsExtend<A, B, Then = true, Else = false>`

⭕ `predicate`: check if `A` extends `B`.

> `NotExtendable<A, B, Then = A, Else = never>`:

↪️ `parse`: check if `A` not extends `B`.

> `IsNotExtend<A, B, Then = true, Else = false>`:

⭕ `predicate`: check if `A` not extends `B`.

> `IsAssign<A, B, Then = true, Else = false>`

💀 `deprecated`: use `CanAssign` instead.

> `CanAssign<A, B, Then = true, Else = false>`:

⭕ `predicate`: check can `A` assign to `B`.

A typical usage is using it with `assertType`:

```ts
assertType.isFalse(false as CanAssign<boolean, { a: string }>)
assertType.isTrue(true as CanAssign<{ a:string, b:number }, { a: string }>)
```

> `StrictCanAssign<A, B, Then = true, Else = false>`

⭕ `predicate`: can `A` strictly assign to `B`

When `A` is a union, all branches must be assignable to `B`.

```ts
StrictCanAssign<number | string, number> // false
StrictCanAssign<number | string, number | string> // true
```

> `canAssign<T>(): (subject) => true`

⭕💻 `predicate`, `compile-time`

Returns a compile-time validating function to ensure `subject` is assignable to `T`.

```ts
const isConfig = canAssign<{ a: string }>()
assertType.isTrue(isConfig({ a: 'a' }))
```

> `canAssign<T>(false): (subject) => false`:

⭕💻 `predicate`, `compile-time`

Returns a compile-time validating function to ensure `subject` is not assignable to `T`.

```ts
const notA = canAssign<{ a: string }>(false)
assertType.isTrue(notA({ a: 1 }))

notA({ a: '' }) // TypeScript complains
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

### any

> [`AnyType<T>`](./ts/any/readme.md#type-checking)

↪️ `parse`: `T === any`.

> [`IsAny<T>`](./ts/any/readme.md#type-checking)

⭕ `predicate`: `T === any`.

> [`NotAnyType<T>`](./ts/any/readme.md#type-checking)

↪️ `parse`: `T !== any`.

> [`IsNotAny<T>`](./ts/any/readme.md#type-checking)

⭕ `predicate`: `T !== any`.

> [`IsAnyOrNever<T>`](./ts/any/readme.md#type-utilities)

⭕ `predicate`: `T === any || T === never`.

### Array

> [`ArrayType<T>`](./ts/array/readme.md#type-checking)

↪️ `parse`: is the type `T` exactly an array and not a tuple.

> [`IsArray<T>`](./ts/array/readme.md#type-checking)

⭕ `predicate`: is the type `T` exactly an array and not a tuple.

> [`NotArrayType<T>`](./ts/array/readme.md#type-checking)

↪️ `parse`: is the type `T` not an array or tuple.

> [`IsNotArray<T>`](./ts/array/readme.md#type-checking)

⭕ `predicate`: is the type `T` exactly an array and not a tuple.

> [`At<A, N, Fail = never>`](ts/array_plus/array.ts#L19)

🔨 `utilities`: gets the element type at index `N` in the array `A`.

> `CommonPropKeys<A>`

🔨 `utilities`: gets common keys inside the records in the array `A` (deprecate `CommonKeys`).

> [`Concat<A, B>`](ts/array_plus/array.ts#L38)

🔨 `utilities`: `[...A, ...B]`.

> `CreateTuple<L, T>`

🔨 `utilities`: creates `tuple<T>` with `L` number of elements.

> `drop(array, value)`

🔨 `utilities`: drop a particular value from an array.

> `DropFirst<A>`

🔨 `utilities`: drops the first value type of `A`.

> `DropLast<A>`

🔨 `utilities`: drops the last value type of `A`.

> `DropMatch<A, Criteria>`

🔨 `utilities`: drops entries matching `Criteria` in array or tuple `A`.

> `DropUndefined<A>`

🔨 `utilities`: drop undefined entries from array of tuple `A`.

> `Filter<A, Criteria>`

💀🔨 `deprecated`,`utilities`: filter the array or tuple `A`, keeping entries satisfying `Criteria`. **Deprecated. Renaming to `KeepMatch`**

> `FindFirst<A, Criteria>`

🔨 `utilities`: gets the first type satisfying `Criteria`.

> `FindLast<A, Criteria>`

🔨 `utilities`: gets the last type satisfying `Criteria`.

> `Head<A>`

🔨 `utilities`: gets the first entry in the array.

> `IntersectOfProps<A, K>`

🔨 `utilities`: gets the intersect of `A[K]` types (deprecate `MapToProp`)

> `KeepMatch<A, Criteria>`

🔨 `utilities`: keeps entries satisfying `Criteria` in array or tuple `A`.

> `Last<A>`

🔨 `utilities`: gets the last type of array or tuple.

> `literalArray(...entries)`

🔨 `utilities`: return an array whose items are restricted to the provided literals.

> `PadLeft<A, Total, PadWith>`

🔨 `utilities`: pads `A` with `PadWith` if the length of `A` is less than `L`.

> `reduceWhile()`

🔨 `utilities`: `reduce()` with predicate for early termination. \
  A simple version of the same function in the `ramda` package.

> `Reverse<A>`

🔨 `utilities`: reverses the order of `A`.

> `Some<A, Criteria>`

🔨 `utilities`: true if some elements in `A` matches `Criteria`.

> `Tail<A>`

🔨 `utilities`: Gets the types of a tuple except the first entry.

> `UnionOfProps<A, K>`

🔨 `utilities`: gets the union of `A[K]` types (deprecate `PropUnion`).

> `UnionOfValues<A>`

🔨 `utilities`: gets the union of value types in `A` (deprecate `ArrayValue`).

> [`ArrayPlus.IndexAt<A, N, Fail = never>`](ts/array_plus/array_plus.ts#L23)

🔨 `utilities`: gets the normalized index for `A`.

> [`ArrayPlus.IsIndexOutOfBound<A, N, Then = true, Else = false>`](ts/array_plus/array_plus.ts#L62)

⭕ `predicate`: is `N` an out of bound index of `A`. Supports negative numbers.

### bigint

> [`BigintType<T, Then = T, Else = never>`](./ts/bigint/bigint_type.ts#L15)

↪️ `parse`: if `T` is `bigint` or bigint literal.

> [`IsBigint<T, Then = true, Else = false>`](./ts/bigint/bigint_type.ts#L33)

⭕ `predicate`: if `T` is `bigint` or bigint literal.

> [`NotBigintType<T, Then = T, Else = never>`](./ts/bigint/bigint_type.ts#L47)

↪️ `parse`: if `T` is not `bigint` or bigint literal.

> [`IsNotBigInt<T, Then = true, Else = false>`](./ts/bigint/bigint_type.ts#L61)

⭕ `predicate`: if `T` is not `bigint` or bigint literal.

> [`StrictBigintType<T, Then = T, Else = never>`](./ts/bigint/strict_bigint_type.ts#L15)

↪️ `parse`: if `T` is exactly `bigint`.

> [`IsStrictBigint<T, Then = true, Else = false>`](./ts/bigint/strict_bigint_type.ts#L33)

⭕ `predicate`: if `T` is exactly `bigint`.

> [`NotStrictBigintType<T, Then = T, Else = never>`](./ts/bigint/strict_bigint_type.ts#L47)

↪️ `parse`: if `T` is not exactly `bigint`.

> [`IsNotStrictBigint<T, Then = true, Else = false>`](./ts/bigint/strict_bigint_type.ts#L61)

⭕ `predicate`: if `T` is not exactly `bigint`.

### boolean

> [`BooleanType<T>`](./ts/boolean/readme.md#type-checking)

↪️ `parse`: `T === boolean`.

> [`IsBoolean<T>`](./ts/boolean/readme.md#type-checking)

⭕ `predicate`: `T === boolean`

> [`NotBooleanType<T>`](./ts/boolean/readme.md#type-checking)

↪️ `parse`: `T !== boolean`.

> [`IsNotBoolean<T>`](./ts/boolean/readme.md#type-checking)

⭕ `predicate`: `T !== boolean`

### function

> [`FunctionType<T>`](./ts/function/readme.md#type-checking)

↪️ `parse`: `T === function`.

> [`IsFunction<T>`](./ts/function/readme.md#type-checking)

⭕ `predicate`: `T === function`

> [`NotFunctionType<T>`](./ts/function/readme.md#type-checking)

↪️ `parse`: `T !== function`.

> [`IsNotFunction<T>`](./ts/function/readme.md#type-checking)

⭕ `predicate`: `T !== function`

> `AnyFunction<P, R>`

🔨 `utilities`: a generic type for any function

> `ExtractFunction<F>`

🔨 `utilities`: extract the function signature from a type `F`.

> `extractFunction(fn: F)`

🔨 `utilities`: adjust type of `fn` to its function signature only.

> `inspect<T>(value: T, inspector?: (v: T) => void)`

🔨 `utilities`: inspect a value and return it. Inspector defaults to `console.dir()`

### never

> [`NeverType<T>`](./ts/never/readme.md#type-checking)

↪️ `parse`: `T === never`.

> [`IsNever<T>`](./ts/never/readme.md#type-checking)

⭕ `predicate`: `T === never`

> [`NotNeverType<T>`](./ts/never/readme.md#type-checking)

↪️ `parse`: `T !== never`.

> [`IsNotNever<T>`](./ts/never/readme.md#type-checking)

⭕ `predicate`: `T !== never`

### null

> [`NullType<T>`](./ts/null/readme.md#type-checking)

↪️ `parse`: `T === null`.

> [`IsNull<T>`](./ts/null/readme.md#type-checking)

⭕ `predicate`: `T === null`

> [`NotNullType<T>`](./ts/null/readme.md#type-checking)

↪️ `parse`: `T !== null`.

> [`IsNotNull<T>`](./ts/null/readme.md#type-checking)

⭕ `predicate`: `T !== null`

### number

> [`NumberType<T, Then = N, Else = never>`](./ts/number/number_type.ts#L14)

↪️ `parse`: is the type `T` `number`.

> [`IsNumber<T, Then = true, Else = false>`](./ts/number/number_type.ts#L27)

⭕ `predicate`: is the type `T` `number`.

> [`NotNumberType<T, Then = T, Else = never>`](./ts/number/number_type.ts#L40)

↪️ `parse`: is the type `T` not `number`.

> [`IsNotNumber<T, Then = true, Else = false>`](./ts/number/number_type.ts#L53)

⭕ `predicate`: is the type `T` not `number`.

> [`StrictNumberType<T, Then = N, Else = never>`](./ts/number/strict_number_type.ts#L19)

↪️ `parse`: is the type `T` exactly `number`.

> [`IsStrictNumber<T, Then = true, Else = false>`](./ts/number/strict_number_type.ts#L41)

⭕ `predicate`: is the type `T` exactly `number`.

> [`NotStrictNumberType<T, Then = T, Else = never>`](./ts/number/strict_number_type.ts#L55)

↪️ `parse`: is the type `T` not exactly `number`.

> [`IsNotStrictNumber<T, Then = true, Else = false>`](./ts/number/strict_number_type.ts#L69)

⭕ `predicate`: is the type `T` not exactly `number`.

### numeric

> [`Numeric`](./ts/numeric/number.ts#L4)

↪️ `parse`: either `number` or `bigint`.

> [`Zero`](ts/numeric_plus/number.ts#L9): `0` in `number` or `bigint`.

⭕ `predicate`: `T === number`

> [`Integer<N, Then = N, Else = never>`](./ts/numeric/integer.ts#L15)

↪️ `parse`: is integer.

> [`IsInteger<N, Then = true, Else = false>`](./ts/numeric/integer.ts#L32)

⭕ `predicate`: is integer.

> [`NotInteger<N, Then = N, Else = never>`](./ts/numeric/integer.ts#L45)

↪️ `parse`: is not integer.

> [`IsNotInteger<N, Then = true, Else = false>`](./ts/numeric/integer.ts#L60)

⭕ `predicate`: is not integer.

> [`IsWhole<N, Then = true, Else = false>`](./ts/numeric/integer.ts#L75)

💀⭕ `deprecated`, `predicate`: is integer. Use `IsInteger` instead.

> [`Negative<N, Then = N, Else = never>`](./ts/numeric/negative.ts#L19)

↪️ `parse`: is negative.

> [`IsNegative<N, Then = true, Else = false>`](./ts/numeric/negative.ts#L53)

⭕ `predicate`: is negative.

> [`NonNegative<N, Then = N, Else = never>`](./ts/numeric/negative.ts#L69)

↪️ `parse`: is not negative.

> [`IsNonNegative<N, Then = N, Else = never>`](./ts/numeric/negative.ts#L101)

⭕ `predicate`: is not negative.

> [`Positive<N, Then = N, Else = never>`](./ts/numeric/positive.ts#15)

↪️ `parse`: is positive.

> [`IsPositive<N, Then = true, Else = false>`](./ts/numeric/positive.ts#L36)

⭕ `predicate`: is positive.

> [`NotPositive<N, Then = N, Else = never>`](./ts/numeric/positive.ts#48)

↪️ `parse`: is not positive.

> [`IsNotPositive<N, Then = true, Else = false>`](./ts/numeric/positive.ts#L60)

⭕ `predicate`: is not positive.

### object

> `filterKey()`: type adjusted filter by key.

> `findKey()`: type adjusted find by key.

> `forEachKey()`: type adjusted for each by key.

> `HasKey<T, K>`: predicate type checking `T` has key `K`.

> `hasKey()`: function of `HasKey`.

> `IsRecord<T>`: `logical` predicate for `Record`.

> `KeysWithDiffTypes<A, B>`: gets the keys common in `A` and `B` but with different value type.

> `mapKey()`: type adjusted map by key.

> `RecordValue<R>`: gets the value type `T`from `Record<any, T>` [video](https://www.youtube.com/watch?v=1J7xK6FUqPw).

> `reduceByKey()`: type adjusted reduce by key.

> `someKey()`: type adjusted some by key.

> `SpreadRecord<A, B>`: type for `{...a, ...b}` when both `a` and `b` are `Record`\
  for array, just do `[...A, ...B]`.

### Promise

> `AwaitedProp<T, V>`: `Awaited` on specified props `P` in `T`.

> `isPromise<R>(subject: any)`: `isPromise()` type guard.

> `MaybePromise<T>`: Alias of `T | Promise<T>`.

> `PromiseValue<P>`: Gets the type within the Promise.

> `PromiseValueMerge<P1, P2, ...P9>`: Merge the values of multiple promises.

> `mapSeries()`: Similar to `bluebird.mapSeries()` but works with `async`/`await`.

> `transformMaybePromise(value, transformer)`: Apply the `transformer` to the `value`.\
  It is also exported under `MaybePromise.transform()`.

### string

> [`StringType<T>`](ts/string/readme.md#type-checking)

↪️ `parse`: is `string`.

> [`IsString<T>`](ts/string/readme.md#type-checking)

⭕ `predicate`: is `string`.

> [`NotStringType<T>`](ts/string/readme.md#type-checking)

↪️ `parse`: is not `string`.

> [`IsNotString<T>`](ts/string/readme.md#type-checking)

⭕ `predicate`: is not `string`.

### symbol

> [`SymbolType<T>`](ts/symbol/readme.md#type-checking)

↪️ `parse`: is `symbol`.

> [`IsSymbol<T>`](ts/symbol/readme.md#type-checking)

⭕ `predicate`: is `symbol`.

> [`NotSymbolType<T>`](ts/symbol/readme.md#type-checking)

↪️ `parse`: is not `symbol`.

> [`IsNotSymbol<T>`](ts/symbol/readme.md#type-checking)

⭕ `predicate`: is not `symbol`.

### tuple

> [`TupleType<T>`](ts/tuple/readme.md#type-checking)

↪️ `parse`: is a tuple.

> [`IsTuple<T>`](ts/tuple/readme.md#type-checking)

⭕ `predicate`: is a tuple.

> [`NotTupleType<T>`](ts/tuple/readme.md#type-checking)

↪️ `parse`: is not a tuple.

> [`IsNotTuple<T>`](ts/tuple/readme.md#type-checking)

⭕ `predicate`: is not a tuple.

### undefined

> [`UndefinedType<T>`](./ts/undefined/readme.md#type-checking)

↪️ `parse`: `T === undefined`.

> [`IsUndefined<T>`](./ts/undefined/readme.md#type-checking)

⭕ `predicate`: `T === undefined`

> [`NotUndefinedType<T>`](./ts/undefined/readme.md#type-checking)

↪️ `parse`: `T !== undefined`.

> [`IsNotUndefined<T>`](./ts/undefined/readme.md#type-checking)

⭕ `predicate`: `T !== undefined`

### unknown

> [`UnknownType<T>`](./ts/unknown/readme.md#type-checking)

↪️ `parse`: `T === unknown`.

> [`IsUnknown<T>`](./ts/unknown/readme.md#type-checking)

⭕ `predicate`: `T === unknown`

> [`NotUnknownType<T>`](./ts/unknown/readme.md#type-checking)

↪️ `parse`: `T !== unknown`.

> [`IsNotUnknown<T>`](./ts/unknown/readme.md#type-checking)

⭕ `predicate`: `T !== unknown`

### void

> [`VoidType<T>`](./ts/void/readme.md#type-checking)

↪️ `parse`: `T === void`.

> [`IsVoid<T>`](./ts/void/readme.md#type-checking)

⭕ `predicate`: `T === void`

> [`NotVoidType<T>`](./ts/void/readme.md#type-checking)

↪️ `parse`: `T !== void`.

> [`IsNotVoid<T>`](./ts/void/readme.md#type-checking)

⭕ `predicate`: `T !== void`

## Constant Types

> `KeyTypes`: type of all keys.

> `PrimitiveTypes`: all primitive types, including `Function`, `symbol`, and `bigint`.

> `ComposableTypes`: Types that can contain custom properties. i.e. `object`, `array`, `function`.

> `NonComposableTypes`: Types that cannot contain custom properties. i.e. not composable.

## JSON Support

> `JSONPrimitive`: primitive types valid in JSON

> `JSONObject`: JSON object

> `JSONArray`: JSON array

> `JSONTypes`: all JSON compatible types.

> `JSONTypes.get<T>(obj, ...props)`: get a cast value in JSON

```ts
import { JSONTypes } from 'type-plus'

const someJson: JSONTypes = { a: { b: ['z', { c: 'miku' }]}}

JSONTypes.get<string>(someJson, 'a', 'b', 1, 'c') // miku
```

## Type manipulation

> `ANotB<A, B>`: get object with properties in `A` and not in `B`, including properties with a different value type.

> `BNotA<A, B>`: flip of `ANotB`

> `as<T>(subject)`: assert `subject` as `T`. Avoid ASI issues such as `;(x as T).abc`

> `asAny(subject)`: assert `subject` as `any`. Avoid ASI issue such as `;(x as any).abc`

> `EitherAnd<A, B, [C, D]>`: combines 2 to 4 types as `A | B | (A & B)`. This is useful for combining options. **Deprecated**. Renamed to `EitherOrBoth`.

> `EitherOrBoth<A, B, [C, D]>`: combines 2 to 4 types as `A | B | (A & B)`. This is useful for combining options [video](https://youtu.be/jBxx03NT4Ik).

> `Except<T, K>`: Deprecated. Same as `Omit<T, K>`.

> `ExcludePropType<T, U>`: excludes type `U` from properties in `T`.

> `KeyofOptional<T>`: `keyof` that works with `Record<any, any> | undefined`.

> `KnownKeys<T>`: extract known (defined) keys from type `T`.

> `LeftJoin<A, B>`: left join `A` with `B`

> `NonNull<T>`: remove `null`

> `NonUndefined<T>`: remove `undefined`

> `Omit<T, K>`: From `T`, pick a set of properties whose keys are not in the union `K`. This is the opposite of `Pick<T, K>`.

> `OptionalKeys<T>`: gets keys of optional properties in `T`.

> `PartialExcept<T, U>`: Deprecated. Same as `PartialOmit<T, U>`.

> `PartialOmit<T, U>`: makes the properties not specified in `U` becomes optional.

> `PartialPick<T, U>`: makes the properties specified in `U` becomes optional.

> `Pick<T, K>`: pick properties `K` from `T`. Works with unions.

> `RecursivePartial<T>`: make type `T` optional recursively.

> `RecursiveRequired<T>`: make type `T` required recursively.

> `ReplaceProperty<T, K, V>`: replace property `K` in `T` with `V`.

> `RequiredKeys<T>`: gets keys of required properties in `T`.

> `RequiredPick<T, U>`: makes the properties specified in `U` become required.

> `RequiredExcept<T, U>`: makes the properties not specified in `U` become required.

> `RecursiveIntersect<T, U>`: intersect type `U` onto `T` recursively.

> `ValueOf<T>`: type of the value of the properties of `T`.

> `Widen<T>`: widen literal types.

> PropType: ...no helper type for this. Just do `YourType['propName']`.

## Type Predicates

Type predicates are type alias that returns `true` or `false`.
They can be used to compose complex types.

> `HasKey<T, K>`: predicate type checking `T` has key `K`.

> `IsAny<T>`: `T === any` (updated to impl: [expect-type]).

> `IsBoolean<T>`: check for `boolean`, but not for `true` nor `false`.

> `IsDisjoint<A, B>`: is `A` and `B` is a disjoint set.

> `IsEmptyObject<T>`: is `T === {}`.

> `IsLiteral<T>`: is `T` a literal type (literal string or number).

### Logical

> `If<Condition, Then = true, Else = false>`: if statement.

> `And<A, B, Then = true, Else = false>`: logical `AND`.

> `Or<A, B, Then = true, Else = false>`: logical `OR`.

> `Xor<A, B, Then = true, Else = false>`: logical `XOR`.

> `Not<X, Then = true, Else = false>`: logical `NOT`.

Note that these types work correctly with the `boolean` type.
e.g.:

> `And<boolean, true> -> boolean`

> `Not<boolean> -> boolean`

There is a problem with generic distribution: <https://github.com/microsoft/TypeScript/issues/41053>
So you may encounter some weird behavior if your logic is complex.

## Math

The math types in `type-plus` works with most numeric types.

It works with `number` and `bigint`, positive and negative number, including floating point numbers.

It will cast the type between `number` and `bigint` if needed.

> `Abs<N, Fail=never>`: `Abs(N)`.

> `Max<A, B, Fail=never>`: `max(A, B)`

> `GreaterThan<A, B>`: `A > B`.

> `Add<A, B>`: `A + B`.

> `Subtract<A, B>`: `A > B`.

> `Increment<A>`: alias of `Add<A, 1>`.

> `Decrement<A>`: alias of `Subtract<A, 1>`.

> `Multiply<A, B`: `A * B`.

## Utility Functions

> `amend(subject)...`

🔨 `utilities`: amend subject as union or intersect of `T`.

> `facade(subject, ...props)`

🔨 `utilities`: create a facade of `subject`.

> `getField(subject, key, defaultValue)`

🔨 `utilities`: get a field from a subject. Works against nullable and optional subject.

> `hasKey()`

🔨 `utilities`: function of `HasKey`.

> `hasProperty(value, prop)`

🔨 `utilities`: assert `value` has property `prop`. This will pick the correct union type.

> `isConstructor(subject)`

🔨 `utilities`: type guard `subject` is a constructor.

> `isSystemError(code, err)`

🔨 `utilities`: type guard `err` with NodeJS error code.

> `omit(obj, ...props)`: omit properties from `obj`.

> `pick(obj, ...props)`: pick properties from `obj`.

> `record<K, V>(value?)`: create a `Record<K, V>` without extra object prototype.

> `record<R>(value?)`: create a record `R` (e.g. `{ a: number }`) without extra object prototype.

> `required(...)`: merge options and remove `Partial<T>`. From [`unpartial`](https://github.com/unional/unpartial)

> `requiredDeep(...)`: merge options deeply and remove `Partial<T>`. From [`unpartial`](https://github.com/unional/unpartial)

> `split(target, ...splitters)`: split one object into multiple objects.

> `stub<T>(value)`: stub a particular type `T`.

> `stub.build<T>(init?)`: build a stub for particular type `T`.

> `typeOverrideIncompatible<T>()`: override only the incompatible portion between two types.

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

> `unpartial()`: merge options and remove `Partial<T>` values. From [`unpartial`](https://github.com/unional/unpartial)

> `context()`: a context builder. This is useful to build context for functional programming.\
  It is a sync version of the `AsyncContext` from [async-fp](https://unional/async-fp).

```ts
import { context } from 'type-plus'

// { a: 1, b: 2 }
const ctx = context({ a: 1 })
  .extend(c => ({ b: c.a + 1 }))
  .build()
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

## Functional Types

> `ChainFn<T>: T`: chain function that returns the input type.

> `compose(...fns): F`: compose functions

## Attribution

Some code in this library is created by other people in the TypeScript community.
I'm merely adding them in and maybe making some adjustments.
Whenever possible, I add attribution to the person who created those **codes** in the file.

## Useful Tips

> <https://github.com/microsoft/TypeScript/wiki/Performance>

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
[assertion_functions]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions
[type_guard]: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
