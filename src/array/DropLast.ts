export type DropLast<A extends any[]> = number extends A['length']
  ? A
  : (A['length'] extends 0
    ? never[]
    : (A['length'] extends 1
      ? never[]
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      : (A extends [...infer Heads, infer Last]
        ? Heads
        : never
      ))
  )
