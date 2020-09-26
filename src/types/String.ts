import { Tuple as TTTuple } from 'ts-toolbelt'
import { typeSym, valueSym } from '../utils'
import { ValueType } from './types'
import { undef, Undefined } from './Undefined'
import { Union, union } from './Union'

export type String<Value extends string = string> = ValueType<'string', Value>

type StringListDevice<Values extends string[]> = Values['length'] extends 0
  ? { result: [] } : Values['length'] extends 1
  ? { result: [String<Values[0]>] }
  : { result: [String<Values[0]>, String<Values[1]>, ...StringListDevice<TTTuple.Drop<Values, '2'>>['result']] }

/**
* Creates a constant string type.
*/
function create<Value extends string>(value: Value): String<Value> {
  // Cannot name this function as `const` because it is a reserved keyword.
  return { [typeSym]: 'string', [valueSym]: value }
}
const any = create(undefined as unknown as string)

export const string = Object.assign(any, {
  any,
  create,
  // @ts-ignore we know that this can be infinite
  list<Value extends string, Values extends string[]>(value: Value, ...values: Values): Union<
    // @ts-ignore this seems to be a bug in TypeScript.
    // It can recognize `StringListDevice<['a','b','c']>['result']`
    StringListDevice<[Value, ...Values]>['result']
  > {
    return union.create(create(value), ...values.map(create)) as any
  },
  optional: Object.assign(union.create(any, undef), {
    /**
     * Creates an optional constant string type.
     */
    create<Value extends string>(value: Value): Union<[String<Value>, Undefined]> {
      return union.create(create(value), undef)
    },
    // @ts-ignore we know that this can be infinite
    list<Value extends string, Values extends string[]>(value: Value, ...values: Values): Union<
      // @ts-ignore this seems to be a bug in TypeScript.
      [...StringListDevice<[Value, ...Values]>['result'], Undefined]
    > {
      return union.create(create(value), ...values.map(create), undef) as any
    }
  })
})
