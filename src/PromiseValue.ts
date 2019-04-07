export type PromiseValue<P extends Promise<any>> = P extends Promise<infer T> ? T : never
