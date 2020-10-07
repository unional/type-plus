export type If<Cond extends boolean, Then, Else> = Cond extends true ? Then : Else
