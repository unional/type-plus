
export function isType(type: Types.AllTypes, subject: unknown) {
  switch (type.type) {
    case 'literal':
      return typeof subject === type.name
    case 'null':
      return false
  }
}

export function satisfiesType() { }

export namespace Types {
  export const Undefined = { name: 'undefined', type: 'literal' } as const
  export const Boolean = { name: 'boolean', type: 'literal' } as const
  export const Null = { name: 'null', type: 'null' } as const

  export type AllTypes = typeof Undefined
    | typeof Null
    | typeof Boolean
}

// const BooleanLiteral = (value: boolean) => ({ type: 'boolean-literal' as const, value })
// const Number = { type: 'number' as const }
// const NumberLiteral = (value: number) => ({ type: 'number-literal' as const, value })
// const String = { type: 'string' as const }
// const StringLiteral = (value: string) => ({ type: 'string-literal' as const, value })
// const Array = (value: EveryTypes[]) => ({ type: 'array' as const, value })

// Array([Undefined, Null])
