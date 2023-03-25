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

Improve:

- `Equal`: to function overloads, symbol, any and never properly.
- `IsInteger` to handle all types
- `IsBoolean`
