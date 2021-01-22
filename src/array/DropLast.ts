export type DropLast<A extends any[]> = number extends A['length']
  ? A
  : (A['length'] extends 0
    ? never[]
    : (A['length'] extends 1
      ? never[]
      : (A extends [...infer Heads, any]
        ? Heads
        : never
      ))
  )
