# Type-level utilities

This folder contains utility types for the types in type-level programming.

## [`$MergeOptions`](./merge_options.ts)

🏷️ **since 8.0.0**

`$MergeOptions<$O, $P>` merges two options types `$O` and `$P`.
This is used in the type to merge the user provided options with the default options.

## [`$Distributive`](./distributive.ts)

🏷️ **since 8.0.0**

Many types in this library are distributive.

`$Distributive.Options` is a type option indicating the type support distributive and non-distributive mode.
