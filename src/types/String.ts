import { Tuple as TTTuple } from 'ts-toolbelt'
import { undef, Undefined } from './Undefined'
import { Union, union } from './Union'

export type String<Value extends string = string> = { name: 'string', value: Value }

type StringListDevice<Values extends string[]> = Values['length'] extends 0
  ? { result: [] } : Values['length'] extends 1
  ? { result: [String<Values[0]>] }
  : { result: [String<Values[0]>, String<Values[1]>, ...StringListDevice<TTTuple.Drop<Values, '2'>>['result']] }

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
  // @ts-ignore we know that this can be infinite
  list<Values extends string[]>(...values: Values): Union<
    // @ts-ignore this seems to be a bug in TypeScript.
    // It can recognize `StringListDevice<['a','b','c']>['result']`
    StringListDevice<Values>['result']
  > {
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
    // @ts-ignore we know that this can be infinite
    list<Values extends string[]>(...values: Values): Union<
      // @ts-ignore this seems to be a bug in TypeScript.
      [...StringListDevice<Values>['result'], Undefined]
    > {
      return union.create(...values.map(create), undef) as any
    }
  }
}
