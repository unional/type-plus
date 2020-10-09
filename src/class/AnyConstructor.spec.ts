import { AnyConstructor } from './AnyConstructor'

test('basic', () => {
  const a: AnyConstructor = function () { } as any

  new a()
})

test('specify params with tuple', () => {
  const a: AnyConstructor<[count: number, value: string]> = function () { } as any

  new a(1, 'a')
})
