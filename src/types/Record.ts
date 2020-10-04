import { typeSym, valueSym } from '../utils'
import { AllType } from './AllType'
import { AnalysisType, ValueType } from './types'
import { undef, Undefined } from './Undefined'
import { union, Union } from './Union'

export type Record<Value extends AllType = any> = ValueType<'record', Value>

export namespace Record {
  export type Analysis<
    Value extends AllType.PrimitiveValues | AllType.Analysis = any
    > = AnalysisType<'record', Value>
}

function create<Value extends AllType>(value: Value): Record<Value> {
  return { [typeSym]: 'record', [valueSym]: value }
}

export const record = {
  create,
  optional: {
    create<Value extends AllType>(value: Value): Union<[Record<Value>, Undefined]> {
      return union.create(create(value), undef) as any
    }
  }
}

// function range(start: number, end: number) {
//   const r: number[] = []
//   while (start < end) r.push(start++)
//   return r
// }
