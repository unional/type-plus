
export type JSONTypes = boolean | number | string | null | JSONTypes.JSONObject | JSONTypes.JSONArray

export namespace JSONTypes {
  export interface JSONObject {
    [key: string]: JSONTypes,
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface JSONArray extends Array<JSONTypes> { }
}
