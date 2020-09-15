import { KeyTypes } from '../object-key/KeyTypes'
import { Any } from './Any'
import { Array } from './Array'
// import { BigInt } from './BigInt'
import { Boolean } from './Boolean'
import { Null } from './Null'
import { number, Number } from './Number'
import { string as str, String } from './String'
import { symbol as sym, Symbol } from './Symbol'
import { undef, Undefined } from './Undefined'
import { union, Union } from './Union'

type AllTypes = Undefined | Null | Boolean | Number | String
  | Symbol | Union<any> | Array<any> | Object<any>
// | BigInt

export type Object<Props extends Record<KeyTypes, AllTypes> | Any = Any> = {
  name: 'object',
  props: Props
}

/**
 * create specific object type.
 */
function create<Props extends Record<KeyTypes, AllTypes>>(props: Props): Object<Props> {
  return { name: 'object', props }
}

export const object = {
  ...create(undefined as any), create,
  optional: {
    ...union.create(create(undefined as any), undef),
    /**
     * Creates an optional object type.
     */
    create<Props extends Record<KeyTypes, AllTypes> | Any>(props: Props): Union<[Object<Props>, Undefined]> {
      return union.create(create(props), undef)
    }
  }
}

export const keys = union.create(str, number, sym)
