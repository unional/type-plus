/* eslint-disable no-inner-declarations */
export function isType<T extends Types.AllTypes>(type: T, subject: unknown): subject is Types.ExtractTypes<T> {
  switch (type.name) {
    case 'undefined':
    case 'boolean':
    case 'number':
    case 'string':
    case 'bigint':
    case 'symbol':
      return typeof subject === type.name
    case 'null':
      return subject === null
    case 'union':
      return (type as typeof Types.Union).values.some(t => isType(t, subject))
    default:
      return false
  }
}

export function satisfiesType() { }

export namespace Types {
  export const Undefined = { name: 'undefined' } as const
  export const Boolean = { name: 'boolean' } as const
  export const Number = { name: 'number' } as const
  export const String = { name: 'string' } as const
  export const BigInt = { name: 'bigint' } as const
  export const Symbol = { name: 'symbol' } as const
  export const Null = { name: 'null' } as const
  export const Never = { name: 'never' } as const
  export const Unknown = { name: 'unknown' } as const
  export const Any = { name: 'any' } as const
  export type UnionType<T extends AllTypes[] = any> = {
    name: 'union',
    values: [...T]
  }
  export const Union = { name: 'union', values: [] } as UnionType
  export const Object = { type: 'object' } as const
  // function, object, array, tuple, union, intersection

  export type AllTypes = typeof Undefined
    | typeof Boolean
    | typeof Number
    | typeof String
    | typeof BigInt
    | typeof Symbol
    | typeof Null
    | UnionType
    | typeof Never

  export type ExtractTypes<T extends AllTypes> = T extends typeof Undefined ? undefined :
    T extends typeof Boolean ? boolean :
    T extends typeof Number ? number :
    T extends typeof String ? string :
    T extends typeof BigInt ? bigint :
    T extends typeof Symbol ? symbol :
    T extends UnionType ? 'tbd' :
    T extends typeof Null ? null :
    never

  export namespace Turing {
    // export type If<Cond, True, False> = { }
    export type If<Left, Right, True, False> = Left extends Right ? True : False
  }

  /**
   * Type calculation for `union()`
   */
  export type UnionCalc<T extends AllTypes, U extends AllTypes[]> = U[0] extends undefined
    ? T
    : UnionType<[T, ...U]>

  export function union<
    T extends AllTypes,
    U extends AllTypes[]
  >(t1: T, ...types: U): U[0] extends undefined ? T : UnionType<[T, ...U]> {
    if (types.length === 0) return t1 as any
    const t2: U[0] = types.shift()!
    if (isUnion(t1)) {
      if (isUnion(t2)) t1.values.push(...t2.values)
      else t1.values.push(t2)
      return union(t1, ...types) as any
    }

    if (isUnion(t2)) {
      t2.values.push(t1)
      return union(t2, ...types) as any
    }

    if (t1.name == t2.name) return t1 as any

    return union({ name: 'union', values: [t1, t2] }, ...types) as any
  }

  export function isUnion(type: AllTypes): type is typeof Union {
    return type.name === 'union'
  }
}

// const BooleanLiteral = (value: boolean) => ({ type: 'boolean-literal' as const, value })
// const NumberLiteral = (value: number) => ({ type: 'number-literal' as const, value })
// const StringLiteral = (value: string) => ({ type: 'string-literal' as const, value })
// const Array = (value: EveryTypes[]) => ({ type: 'array' as const, value })

// Array([Undefined, Null])
