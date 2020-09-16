import { AnyRecord } from './any-types'
import { HasKey } from './hasKey'
import { Not } from './Not'

export type IsDisjoint<A extends AnyRecord, B extends AnyRecord> = Not<HasKey<A, keyof B>> & Not<HasKey<B, keyof A>>
