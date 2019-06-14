import { Omit } from './Omit';
import { UnionKeys } from './UnionKeys';

/**
 * @deprecated replaced by `Omit`
 */
export type Except<T, K extends UnionKeys<T>> = Omit<T, K>
