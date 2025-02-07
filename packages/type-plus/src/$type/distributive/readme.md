# Distributive

Distributive in TypeScript means each type in a union type is treated as a separate type during type calculation.

Each type in a union type is passed through the type calculation independently.

## [`$Distributive.Options`](./$distributive.ts)

🏷️ **since 8.0.0**

Many types in this library are distributive.

`$Distributive.Options` is a type option indicating the type support distributive and non-distributive mode.

## [`$Distributive.Default`](./$distributive.ts)

🏷️ **since 8.0.0**

`$Distributive.Default` is the default value for [`$Distributive.Options`](#distributiveoptions).
`distributive` is `true` by default.

## [`$Distributive.Parse`](./$distributive.ts)

🏷️ **since 8.0.0**

`$Distributive.Parse<$Option, $O>` checks if a type `$Option` enables distributive or not.
