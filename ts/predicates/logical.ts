export type And<
  A extends boolean,
  B extends boolean,
  Then = true,
  Else = false
> = A extends true ? B extends true ? Then : Else : Else

export type Or<
  A extends boolean,
  B extends boolean,
  Then = true,
  Else = false
> = A extends true ? Then : B extends true ? Then : Else

export type Not<
  X extends boolean,
  Then = true,
  Else = false
> = X extends true ? Else : Then

export type Xor<
  A extends boolean,
  B extends boolean,
  Then = true,
  Else = false
> = A extends Then ? Not<B> : B extends true ? Then : Else
