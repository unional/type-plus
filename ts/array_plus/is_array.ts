export type IsArray<T, Then = true, Else = false> = T extends any[] ? Then : Else
