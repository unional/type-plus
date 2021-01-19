export type ChainFn<T> = (param: T) => T

/**
 * An endofunctor is a functor from one category back to the same category.
 */
export type EndoFn<T> = (param: T) => T
