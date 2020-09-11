export function isType<T extends Types.AllTypes>(type: T, subject: unknown): subject is Types.ExtractTypes<T> {
  switch (type.type) {
    case 'literal':
      return typeof subject === type.name
    case 'null':
      return subject === null
    default:
      return false
  }
}

export function satisfiesType() { }

export namespace Types {
  export const Undefined = { name: 'undefined', type: 'literal' } as const
  export const Boolean = { name: 'boolean', type: 'literal' } as const
  export const Number = { name: 'number', type: 'literal' } as const
  export const String = { name: 'string', type: 'literal' } as const
  export const BigInt = { name: 'bigint', type: 'literal' } as const
  export const Symbol = { name: 'symbol', type: 'literal' } as const
  export const Null = { name: 'null', type: 'null' } as const
  // function, object, array, tuple, union, intersection

  export type AllTypes = typeof Undefined
    | typeof Boolean
    | typeof Number
    | typeof String
    | typeof BigInt
    | typeof Symbol
    | typeof Null

  export type ExtractTypes<T extends AllTypes> = T extends typeof Undefined ? undefined :
    T extends typeof Boolean ? boolean :
    T extends typeof Number ? number :
    T extends typeof String ? string :
    T extends typeof BigInt ? bigint :
    T extends typeof Symbol ? symbol :
    T extends typeof Null ? null :
    never
}

// const BooleanLiteral = (value: boolean) => ({ type: 'boolean-literal' as const, value })
// const NumberLiteral = (value: number) => ({ type: 'number-literal' as const, value })
// const StringLiteral = (value: string) => ({ type: 'string-literal' as const, value })
// const Array = (value: EveryTypes[]) => ({ type: 'array' as const, value })

// Array([Undefined, Null])
