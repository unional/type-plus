import { Tuple as TTTuple } from 'ts-toolbelt'
import { undef, Undefined } from './Undefined'
import { Union, union } from './Union'

export type Number<Value extends number = number> = { _type: 'number', value: Value }

type NumberListDevice<Values extends number[] = number[]> = Values['length'] extends 0
  ? { result: [] } : Values['length'] extends 1
  ? { result: [Number<Values[0]>] }
  : { result: [Number<Values[0]>, Number<Values[1]>, ...NumberListDevice<TTTuple.Drop<Values, '2'>>['result']] }

/**
 * Creates a single number type.
 */
function create<Value extends number>(value: Value): Number<Value> {
  return { _type: 'number', value }
}

export const number = {
  ...create(undefined as unknown as number),
  create,

  // @ts-ignore we know that this can be infinite
  list<Values extends number[]>(...values: Values): Union<
    // @ts-ignore this seems to be a bug in TypeScript.
    // It can recognize `NumberListDevice<[1,2,3]>['result']`
    NumberListDevice<Values>['result']
  > {
    return union.create(...values.map(create)) as any
  },
  optional: {
    ...union.create(create(undefined as unknown as number), undef),
    /**
     * Creates an optional number constant type.
     */
    create<Value extends number>(value: Value): Union<[Number<Value>, Undefined]> {
      return union.create(create(value), undef)
    },
    // @ts-ignore we know that this can be infinite
    list<Values extends number[]>(...values: Values): Union<
      // @ts-ignore this seems to be a bug in TypeScript.
      [...NumberListDevice<Values>['result'], Undefined]
    > {
      return union.create(...values.map(create), undef) as any
    }
  }
}
