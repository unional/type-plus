import { HasKey } from './hasKey';
import { Not } from './Not';

export type IsDisjoint<A extends object, B extends object> = Not<HasKey<A, keyof B>> & Not<HasKey<B, keyof A>>
