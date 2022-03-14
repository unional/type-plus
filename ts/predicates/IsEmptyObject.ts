/* eslint-disable @typescript-eslint/ban-types */
export type IsEmptyObject<T> = T extends {} ? {} extends T ? true : false : false
