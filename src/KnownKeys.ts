// by Klaus Meinhardt @ajafff
// known from Gerrit Birkeland @Gerrit0
// https://github.com/Microsoft/TypeScript/issues/25987#issuecomment-408339599
// https://github.com/microsoft/TypeScript/issues/25987#issuecomment-441224690
export type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K
// eslint-disable-next-line @typescript-eslint/ban-types
} extends { [_ in keyof T]: infer U } ? ({} extends U ? never : U) : never;
