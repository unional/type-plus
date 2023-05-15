# Array

`Array<T>` or `T[]` is a type that represents an array of `T`.

## Type Checking

The `ArrayType<T>` and friends are used to check if a type is exactly `Array<T>` or not.

They are strict type checks, meaning they match only the type `Array<T>`,
and not [tuple], union, or intersection types.

```ts
import type { ArrayType } from 'type-plus'

type R = ArrayType<number[]> // number[]

type R = ArrayType<[1]> // never
type R = ArrayType<number[] | 1> // never
type R = ArrayType<number[] & { a: 1 }> // never
```

- [`ArrayType<T, Then = T, Else = never>`](array_type.ts#L15): check if `T` is an array and not a tuple.
- [`IsArray<T, Then = true, Else = false`](array_type.ts#L33): is `T` an array and not a tuple.
- [`NotArrayType<T, Then = T, Else = never>`](array_type.ts#L47): check if `T` is not an array (can be a tuple).
- [`IsNotArray<T, Then = true, Else = false>`](array_type.ts#L61): is `T` not an array (can be a tuple).

## ArrayPlus

`ArrayPlus` contains all types and type utilities related to array.
Whenever possible, these types and type utilities also work with *tuples*,
as *tuples* is a subset of array.

For *tuple* specific types and type utilities,
please check [`TuplePlus`](../tuple/readme.md#TuplePlus).

### [`ArrayPlus.At`](./array.at.ts#L18)

> `ArrayPlus.At<A, N, Fail = never>`

Gets the type of the array or tuple `A` at index `N`.

For array, it will return the union of the type of the array value and `undefined`,
as there is no way to guarantee the array has value at `N`.

```ts
type A = Array<string | number>

ArrayPlus.At<A, 0> // string | number | undefined
```

For tuple, it will return the type of the tuple value at index `N`.

```ts
type T = [number, string, 1, 2, 3]

ArrayPlus.At<T, 0> // number
ArrayPlus.At<T, -1> // 3
```

If the `N` is out of bound,
or `N` is not a valid index,
`ArrayPlus.At` will return the `Fail` case, which defaults to `never`.

### [`ArrayPlus.Concat`](./array.concat.ts#L12)

> `ArrayPlus.Concat<A, B>`

Concats two arrays or tuples.

It is just an alias of `[...A, ...B]`.
It is added for completeness.

You are encouraged to use `[...A, ...B]` directly.

### [`ArrayPlus.Entries`](./array.entries.ts#L14)

> `ArrayPlus.Entries<A>`

Returns an array of key-value pairs for every entry in the array or tuple.

Note that this is not the same as `Array.entries(A)`,
which returns an iterable interator.

```ts
ArrayPlus.Entries<Array<string | number>> // Array<[number, string | number]>
ArrayPlus.Entries<[1, 2, 3]> // [[0, 1], [1, 2], [2, 3]]
```

### [`ArrayPlus.Find`](./array.find.ts#L17)

> `ArrayPlus.Find<A, Criteria>

Returns the first type in the array or tuple that matches the `Criteria`.

If the `Criteria` is not met, it will return `never'.

For `Array<T>`, it will return `T | undefined` if `T` satisfies `Criteria`.

```ts
ArrayPlus.Find<Array<1 | 2 | 'x'>, number> // 1 | 2 | undefined

ArrayPlus.Find<[true, 1, 'x', 3], string> // 'x'
```

### [`ArrayPlus.FindLast`](./array.find_last.ts#L17)

> `ArrayPlus.FindLast<A, Criteria>

Returns the last type in the array or tuple that matches the `Criteria`.

If the `Criteria` is not met, it will return `never'.

For `Array<T>`, it will return `T | undefined` if `T` satisfies `Criteria`.

```ts
ArrayPlus.FindLast<Array<1 | 2 | 'x'>, number> // 1 | 2 | undefined

ArrayPlus.FindLast<[true, 123, 'x', 321], number> // 321
```

### [`ArrayPlus.Some`](./array.some.ts#L23)

> `ArrayPlus.Some<A, Criteria, Mode, Then, Else>`

Determines whether the array type `A` contains any elements that satisfies the specified `Criteria` type.

It operates in `loose` mode by default,
which means literal types satisfies their widened counterparts.
You can also change it to `strict` mode.

```ts
Some<string[], string> // true
Some<['a', boolean], boolean> // true
Some<['a', true], boolean> //true
 *
Some<['a', true], boolean, 'strict'> // false
```

## Builtin array methods

JavaScript has many builtin array methods.
We will try to bring them to the type-level.

Not all methods can be implemented in the type-level,
or in the same way.

For example, type-level does not support higher-level generics,
i.e. it is not possible to pass in a generic type and "invoke" it.

Therefore, methods like `map` and `reduce()` cannot be implemented generically.
They have to be implemented separately for each specific use case,
or with reduced capability.

They are exposed under the `ArrayPlus` namespace,
while some common ones are exposed at top-level.

Here are the list of array methods and their corresponding type-level functions, if availableL

- ✅ `at`: [`ArrayPlus.At`](#arrayplusat)
- ✅ `concat`: [`Concat` | `ArrayPlus.Concat`](#arrayplusconcat)
- 🚧 `copyWithin`:  `CopyWithin<A, Target, Start, End>`
- ✴️ `entries`: [`ArrayPlus.Entries`](#arrayplusentries)
- 🚧 `every`: `Every<A, Criteria, Then = A, Else = never>`
- 🚧 `fill`: `Fill<A, V, Start, End>`
- ✴️ `find`: [`FindFirst` | `ArrayPlus.Find`](#arrayplusfind)
  - ✴️ [`FindLast` | `ArrayPlus.FindLast`](#arrayplusfindlast)
- 🚧 `findIndex`: `FindIndex<A, Criteria> => number | number literal | never`
- 🚧 `flat`: `Flat<A>`
- 🚧 `flatMap`: `Flat<A, Criteria, R>`
- 🚧 `includes`:
- 🚧 `join`:
- 🚧 `keys`:
- 🚧 `map`: `Map<A, Criteria, R>`
- 🚧 `pop`: `Pop<A>`
- 🚧 `push`: `Push<A>`
- 🚧 `reduce`:
- 🚧 `reduceRight`:
- 🚧 `reverse`:
- 🚧 `shift`:
- 🚧 `slice`:
- ✴️ `some`: [`Some` | `ArrayPlus.Some`](#arrayplussome)
- 🚧 `sort`:
- 🚧 `splice`:
- 🚧 `unshift`:
- 🚧 `values`:

## References

- [handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays
[tuple]: ../tuple/readme.md
