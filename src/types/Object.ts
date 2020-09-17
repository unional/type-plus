import { KeyTypes } from '../object-key/KeyTypes'
import { any, Any } from './Any'
import { Array } from './Array'
// import { BigInt } from './BigInt'
import { Boolean } from './Boolean'
import { Null } from './Null'
import { number, Number } from './Number'
import { string as str, String } from './String'
import { symbol as sym, Symbol } from './Symbol'
import { Tuple } from './Tuple'
import { undef, Undefined } from './Undefined'
import { union, Union } from './Union'
import { Unknown } from './Unknown'

type AllTypes = Undefined | Null | Boolean | Number | String
  | Object<any> | ObjectRecord<any, any>
  | Array<any> | Tuple<any>
  | Union<any>
  | Unknown | Any
  | Symbol
// | BigInt

export type Object<Props extends Record<KeyTypes, AllTypes> = Record<KeyTypes, AllTypes>> = {
  name: 'object',
  props: Props
}

/**
 * create specific object type.
 */
function create<Props extends Record<KeyTypes, AllTypes>>(props: Props): Object<Props> {
  return { name: 'object', props }
}

export type ObjectRecord<S extends AllTypes = any, N extends AllTypes = any> = {
  name: 'record',
  string: S,
  number: N
}

function record<S extends AllTypes>(props: { string: S }): ObjectRecord<S, never>
function record<N extends AllTypes>(props: { number: N }): ObjectRecord<never, N>
function record<S extends AllTypes, N extends AllTypes>(
  props: { string: S, number: N }): ObjectRecord<S, N>
function record({ string = any, number = any }: any) {
  return { name: 'record', props: { string, number } } as any
}

function optionalRecord<S extends AllTypes>(props: { string: S }): Union<[ObjectRecord<S, never>, Undefined]>
function optionalRecord<N extends AllTypes>(props: { number: N }): Union<[ObjectRecord<never, N>, Undefined]>
function optionalRecord<S extends AllTypes, N extends AllTypes>(
  props: { string: S, number: N }): Union<[ObjectRecord<S, N>, Undefined]>
function optionalRecord(props: any) {
  return union.create(record(props), undef) as any
}

export const object = {
  ...create(undefined as any),
  create,
  record,
  optional: {
    ...union.create(create(undefined as any), undef),
    /**
     * Creates an optional object type.
     */
    create<Props extends Record<KeyTypes, AllTypes>>(props: Props): Union<[Object<Props>, Undefined]> {
      return union.create(create(props), undef)
    },
    record: optionalRecord
  }
}

export const keys = union.create(str, number, sym)
