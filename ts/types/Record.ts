import { AllType } from './AllType'
import { TypeAnalysis, Type } from './types'
import { undef, Undefined } from './Undefined'
import { union, Union } from './Union'

export type Record<Value extends AllType = any> = Type<'record', Value>

export namespace Record {
  export type Analysis<
    Value extends AllType.PrimitiveValues | AllType.Analysis = any
    > = TypeAnalysis<'record', Value>
}

function create<Value extends AllType>(value: Value): Record<Value> {
  return { type: 'record', value }
}

export const record = {
  create,
  optional: {
    create<Value extends AllType>(value: Value): Union<[Record<Value>, Undefined]> {
      return union.create(create(value), undef) as any
    }
  }
}
