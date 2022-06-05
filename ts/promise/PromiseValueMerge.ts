import { PromiseValue } from './PromiseValue.js'

/**
 * Merging value types from multiple promises.
 */
export type PromiseValueMerge<
  P1 extends Promise<any>,
  P2 extends Promise<any>,
  P3 extends Promise<any> = any,
  P4 extends Promise<any> = any,
  P5 extends Promise<any> = any,
  P6 extends Promise<any> = any,
  P7 extends Promise<any> = any,
  P8 extends Promise<any> = any,
  P9 extends Promise<any> = any
  > = Promise<
    PromiseValue<P1> &
    PromiseValue<P2> &
    PromiseValue<P3> &
    PromiseValue<P4> &
    PromiseValue<P5> &
    PromiseValue<P6> &
    PromiseValue<P7> &
    PromiseValue<P8> &
    PromiseValue<P9>
  >
