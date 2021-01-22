export type If<
  Condition extends boolean,
  Then = true,
  Else = false
  > = Condition extends true ? Then : Else
