import { Tuple as TTTuple } from 'ts-toolbelt'
import { undef, Undefined } from './Undefined'
import { Union, union } from './Union'

export type String<Value extends string = string> = { name: 'string', value: Value }

type StringListDevice<Values extends string[]> = Values['length'] extends 0
  ? { result: never }
  : { result: String<Values[0]> | StringListDevice<TTTuple.Drop<Values, '1'>>['result'] }

type StringOptionalListDevice<Values extends string[]> = Values['length'] extends 0
  ? { result: Undefined }
  : { result: String<Values[0]> | StringOptionalListDevice<TTTuple.Drop<Values, '1'>>['result'] }

/**
 * Creates a constant string type.
 */
function create<Value extends string>(value: Value): String<Value> {
  // Cannot name this function as `const` because it is a reserved keyword.
  return { name: 'string', value }
}

export const string = {
  ...create(undefined as unknown as string),
  create,
  list<Values extends string[]>(...values: Values): StringListDevice<Values>['result'] {
    return union.create(...values.map(create)) as any
  },
  optional: {
    ...union.create(create(undefined as unknown as string), undef),
    /**
     * Creates an optional constant string type.
     */
    create<Value extends string>(value: Value): Union<[String<Value>, Undefined]> {
      return union.create(create(value), undef)
    },
    list<Values extends string[]>(...values: Values): StringOptionalListDevice<Values>['result'] {
      return union.create(...values.map(create), undef) as any
    }
  }
}
