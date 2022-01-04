/**
 * Types that can contain custom properties.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type ComposableTypes = object | Function

/**
 * Types that cannot contain custom properties.
 */
export type NonComposableTypes = boolean | number | string | symbol | bigint | undefined | null
