# Distributive

Distributive in TypeScript means each type in a union type is treated as a separate type during type calculation.

Each type in a union type is passed through the type calculation independently.

## [`$Distributive`](./distributive.ts)

🏷️ **since 8.0.0**

Many types in this library are distributive.

`$Distributive.Options` is a type option indicating the type support distributive and non-distributive mode.

## [`$IsDistributive`](./is_distributive.ts)

🏷️ **since 8.0.0**

`$IsDistributive<T>` checks if a type `T` is distributive.
