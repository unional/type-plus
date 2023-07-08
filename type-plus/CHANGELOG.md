## [4.18.1](https://github.com/unional/type-plus/compare/v4.18.0...v4.18.1) (2022-12-09)

## 7.6.0

### Minor Changes

- 036094ba5: Support `Delete` and `Insert` for `SplitAt`.

### Patch Changes

- e76c6895d: Add keywords

## 7.5.0

### Minor Changes

- 4f1e6e813: Add `UnionType` and `IsUnion`
- 1bee3922b: Improve `FindFirst` and `ArrayPlus.Find` to support `union_miss` and `never` cases,
  and some bug fixes.
- b3d0af0d2: Export the improved `Required` type.
- bc535d4dd: Support customization for `Head` and `Tail`
- d2f97ca18: Add options support for:

  - `TupleType`, `IsTuple`, `NotTupleType`, `IsNotTuple`
  - `DropFirst`, `DropLast`,
  - `FindFirst`, `ArrayPlus.FindFirst`, `TuplePlus.FindFirst`

  Add `MergeOptions`.
  Add `NotUnknownOr` (all use cases are handled by `MergeOptions` at the moment)

- 94bb1c00c: Improve `FindFirst`,
  add `ArrayPlus.Find` and `TuplePlus.Find`
- 4e7e31098: Clean up `CommonPropKeys`.

  Add `ArrayPlus.CommonPropKeys` and `TuplePlus.CommonPropKeys`.
  Add support of `caseNever`.

- 7a647ca41: Support override `never` case for `TupleType`, `IsTuple`, `IsNotTuple`, and `NotTupleType`

### Patch Changes

- 91211c9b5: Rename `caseNoMatch` to `caseNotMatch`.
  Rename `caseUnionMiss` to `caseUnionNotMatch`.

  Change `caseUnionNotMatch` default from `undefined` to `never`,
  making it defaults to the type behavior instead of JavaScript behavior.

- 8a60488be: Move TestType under `testType` so that it is exported

## 7.4.0

### Minor Changes

- b55a61de3: Deprecate `drop()` as it does not sufficiently support the needed types.
- cb2c68694: Add `extends()`, `union()`, `intersect()`, `union_*`, `intersect_*` to `InspectedType`.

### Patch Changes

- 81158731b: Separate `Filter` and `PadStart` for array and tuple
- 9f08f5635: Improve `Head` and `Last` to support empty_tuple override
- 9f08f5635: Improve `IntersectOfProps` to work with array just for completeness.
- 810181628: Improve `DropFirst` and `DropLast` to support overriding cases.
- 58da4b3ee: Update export field to export `./package.json`.
- 2454ab228: Improve `CommonPropKeys`

## 7.3.1

### Patch Changes

- 90eb2a492: Update package.json try fixing readme references

## 7.3.0

### Minor Changes

- e8547eb88: Add `IsOptionalKey<T, K>`.
- bd6c695a2: Add `OptionalProps<T>`.
  Improve `OptionalKeys<T>` and `IsOptionalKey<T, K>`
- d3faa0bff: Add `OptionalKeys<T>`

### Patch Changes

- d214ce6d7: Improve `testType.inspect<T>(fn)` to provide more information about `T`.

  Not consider as breaking change as the function is not expected to be use in any code.

## 7.2.1

### Patch Changes

- 6be5fa7b0: Improve `IsLiteral` type to support `boolean`, `bigint`, and `symbol`.
- 0f0b9f8e0: Improve `LeftJoin` type behavior.

## 7.2.0

### Minor Changes

- a52cce02: Add `testType.inspect<T>(fn)` for easy type inspection.

## 7.1.1

### Patch Changes

- 26537d8e: Improve `RecursivePartial` to work with function type.
  Also add `| undefined` to make it compliant with `exactOptionalPropertyTypes`.

## 7.1.0

### Minor Changes

- aacb1ff4: Add `AnyOrNeverType` for parity.

  Update some code's JSDocs.

### Patch Changes

- ede34c22: Improve `exports` field
- 74a71e35: remove extra empty `{}` for `LeftJoin`
- 2d74ff0b: Support `verbatimModuleSyntax`

## 7.0.1

### Patch Changes

- 946c6023: Remove `@internal`. It is causing those types to be skipped from output (cjs/esm/\*.d.ts).

## 7.0.0

### Major Changes

- 91c954fb: Remove `Digit` and `DigitArray`.

  They are internal types to begin with.
  They were exported probably to fix the "type cannot be named" error.

- 469c8bd2: Fix array `PadStart`/`PadLeft` that triggers an infinite loop.

  Change default `PadWith` from `any` to `unknown` (breaking).

### Minor Changes

- e11d43c5: Expose `FindLast` also as `ArrayPlus.FindList`.

  Improved its handling of array.

- 25e5fcb2: add `NumericPlus`
- ee14247c: Add `ArrayPlus.SplitAt`
- a49abe20: Mark the following code as deprecated:

  - `isType.t()`
  - `isType.f()`
  - `isType.never()`

- 4352d514: Add `StringToNumber`, `StringToBigint`, and `StringToNumeric`
- e93e366d: Add alternative `Partial<T>` type that works with `exactOptionalPropertyTypes`.
- 10af3634: Add `ArrayPlus.Reverse<A>`
- 82ffd7d9: Add `NumericToString`
- 72aca9d0: Add `MathPlus.ToNegative`
- 09495bec: Add `ArrayPlus.Entries<A>`.
- 3e0e199b: Add remaining types to `testType.*`.

  `testType` is changed to a proxy to simplify implementation.

- 73bbcf0e: Add `PadStart`, deprecase `PadLeft`
- 65e84c4b: Expose `FindFirst` also as `ArrayPlus.Find`.

  Improved its handling of array.

- d2997ded: Deprecate `Equal` and `NotEqual`. They are renamed to `IsEqual` and `IsNotEqual`.

  `Equal` and `NotEqual` will be changed to `filter` variant (a.k.a. `parse` variant) in the future.

- 180a455e: Add `TuplePlus.PadStart`.
- 7bf5d39e: Add `StrictCanAssign<A,B>` and `testType.strictCanAssign()`
- 010a7880: Deprecate `assertType(subject constructor)`.
  Add `T/F` to `Extendable` and `NotExtendable`.
- 74cc6545: Alias `Some` under `ArrayPlus.Some`.
- 4054c64b: `GreaterThan` and `Max` now support floating point and negative numbers, and `bigint`

### Patch Changes

- 84617522: `At` should return `V | undefined` for tuple when `N` is `number` (or `any` which includes `number`).
- aaffd23e: fix `Some<Array<number | string>, number>` to return `boolean`.
  This is because besides `Array<number | string>` can be `[1, 'a']`,
  it can also be:

  ```ts
  const v: number | string = 123;

  const a: Array<number | string> = [v];
  ```

  So `Some<Array<number | string>, number>` should distribute and return `boolean`.

- 4878eb07: `At` should return `V | undefined` for array.
- afc1840c: Add `Upper` and `Lower` for `IndexAt`.

  This allow fine-grained control over the `IndexAt` behavior,
  when the value is out of bounds.

  This is used in cases where out-of-bounds values are coarsen to the upper and lower bound of the subject array.

- d31ea31f: Improve `Abs` to work with `bigint`

## 6.8.1

### Patch Changes

- caa70e9e: Support isolated stub.builder use case.

## 6.8.0

### Minor Changes

- 38b59e9b: Add `stub.builder()`
- c2b6f375: Add more `testType.*`:

  `testType.undefined()`
  `testType.null()`
  `testType.bigint()`
  `testType.strictBigint()`
  `testType.string()`
  `testType.strictString()`

### Patch Changes

- 38b59e9b: `stub.build()` should not accept no `init` value.

## 6.7.1

### Patch Changes

- 963f8a4a: Pass stub value to init function for `stub()`

## 6.7.0

### Minor Changes

- cf32375f: Add `NoInfer<T>` and improve `stub()`

## 6.6.0

### Minor Changes

- e098b7c3: Add `StringSplit`
- 6a4bfd71: Add `StringIncludes` type.

### Patch Changes

- a9825e69: Update JSDocs
- 7496bbaf: Remove extra unique symbol.
- f52c794b: Fix `Equal<A, B>` to handle optional param.

## 6.5.0

### Minor Changes

- 99afa70a: Add `Failed` and `FailedT` error type.

### Patch Changes

- c741e86e: Improve `Brand` and `Flavor` to handle all types.
  Added `Branded` and `Flavored` interface to improve their rendering in IDE.

## 6.4.0

### Minor Changes

- bcc4b094: Adding a new set of types for type-level programming.

  - `IsAnyOrNever`
  - `AnyType`, `IsAny`, `NotAnyType`, `IsNotAny`
  - `NeverType`, `IsNever`, `NotNeverType`, `IsNotNever`
  - `StrictBooleanType`, `IsStrictBoolean`, `NotStrictBooleanType`, `IsNotStrictBoolean`
  - `BooleanType`, `NotBooleanType`, `IsNotBoolean`
  - `TrueType`, `IsTrue`, `NotTrueType`, `IsNotTrue`
  - `FalseType`, `IsFalse`, `NotFalseType`, `IsNotFalse`
  - `ObjectType`, `IsObject`, `NotObjectType`, `IsNotObject`
  - `StrictFunctionType`, `IsStrictFunction`, `NotStrictFunctionType`, `IsNotStrictFunction`
  - `FunctionType`, `IsFunction`, `NotFunctionType`, `IsNotFunction`
  - `UndefinedType`, `IsUndefined`, `NotUndefinedType`, `IsNotUndefined`
  - `NumberType`, `IsNumber`, `NotNumberType`, `IsNotNumber`
  - `StrictNumberType`, `IsStrictNumber`, `NotStrictNumberType`, `IsNotStrictNumber`
  - `StringType`, `IsString`, `NotStringType`, `IsNotString`
  - `StrictStringType`, `IsStrictString`, `NotStrictStringType`, `IsNotStrictString`
  - `SymbolType`, `IsSymbol`, `NotSymbolType`, `IsNotSymbol`
  - `BigIntType`, `IsBigInt`, `NotBigIntType`, `IsNotBigInt`
  - `StrictBigIntType`, `IsStrictBigInt`, `NotStrictBigIntType`, `IsNotStrictBigInt`
  - `VoidType`, `IsVoid`, `NotVoidType`, `IsNotVoid`
  - `UnknownType`, `IsUnknown`, `NotUnknownType`, `IsNotUnknown`
  - `Positive`, `IsPositive`, `NotPositive`, `IsNotPositive`

  Adding a new `testType` for testing.
  It provides better testing support compares to `isType` and `assertType`.

  Improve:

  - `Equal`: to support all known scenarios.

## 6.3.0

### Minor Changes

- 1168acaa: Add `TupleType`

### Patch Changes

- 97888e9e: `Equal` handles tuple

## 6.2.0

### Minor Changes

- bc82e907: Fix number types to support `never` correctly.

  Add `IsInteger`, `Positive`.

### Patch Changes

- 23fd42a3: Fix `NumberType` to handle `any` and union.

## 6.1.0

### Minor Changes

- b6403520: Add `ArrayType<A>`
- 569ff770: Export `Concat` under `ArrayPlus`.
- 15257ec3: Add `ArrayPlus.IsIndexOutOfBound<A, N>`
- 82bed0e2: Add `ArrayPlus.IndexAt`.

  Update `At` to use `IndexAt` to get consistent results.

- 015d046e: Fix `IsAny` and add to `AnyType`.
  Now using the same mechanism from `ts-essentials`.
- 3ff303ce: Add `NumberType<T>`

### Patch Changes

- 812949be: Default `CreateTuple<_, T>` to `unknown`.

  With TypeScript 5.0, the tuple size limit is now 9999.

- 52d62003: Clean up type imports.
  Use `Awaited` instead of `PromiseValue`.

## 6.0.0

### Major Changes

- 3a01eb6a: CJS target upgraded to ES2020

### Minor Changes

- 35b489de: Add the following:

  - `isType.never`
  - `Numeric`
  - `Zero`
  - `Integer`
  - `Negative`
  - `NonNegative`
  - `NumberPlus.Numeric`
  - `NumberPlus.Zero`
  - `NumberPlus.Integer`
  - `NumberPlus.Negative`
  - `NumberPlus.NonNegative`
  - `At`
  - `ArrayPlus.At`
  - `ArrayPlus.Concat`

### Patch Changes

- 33b78a76: Add `module` field for `webpack` 4 compatibility.

## 5.6.0

### Minor Changes

- 15443f6d: `stub.build()` now supports an initializer function.
  This allows the init value to be randomized.

## 5.5.2

### Patch Changes

- ce86656f: defaults inspector of `inspect()` to `console.dir()`

## 5.5.1

### Patch Changes

- b02fbae2: Each `extender` will now only execute once,
  across the extend tree.

## 5.5.0

### Minor Changes

- 0247123b: Add `AwaitedProps<T, P>`

  This is useful when working with `context()` where the props are Promise

### Patch Changes

- 6b109359: Allow `context().extend()` to specify type

## 5.4.1

### Patch Changes

- 48520281: Fix `context()` to support `extender` which only needs a partial of the current context.

## 5.4.0

### Minor Changes

- 9add14dc: Add `context()` builder

## 5.3.0

### Minor Changes

- d7338cb2: Add `Then, Else` support to logical types

### Patch Changes

- 29cf3b12: Update JSDocs for ExtractFunction
- 29cf3b12: Improve `Equal<A,B>`
- 5e21ddfe: Update JSDoc for `compose()`

## 5.2.0

### Minor Changes

- 340d54e: Add subject passthrough to object key utilities

### Patch Changes

- f0761b0: Mark inspector param as `Readonly<T>`

## 5.1.0

### Minor Changes

- 1a51b1f: add `inspect()`
- b203aab: deprecates `PromiseValue`. Use the built-in `Awaited<T>` instead.

## 5.0.0

### Major Changes

- d43213f: Deprecates `isConstructor`.
  It cannot reliably detect non-constructors as normal functions and transpiled arrow functions are both returned true.

  Add `isInstanceof()` to do `instanceof` check against `unknown` or union types of constructor and other types.

  `isType()` does not accept `AnyConstructor` anymore. Use `isInstanceof()` instead (breaking).

### Bug Fixes

- release ci ([ed58811](https://github.com/unional/type-plus/commit/ed588111e6cde3cd65f2bcbe3dc474b03c498483))

# [4.18.0](https://github.com/unional/type-plus/compare/v4.17.0...v4.18.0) (2022-11-18)

### Features

- add extractFunction() ([1192e49](https://github.com/unional/type-plus/commit/1192e494e48b24a4d27ed68487f52eb27945709e))

# [4.17.0](https://github.com/unional/type-plus/compare/v4.16.0...v4.17.0) (2022-11-08)

### Features

- add ExtractFunction ([41083d0](https://github.com/unional/type-plus/commit/41083d09be70fde45e2b957cfe722f5ce72e513b))

# [4.16.0](https://github.com/unional/type-plus/compare/v4.15.2...v4.16.0) (2022-10-31)

### Features

- add `PromiseOrValue<T>` ([440d172](https://github.com/unional/type-plus/commit/440d172fcba1b0fa029f08b82ae9cba853617ddd))

## [4.15.2](https://github.com/unional/type-plus/compare/v4.15.1...v4.15.2) (2022-10-30)

### Bug Fixes

- improve Brand type ([9934d91](https://github.com/unional/type-plus/commit/9934d917e1d48876afcf9a40c7594a795881da47))

## [4.15.1](https://github.com/unional/type-plus/compare/v4.15.0...v4.15.1) (2022-10-30)

### Bug Fixes

- isType to work with undefined and symbol ([ca885b9](https://github.com/unional/type-plus/commit/ca885b9c9d70351e0a8135f61804847a84edc96d))
- update isType implemention ([5aaf0f5](https://github.com/unional/type-plus/commit/5aaf0f585dba1cb10fa2599377ce7a1ea4c0d59a))

# [4.15.0](https://github.com/unional/type-plus/compare/v4.14.1...v4.15.0) (2022-10-30)

### Bug Fixes

- adjust import type ([c84e5f5](https://github.com/unional/type-plus/commit/c84e5f5cf3041f7544d0ac49818ad3862c8d443c))

### Features

- add `RecordValue<R>` ([aafafb2](https://github.com/unional/type-plus/commit/aafafb2a37f7d3a16bdde3d0dc41807676937717))

## [4.14.1](https://github.com/unional/type-plus/compare/v4.14.0...v4.14.1) (2022-10-13)

### Bug Fixes

- improve pick and omit ([b7628cb](https://github.com/unional/type-plus/commit/b7628cbb1b5c9b005abca7abea62eb761170dd1c))
- keep prototype null-ness ([af54c8e](https://github.com/unional/type-plus/commit/af54c8e7cdd6097461ca59d50a211b98904d2ab0))

# [4.14.0](https://github.com/unional/type-plus/compare/v4.13.2...v4.14.0) (2022-10-10)

### Features

- support custom record ([846aff6](https://github.com/unional/type-plus/commit/846aff691a12053713a7afa14610772f418fbaa4))

## [4.13.2](https://github.com/unional/type-plus/compare/v4.13.1...v4.13.2) (2022-10-08)

### Bug Fixes

- loosen isType() validator to accept anything ([9f0c405](https://github.com/unional/type-plus/commit/9f0c405fff752394e3c8d6280a77074e3ec6468e))

## [4.13.1](https://github.com/unional/type-plus/compare/v4.13.0...v4.13.1) (2022-09-15)

### Bug Fixes

- add `EitherOrBoth` ([9637d1e](https://github.com/unional/type-plus/commit/9637d1ef1c47e896169aa2e73acdf4bb0ae11d3b))

# [4.13.0](https://github.com/unional/type-plus/compare/v4.12.1...v4.13.0) (2022-09-15)

### Features

- add EitherAnd ([128e834](https://github.com/unional/type-plus/commit/128e834444bb98142742496b1034455541ea5c2e))

## [4.12.1](https://github.com/unional/type-plus/compare/v4.12.0...v4.12.1) (2022-09-13)

### Bug Fixes

- update unpartial ([e461a9c](https://github.com/unional/type-plus/commit/e461a9cad778ebdba4972146a29be294d52b8a02))

# [4.12.0](https://github.com/unional/type-plus/compare/v4.11.3...v4.12.0) (2022-09-12)

### Features

- add IsNever<T> ([a688567](https://github.com/unional/type-plus/commit/a688567d6f60fda7c93e21c070aaaa4414436dc9))

## [4.11.3](https://github.com/unional/type-plus/compare/v4.11.2...v4.11.3) (2022-09-12)

### Bug Fixes

- Equal<A,B> with union types ([4ad548a](https://github.com/unional/type-plus/commit/4ad548a67a79b4ecd55d4b018ad6cff4108d5405))
- handle never case ([f8376ff](https://github.com/unional/type-plus/commit/f8376ff7c86a5c4bd8f0dfa7a878387a5e8cc325))

## [4.11.2](https://github.com/unional/type-plus/compare/v4.11.1...v4.11.2) (2022-09-01)

### Bug Fixes

- export unpartial ([c561fb2](https://github.com/unional/type-plus/commit/c561fb2ff88eb63e13d0fc1ab2e682af3133ada0))

## [4.11.1](https://github.com/unional/type-plus/compare/v4.11.0...v4.11.1) (2022-07-21)

### Bug Fixes

- re-release ([4f26fcd](https://github.com/unional/type-plus/commit/4f26fcdb964dae51b8f3105c6f847fb846b4ae5c))

# [4.11.0](https://github.com/unional/type-plus/compare/v4.10.2...v4.11.0) (2022-07-21)

### Features

- add `assertType.as<T>()` ([#188](https://github.com/unional/type-plus/issues/188)) ([520547f](https://github.com/unional/type-plus/commit/520547fc8f0a644dca2bda4115cc5b7691ebea09))

## [4.10.2](https://github.com/unional/type-plus/compare/v4.10.1...v4.10.2) (2022-06-15)

### Bug Fixes

- update deps ([46d9005](https://github.com/unional/type-plus/commit/46d90053b4d2693eb84c21fe4c3f2f803d19a2b0))

## [4.10.1](https://github.com/unional/type-plus/compare/v4.10.0...v4.10.1) (2022-06-12)

### Bug Fixes

- add cjs/package.json ([58b8463](https://github.com/unional/type-plus/commit/58b84638e6ac04740f1af52f067f0e1d22ffbed3))
- keep comments ([a184caa](https://github.com/unional/type-plus/commit/a184caada7da8c6751a5a2b94c0030714562112f))
