# Exact comparison

Types in TypeScript is a Set, they can contain subtypes.

For example, The `string` type can have string literals,
`boolean` can be `true` or `false`, etc.

When comparing two types, we can compare them loosely or strictly.

## [`$Exact.Options`](./$exact.ts)

🏷️ **since 8.0.0**

`$Exact.Options` is a type option indicating the type support exact comparison.

## [`$Exact.Default`](./$exact.ts)

🏷️ **since 8.0.0**

`$Exact.Default` is the default value for [`$Exact.Options`](#exactoptions).
`exact` is `false` by default.

## [`$Exact.Parse`](./$exact.ts)

🏷️ **since 8.0.0**

`$Exact.Parse<$Option, $O>` checks if a type `$Option` enables exact comparison or not.
