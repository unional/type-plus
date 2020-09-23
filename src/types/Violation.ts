
export type Violation = {
  path: Array<string | number>,
  expected: { type: string } & Record<string, any>,
  actual: any
}
