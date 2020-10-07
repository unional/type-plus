import { KeyTypes, reduceByKey } from '../object-key'
import { AllType } from './AllType'
import { number } from './Number'
import { string as str } from './String'
import { symbol as sym } from './Symbol'
import { TypeSpec } from './types'
import { undef, Undefined } from './Undefined'
import { union, Union } from './Union'

export type ObjectType<
  Props extends Record<string, AllType> = Record<string, any>
  > = TypeSpec<'object', Props>

export namespace ObjectType {
  export type Analysis<
    Value extends AllType.PrimitiveValues | AllType.Analysis = any
    > = {
      type: 'object',
      value?: Record<string, Value>,
      fail?: true
    }
}

/**
 * create specific object type.
 */
function create<Props extends Record<string, AllType>>(props: Props): ObjectType<Props> {
  return { type: 'object', value: props }
}

const any = create(undefined as any)

export function map<
  T extends Record<KeyTypes, any>
>(callback: (value: any, key: keyof T, obj: Record<KeyTypes, any>) => any, subject: T) {
  return reduceByKey(subject, (p, k) => (p[k] = callback(subject[k], k, p), p), {} as Record<any, any>)
}

export const object = Object.assign(any, {
  any,
  create,
  map,
  optional: Object.assign(union.create(any, undef), {
    /**
     * Creates an optional object type.
     */
    create<Props extends Record<string, AllType>>(props: Props): Union<[ObjectType<Props>, Undefined]> {
      return union.create(create(props), undef)
    }
  })
})

export const keys = union.create(str, number, sym)
