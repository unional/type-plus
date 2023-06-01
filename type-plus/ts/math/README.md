# Math

## Add

> `Add<A, B>` | `MathPlus.Add<A, B>`

Performs `A + B` which can be either `number` or `bigint`.

It supports positive, negative, floating point numbers.
It will perform coerce conversion if the necessary.

```ts
Add<1, 2> // 3
Add<1.2, -2> // -0.8
Add<1n, 2.3> // 3.3 <-- converted to `number`
Add<9007199254740992, 1> // 9007199254740993n <-- converted to `bigint`
```

## Subtract

> `Subtract<A, B>` | `MathPlus.Subtract<A, B>`

Performs `A - B` which can be either `number` or `bigint`.

It supports positive, negative, floating point numbers.
It will perform coerce conversion if the necessary.

```ts
Subtract<100, 2> // 98
Subtract<1.2, 2> // -0.8
Subtract<1n, 2.3> // -1.3 <-- converted to `number`
```

## Multiply

> `Multiply<A, B>` | `MathPlus.Multiply<A, B>`

Performs `A * B` which can be either `number` or `bigint`.

It supports positive, negative, floating point numbers.
It will perform coerce conversion if the necessary.

```ts
Multiply<100, 2> // 200
Multiply<1.2, 2> // 2.4
Multiply<1n, 2.3> // 2.3 <-- converted to `number`
```

## GreaterThan

> `GreaterThan<A, B>` | `MathPlus.GreaterThan<A, B>`

Performs `A > B` which can be either `number` or `bigint`.

```ts
GreaterThan<100, 2> // true
GreaterThan<-1, 2> // false
GreaterThan<1.2, 2> // false
```

## Max

> `Max<A, B>` | `MathPlus.Max<A, B>`

Performs `Math.max(A, B)` which can be either `number` or `bigint`.

```ts
Max<100, 2> // 100
Max<-1, 2> // 2
Max<1.2, 2> // 2
```

## MathPlus

`MathPlus` contains all types and type utilities related to math.

### [`MathPlus.ToNegative`](./math.to-negative.ts#L12)

> `MathPlus.ToNegative<N>`

Converts a number or bigint `N` to negative.
If `N` is already negative, it returns itself.

```ts
MathPlus.ToNegative<5> // -5
MathPlus.ToNegative<0> // 0
MathPlus.ToNegative<-5> // -5
```

## References

- [Implementing Arithmetic Within TypeScript’s Type System](https://itnext.io/implementing-arithmetic-within-typescripts-type-system-a1ef140a6f6f)
- [typepark](https://github.com/kgtkr/typepark)
- [typical](https://github.com/KiaraGrouwstra/typical/tree/master/src)

- <https://stackoverflow.com/questions/3060064/how-computer-multiplies-2-numbers>
- <https://en.wikipedia.org/wiki/Binary_multiplier>
