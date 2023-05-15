---
'type-plus': patch
---

fix `Some<Array<number | string>, number>` to return `boolean`.
This is because besides `Array<number | string>` can be `[1, 'a']`,
it can also be:

```ts
const v: number | string = 123

const a: Array<number | string> = [v]
```

So `Some<Array<number | string>, number>` should distribute and return `boolean`.
