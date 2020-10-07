import { AnalysisType, ValueType } from './types'
import { undef } from './Undefined'
import { union } from './Union'

export type Symbol<Value extends string = string> = ValueType<'symbol', Value>

export namespace Symbol {
  export type Analysis = AnalysisType<'symbol'>
}

function create<Value extends string>(value: Value): Symbol<Value> {
  return { type: 'symbol', value }
}

const any = create(undefined as unknown as string)

export const symbol = Object.assign(any, {
  optional: union.create(any, undef)
})
