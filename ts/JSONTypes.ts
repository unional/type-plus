export type JSONTypes = JSONPrimitive | JSONObject | JSONArray

export type JSONPrimitive = boolean | number | string | null

export type JSONObject = { [key in string]?: JSONTypes }

export type JSONArray = Array<JSONTypes>

export const JSONTypes = { get }

function get<T extends JSONTypes>(obj: JSONTypes, ...props: Array<string | number>): T | undefined {
  if (props.length === 0) return obj as T
  if (typeof obj !== 'object' || obj === null) return undefined
  const p = props.shift()!
  // @ts-ignore
  return get(obj[p], ...props) as T
}
