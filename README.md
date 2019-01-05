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

### `filterKey()`

Type adjusted filter by key.

### `findKey()`

Type adjusted find by key.

### `forEachKey()`

Type adjusted for each by key.

### `mapKey()`

Type adjusted map by key.

### `PartialPick<T, U>`

Makes the properties specified in `U` becomes optional.

### `PartialExcept<T, U>`

Makes the properties not specified in `U` becomes optional.

### `reduceKey()`

Type adjusted reduce by key.

### `RecursiveIntersect<T, U>`

Intersect type U onto T recursively.

### `RecursivePartial<T>`

Make type T optional recursively.

### `RecursiveRequired<T>`

Make type T required recursively.

### `RequiredPick<T, U>`

Makes the properties specified in `U` becomes required.

### `RequiredExcept<T, U>`

Makes the properties not specified in `U` becomes required.

### `ValueOf<T>`

Type of the value of the properties of T.

### `KeyTypes`

Type of all keys.

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
