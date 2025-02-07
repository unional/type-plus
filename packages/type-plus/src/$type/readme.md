# Type-level programming

This folder contains utility types for type-level programming.

These utility types are not meant to be used directly.
They are primarily used to build custom types.

Most of these types are named with a `$` prefix to distinguish them from regular types.

## [`$Type`](./$type.ts)

🏷️ **since 8.0.0**

`$Type` is a branded type to define unique types for type-level programming.

It supports all primitive types and object types.

When using object types, the type intersect with the specified type to give easy access to its properties.

Internally, it uses the properties `_$type` and `_$value` to store the type and value.
The type you provide should avoid specifying these properties.

If needed, use `$O: { bare: true }` to avoid the intersection.
