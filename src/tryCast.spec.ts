// import a from 'assertron';
// import { tryCast, typeAssert } from '.';

test.todo('implement tryCast() when infer improvement is available')

// test('cast to incompatible type will becomes never type', () => {
//   const foo = { a: 1 }

//   typeAssert.isNever(tryCast<number>(foo))
//   typeAssert.isNever(tryCast<string>(foo))
//   typeAssert.isNever(tryCast<undefined>(foo))
//   typeAssert.isNever(tryCast<null>(foo))
//   typeAssert.isNever(tryCast<{ a: number }>(foo))
//   typeAssert.isNever(tryCast<{ b: number }>(foo))

//   const arr = [1]
//   typeAssert.isNever(tryCast<number>(arr))
//   typeAssert.isNever(tryCast<string>(arr))
//   typeAssert.isNever(tryCast<undefined>(arr))
//   typeAssert.isNever(tryCast<null>(arr))
//   typeAssert.isNever(tryCast<{ b: number }>(arr))
//   typeAssert.isNever(tryCast<[string]>(arr))
// })

// test('cast primitive type will throw', () => {
//   a.throws(() => tryCast(1))
//   a.throws(() => tryCast(true))
//   a.throws(() => tryCast(null))
//   a.throws(() => tryCast(undefined))
//   a.throws(() => tryCast('a'))
// })
