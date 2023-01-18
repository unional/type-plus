## [4.18.1](https://github.com/unional/type-plus/compare/v4.18.0...v4.18.1) (2022-12-09)

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
