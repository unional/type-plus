
export type JSONTypes = boolean | number | string | null | JSONTypes.JSONObject | JSONTypes.JSONArray

export namespace JSONTypes {
  export interface JSONObject {
    [key: string]: JSONTypes
  }

  export interface JSONArray extends Array<JSONTypes> { }
}
