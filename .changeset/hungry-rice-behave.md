---
'type-plus': minor
---

Add:

- `IsAnyOrNever`
- `AnyType`, `IsAny`, `NotAnyType`, `IsNotAny`
- `NeverType`, `IsNever`, `NotNeverType`, `IsNotNever`
- `StrictBooleanType`, `IsStrictBoolean`, `NotStrictBooleanType`, `IsNotStrictBoolean`
- `BooleanType`, `NotBooleanType`, `IsNotBoolean`
- `TrueType`, `IsTrue`, `NotTrueType`, `IsNotTrue`
- `FalseType`, `IsFalse`, `NotFalseType`, `IsNotFalse`
- `ObjectType`, `IsObject`, `NotObjectType`, `IsNotObject`
- `StrictFunctionType`, `IsStrictFunction`, `NotStrictFunctionType`, `IsNotStrictFunction`
- `FunctionType`, `IsFunction`, `NotFunctionType`, `IsNotFunction`
- `UndefinedType`, `IsUndefined`, `NotUndefinedType`, `IsNotUndefined`
- `NumberType`, `IsNumber`, `NotNumberType`, `IsNotNumber`
- `StrictNumberType`, `IsStrictNumber`, `NotStrictNumberType`, `IsNotStrictNumber`
- `StringType`, `IsString`, `NotStringType`, `IsNotString`
- `StrictStringType`, `IsStrictString`, `NotStrictStringType`, `IsNotStrictString`
- `SymbolType`, `IsSymbol`, `NotSymbolType`, `IsNotSymbol`
- `BigIntType`, `IsBigInt`, `NotBigIntType`, `IsNotBigInt`
- `StrictBigIntType`, `IsStrictBigInt`, `NotStrictBigIntType`, `IsNotStrictBigInt`
- `VoidType`, `IsVoid`, `NotVoidType`, `IsNotVoid`
- `UnknownType`, `IsUnknown`, `NotUnknownType`, `IsNotUnknown`

These types perform strict type checks.
Union and Intersection types are not considered to pass the check.

Improve:

- `Equal`: to support function overloads, symbol, any and never types.
  Supports 3-way comparison.
- `IsInteger` to handle all types
- `IsBoolean`


- `type.equal` to support function overloads, symbol, any and never types.
  Supports 3-way comparison.
