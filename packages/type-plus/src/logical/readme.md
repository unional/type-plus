# Logical Types

Logical types are type-level logic operators.

## [`And`](./and.ts)

🎭 **predicate**
🏷️ **since 8.0.0**

Logical `And` operator.

```ts
type R = And<true, true> // true
type R = And<true, false> // false
```

## [`Or`](./or.ts)

🎭 **predicate**
🏷️ **since 8.0.0**

Logical `Or` operator.

```ts
type R = Or<true, true> // true
type R = Or<true, false> // true
type R = Or<false, false> // false
```

## [`Not`](./not.ts)

🎭 **predicate**
🏷️ **since 8.0.0**

Logical `Not` operator.

```ts
type R = Not<true> // false
type R = Not<false> // true
```

## [`Xor`](./xor.ts)

🎭 **predicate**
🏷️ **since 8.0.0**

Logical `Xor` operator.

```ts
type R = Xor<true, true> // false
type R = Xor<true, false> // true
type R = Xor<false, false> // false
```
