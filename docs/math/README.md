# Math

Math is fundamental in programming.
[type-plus][type-plus] is bringing some of those power into type-level programming.

Note that some of the types only support positive and whole numbers.
I actually have the tools and mechanism to support negative (in some cases) and fractional numbers,
but just don't have those use case yet.

If you have such use case, feel free to [open an issue](https://github.com/unional/type-plus/issues).

## Abs<N, Fail?>

Converting negative literals to positive.

```ts
Equal<123, Abs<-123>>
Equal<never, Abs<number>>
Equal<number, Abs<number, number>>
```

## IsPositive<N, Then?, Else?>

Is `N` positive?

original: <https://itnext.io/implementing-arithmetic-within-typescripts-type-system-a1ef140a6f6f>

```ts
Equal<true, IsPositive<0>>
Equal<true, IsPositive<1>>
Equal<true, IsPositive<999999>>

Equal<false, IsPositive<-1>>
Equal<false, IsPositive<number>>

// use as filter
type A = 123
Equal<A, IsPositive<A, A, never>>

type B = number
Equal<never, IsPositive<B, B, never>>
```

## IsWhole<N, Then?, Else?>

Is `N` a whole number (integer)?

original: <https://itnext.io/implementing-arithmetic-within-typescripts-type-system-a1ef140a6f6f>

```ts
Equal<true, IsWhole<1>>
Equal<true, IsWhole<0>>
Equal<true, IsWhole<1.>>
Equal<true, IsWhole<0.>>
Equal<true, IsWhole<-1>>

Equal<false, IsWhole<0.1>>
Equal<false, IsWhole<-0.1>>
```

## Max<A, B, Fail?>

Gets the max of `A` and `B`.
Works on positive whole number only.

```ts
Equal<123, Max<1, 123>>
Equal<123, Max<123, 1>>

Equal<never, Max<number, 1>>
Equal<number, Max<number, 1, number>>
```

## GreaterThan<A, B, Fail?>

Is `A > B`?
Works on positive whole number only.

```ts
Equal<true, GreaterThan<1234, 1233>>
Equal<false, GreaterThan<1234, 1235>>

Equal<never, GreaterThan<number, 1>>
Equal<number, GreaterThan<number, 1, number>>
```

## Add<A, B, Fail?>

`A + B`.
Works on positive whole number only.

```ts
Equal<7777, Add<1234, 6543>>

Equal<never, Add<number, 1>>
Equal<number, Add<number, 1, number>>
```

## Subtract<A, B, Fail?>

`A - B`.
Works on positive whole number only.
If result is negative, it returns the `Fail` value.

```ts
Equal<7777, Subtract<9999, 2222>>
Equal<never, Subtract<0, 1>>

Equal<never, Subtract<number, 1>>
Equal<number, Subtract<number, 1, number>>
```

## Increment<A, Fail?>

`A + 1`.
Works on positive whole number only.

```ts
Equal<1, Increment<0>>

Equal<never, Increment<number>>
Equal<number, Increment<number, number>>
```

## Decrement<A, Fail?>

`A - 1`.
Works on positive whole number only.
If result is negative, it returns the `Fail` value.

```ts
Equal<0, Decrement<1>>
Equal<never, Decrement<0>>

Equal<never, Decrement<number>>
Equal<number, Decrement<number, number>>
```

[type-plus]: https://github.com/unional/type-plus
