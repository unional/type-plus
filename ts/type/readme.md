# type

General type utilities.

## Failed

`Failed<Msg>` is a type to describe a failure.

Use the same concept to create your own failure types.

```ts
import { type Failed } from 'type-plus'

type YourComplexType<A,B,C> = A extends B ?
  ... // and many more hard work later...
  : Failed<'you are doing something wrong!'>
```

[![Just Code: I failed][failed-type]][failed-type-url]

[failed-type]: https://img.youtube.com/vi/3pEXVe6KJO4/0.jpg
[failed-type-url]: https://www.youtube.com/live/3pEXVe6KJO4
