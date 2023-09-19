import type { $FlipSelection, $SelectionFilter, $SelectionOptions } from '../type_plus/branch/selection.js'
import { type UnknownType } from './unknown_type.js'

/**
 * Check if the type `T` is not `unknown`.
 *
 * ```ts
 * type R = NotUnknownType<unknown> // never
 *
 * type R = NotUnknownType<never> // never
 * type R = NotUnknownType<number> // number
 * type R = NotUnknownType<string | boolean> // string | boolean
 * ```
 */

export type NotUnknownType<
	T,
	$Options extends $SelectionOptions = $SelectionFilter<T>
> = UnknownType<T, $FlipSelection<$Options>>
