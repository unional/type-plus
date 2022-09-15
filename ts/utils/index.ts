export * from './as.js'
export type { NonNull } from './NonNull.js'
export type { NonUndefined } from './NonUndefined.js'
export type { Widen } from './Widen.js'



export type EitherAnd<A, B, C = void, D = void> = C extends void
  ? A | B | A & B
  : (D extends void
    ? A | B | C | A & B | A & C | B & C | A & B & C
    : A | B | C | D |
    A & B | A & C | A & D | B & C | B & D | C & D |
    A & B & C | A & B & D | A & C & D | B & C & D |
    A & B & C & D
  )
