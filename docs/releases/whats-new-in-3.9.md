# What's new in 3.9 <!-- omit in toc -->

[type-plus][type-plus] 3.9 is released! 🎉🎉

This is the biggest release since 3.0. I have added 24 new features.

Highlight of show is *unrestricted* positive number arithmetics.
Let's dig in!

- [Positive Number Arithmetics](#positive-number-arithmetics)
- [`isType` Enhancements](#istype-enhancements)
- [Array Manipulations](#array-manipulations)
- [Type Predicates Enhancements](#type-predicates-enhancements)
- [Renaming Types](#renaming-types)
- [What's Next](#whats-next)

📺 You can also check out the [release video here](https://youtu.be/vmaSFx3T3vY).

## Positive Number Arithmetics

TypeScript does not support type-level arithmetics out of the box.
But arithmetics is a very fundamental tool to enable efficient type computation.

Because of that, there were several implementations out there for this.
The typical mechanisms are string-based literals, lookup table, and/or recursion.
They each have their limitations especially for recursion,
as there is a 64 depth-limit in TypeScript.

[type-plus][type-plus] implementation allows you to do add and subtract up to 5 digits**.

```ts
const x: Add<12345, 65432> // 77777
const y: Subtract<77777, 65432> // 12345
```

while the implementation supports more than 5 digits,
it is a computation and memory intensive process as the only way to dynamically generate numeric literals today is through `someTuple['length']`.
So creating numeric literal `77777` requires a tuple of size `77777` to be created.

On my laptop, `Add<1234, 6543>` takes 1 second,
`Add<12345, 65432>` takes 5 seconds, and `Add<500000, 1>` takes 120 seconds.

Also, this calculation needs to take place every time you change code in your project.
So limiting the calculation to 3-4 digits is preferred.

In practice, 3-4 digits should be sufficient in most cases.
If you need more digits, I can add a string based version in the future.

Other math related feature added:

- `IsPositive<N>`: is `N` a positive number literal. `IsPositive<number>` returns `false`.
- `IsWhole<N>`: is `N` a whole number literal. `IsWhole<number>` returns `false`.
- `Max<A, B, Fail=never>`: `max(A, B)`, for positive and whole number, `Fail` otherwise.
- `GreaterThan<A, B, Fail=never>`: `A > B` for positive and whole numbers, `Fail` otherwise.
- `Increment<A, Fail=never>`: alias of `Add<A, 1, Fail>`.
- `Decrement<A, Fail=never>`: alias of `Subtract<A, 1, Fail>`.

One note to `Subtract<A, B>` and `Decrement<A>`:
If the result is negative, you will get the `Fail` value, which defaults to `never`.

## `isType` Enhancements

Before 3.9, when writing type-level tests you can do this:

```ts
assertType.isTrue(true as Equal<A, B>)
assertType.isFalse(false as SomePredicate<A>)
```

This is quite verbose and not using the assertion capability of `assertType`.

In 3.9, I have added `isType.true()`, `isType.false()`, and `isType.equal()` so now you can do:

```ts
isType.true<SomePredicate<A>>()
isType.false<SomePredicate<B>>()
isType.equal<true, A, B>()
isType.equal<false, A, B>()
```

## Array Manipulations

In order to add [positive number arithmetics](#positive-number-arithmetics),
many common array manipulation types are added.

They pretty much behave like what you expected. Hurray to abstractions! 👏👏

- `CreateTuple<L, T>`: creates `Tuple<T>` with `L` number of elements.
- `Concat<A, B>`: `[...A, ...B]`.
- `DropFirst<A>`: drops the first value type of `A`.
- `DropLast<A>`: drops the last value type of `A`.
- `Filter<A, Criteria>`: gets array of types satisfying `Criteria` in `A`.
- `FindFirst<A, Criteria>`: gets first type satisfying `Criteria`.
- `FindLast<A, Criteria>`: gets last type satisfying `Criteria`.
- `PadLeft<A, Total, PadWith>`: pads `A` with `PadWith` if the length of `A` is less than `L`.
- `Reverse<A>`: reverses the order of `A`.
- `Some<A, Criteria>`: true if some elements in `A` matches `Criteria`.

## Type Predicates Enhancements

Type predicates are types that returns `true` or `false` so you can use that in your type-level programming.

Three new types `IsAny<T>`, `IsBoolean<T>`, `IsLiteral<T>` are added to do what you expected them to do.

Beside that, most type predicates in `type-plus` have added the optional `Then` and `Else` clause so that you can override its behavior as needed.

That means now you can override the result and/or use them like an if statement:

```ts
// returns A if A has key 'a' or never otherwise, making it like a `filter`.
type R = HasKey<A, 'a', A, never>

// like an if statement
type C = HasKey<A, 'a', Equal<A['a'], 123>>
```

Note that overriding `Then` and `Else` will effectively execute the type regardless of the criteria,
so there is a performance hit and you may not get what you wanted.
In that case, fall back to the normal way:

```ts
type L = -1

// Assume `CreateTuple<L>` did not check for L to be positive.
// gets "Type instantiation is excessively deep and possibly infinite"
IsPositive<L, CreateTuple<L>>

// do this instead
IsPositive<L> extends true ? CreateTuple<L> : never
```

## Renaming Types

A few types get a new name which better describe what they do.
The old names will be deprecated in 4.0 and subsequently removed.

- `UnionOfProps<A, K>`: gets the union of `A[K]` types (deprecate `PropUnion`).
- `UnionOfValues<A>`: gets the union of value types in `A` (deprecate `ArrayValue`).
- `IntersectOfProps<A, K>`: gets the intersect of `A[K]` types (deprecate `MapToProp`)
- `CommonPropKeys<A>`: gets common keys inside the records in the array `A` (deprecate `CommonKeys`).

## What's Next

That's pretty much it for [type-plus][type-plus] 3.9!
Hope you will enjoy it.

If you found any issue or want other types,
feel free to [open an issue](https://github.com/unional/type-plus/issues).

There are a more things I need to do for [type-plus][type-plus]:

- fixing the recursive problem of `T`
- improving performance
- adding custom validations

Until then, Happy Coding! 🌷

[type-plus]: https://github.com/unional/type-plus
