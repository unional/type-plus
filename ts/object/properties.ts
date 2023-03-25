/**
 * Gets the properties of an object type.
 */
export type Properties<T> = { [k in keyof T]: T[k] } // & {}
