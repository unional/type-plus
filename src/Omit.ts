// by Titian Cernicova-Dragomir
// https://github.com/microsoft/TypeScript/issues/28339#issuecomment-463577347
// type-zoo
export type Omit<T, K extends keyof T> = T extends T ? Pick<T, Exclude<keyof T, K>> : never;
