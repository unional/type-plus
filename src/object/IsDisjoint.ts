import { AndS, NotS } from '../conditional'
import { AnyRecord } from './AnyRecord'
import { HasKey } from './hasKey'

/**
 * Is the two record disjoint form each other.
 * Disjoint means no common property.
 * Note: using `AndS` and `NotS` due to:
 * <https://github.com/microsoft/TypeScript/issues/41053>
 */
export type IsDisjoint<
  A extends AnyRecord,
  B extends AnyRecord
  > = AndS<NotS<HasKey<A, keyof B>>, NotS<HasKey<B, keyof A>>>
