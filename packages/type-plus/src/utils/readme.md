# Utilities

## [`NoInfer`](./no_infer.ts)

💀 **deprecated 8.0.0**: use the built-in `NoInfer` from TypeScript 5.4 instead.

`NoInfer<T>` is a type to prevent type inference.

```ts
import { type NoInfer } from 'type-plus'

 function assertEqual<T>(a: T, b: NoInfer<T>) {
	 return a === b
 }

 function stub<T>(v: RecursivePartial<NoInfer<T>>): T { return v }
```
