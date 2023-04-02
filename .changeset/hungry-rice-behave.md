---
'type-plus': minor
---

Adding a new set of types for type-level programming.

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
- `Positive`, `IsPositive`, `NotPositive`, `IsNotPositive`

Adding a new `testType` for testing.
It provides better testing support compares to `isType` and `assertType`.

Improve:

- `Equal`: to support all known scenarios.
