import { KeyTypes } from '../object-key/KeyTypes'
import { Array } from './Array'
// import { BigInt } from './BigInt'
import { Boolean } from './Boolean'
import { Null } from './Null'
import { number, Number } from './Number'
import { string as str, String } from './String'
import { symbol as sym, Symbol } from './Symbol'
import { Undefined } from './Undefined'
import { union, Union } from './Union'

type AllTypes = Undefined | Null | Boolean | Number | String
  | Symbol | Union<any> | Array<any> | Object<any>
// | BigInt

export type Object<Props extends Record<KeyTypes, AllTypes> | undefined = undefined> = {
  name: 'object',
  props: Props
}

function create<Props extends Record<KeyTypes, AllTypes> | undefined>(props: Props): Object<Props> {
  return { name: 'object', props }
}

export const object = { ...create(undefined), create }

export const keys = union.create(str, number, sym)
