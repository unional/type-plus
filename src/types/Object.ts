import { KeyTypes } from '../object-key/KeyTypes'
import { typeSym, valueSym } from '../utils'
import { ValueType } from './types'
import { AllType } from './AllTypes'
import { number } from './Number'
import { string as str } from './String'
import { symbol as sym } from './Symbol'
import { undef, Undefined } from './Undefined'
import { union, Union } from './Union'

export type ObjectType<
  Props extends Record<KeyTypes, AllType> = Record<KeyTypes, any>
  > = ValueType<'object', Props>

export namespace ObjectType {
  export type Expectation = { type: 'object', value: Record<string, AllType.Expectation> }
}

/**
 * create specific object type.
 */
function create<Props extends Record<KeyTypes, AllType>>(props: Props): ObjectType<Props> {
  return { [typeSym]: 'object', [valueSym]: props }
}

const any = create(undefined as any)

export const object = Object.assign(any, {
  any,
  create,
  optional: Object.assign(union.create(any, undef), {
    /**
     * Creates an optional object type.
     */
    create<Props extends Record<KeyTypes, AllType>>(props: Props): Union<[ObjectType<Props>, Undefined]> {
      return union.create(create(props), undef)
    }
  })
})

export const keys = union.create(str, number, sym)
