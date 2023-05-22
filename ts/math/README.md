# Math

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
