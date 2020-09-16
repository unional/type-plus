import { Tuple as TTTuple } from 'ts-toolbelt'
import { undef, Undefined } from './Undefined'
import { Union, union } from './Union'

export type Number<Value extends number = number> = { name: 'number', value: Value }

type NumberListDevice<Values extends number[]> = Values['length'] extends 0
  ? { result: never }
  : { result: Number<Values[0]> | NumberListDevice<TTTuple.Drop<Values, '1'>>['result'] }

type NumberOptionalListDevice<Values extends number[]> = Values['length'] extends 0
  ? { result: Undefined }
  : { result: Number<Values[0]> | NumberOptionalListDevice<TTTuple.Drop<Values, '1'>>['result'] }

/**
 * Creates a single number type.
 */
function create<Value extends number>(value: Value): Number<Value> {
  return { name: 'number', value }
}

export const number = {
  ...create(undefined as unknown as number),
  create,
  list<Values extends number[]>(...values: Values): NumberListDevice<Values>['result'] {
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
    list<Values extends number[]>(...values: Values): NumberOptionalListDevice<Values>['result'] {
      return union.create(...values.map(create), undef) as any
    }
  }
}
