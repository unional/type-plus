// by Klaus Meinhardt @ajafff
// known from Gerrit Birkeland @Gerrit0
// https://github.com/Microsoft/TypeScript/issues/25987#issuecomment-408339599
export type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K
} extends { [_ in keyof T]: infer U } ? U : never;
