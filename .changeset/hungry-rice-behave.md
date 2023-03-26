---
'type-plus': minor
---

Add:

- `IsAnyOrNever`
- `AnyType`, `IsAny`, `NotAnyType`, `IsNotAny`
- `NeverType`, `IsNever`, `NotNeverType`, `IsNotNever`
- `BooleanType`, `NotBooleanType`, `IsNotBoolean`
- `FalseType`, `IsFalse`, `NotFalseType`, `IsNotFalse`
- `ObjectType`, `IsObject`, `NotObjectType`, `IsNotObject`
- `FunctionType`, `IsFunction`, `NotFunctionType`, `IsNotFunction`
- `TrueType`, `IsTrue`, `NotTrueType`, `IsNotTrue`
- `UndefinedType`, `IsUndefined`, `NotUndefinedType`, `IsNotUndefined`
- `NumberType`, `IsNumber`, `NotNumberType`, `IsNotNumber`
- `StringType`, `IsString`, `NotStringType`, `IsNotString`
- `SymbolType`, `IsSymbol`, `NotSymbolType`, `IsNotSymbol`
- `BigIntType`, `IsBigInt`, `NotBigIntType`, `IsNotBigInt`
- `VoidType`, `IsVoid`, `NotVoidType`, `IsNotVoid`
- `UnknownType`, `IsUnknown`, `NotUnknownType`, `IsNotUnknown`

Improve:

- `Equal`: to support function overloads, symbol, any and never types.
  Supports 3-way comparison.
- `IsInteger` to handle all types
- `IsBoolean`
