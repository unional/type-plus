import { AnyRecord } from './AnyRecord'

/**
 * An Object-specific version of `map`.
 * Original source:
 * <https://stackoverflow.com/questions/53964071/how-to-dynamically-create-mapped-type-in-typescript>
 *
 * `ramda` has a similar function (`mapObjIndexed()`) with different parameter order.
 * I keep this parameter order because this parameter order provides better type inference.
 */
export function mapProperties<
  Subject extends AnyRecord,
  ResultProp,
  Key extends keyof Subject = keyof Subject
>(
  obj: Subject,
  callbackfn: (value: Subject[Key], key: Key, obj: Subject) => ResultProp,
): { [K in Key]: ResultProp } {
  const result = {} as { [K in Key]: ResultProp }
  for (const key in obj) {
    const k = key as any as Key
    if (Object.hasOwnProperty.call(obj, key)) {
      result[k] = callbackfn(obj[k], k, obj)
    }
  }
  return result
}
