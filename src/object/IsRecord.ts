export type IsRecord<T> = T extends any[]
? false
: T extends Record<any, any>
? true : false
