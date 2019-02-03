export const typeAssert = {
  isUndefined(value: undefined) { return },
  noUndefined<T>(value: Exclude<T, undefined>) { return },
  isNull(value: null) { return },
  noNull<T>(value: Exclude<T, null>) { return },
  isNumber(value: number) { return },
  noNumber<T>(value: Exclude<T, number>) { return },
  isBoolean(value: boolean) { return },
  noBoolean<T>(value: Exclude<T, boolean>) { return },
  isString(value: string) { return },
  noString<T>(value: Exclude<T, string>) { return },
  isNever(value: never) { return }
}
