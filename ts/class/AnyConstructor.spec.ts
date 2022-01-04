import { AnyConstructor } from '..'

test('basic', () => {
  const a = function () { } as any as AnyConstructor

  new a()
})

test('specify params with tuple', () => {
  const a = function () { } as any as AnyConstructor<[count: number, value: string]>

  new a(1, 'a')
})
