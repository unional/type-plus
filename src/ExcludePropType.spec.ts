import { assertType, ExcludePropType } from '.'

test('exclude type R from properties of T', () => {
  interface Customer {
    name: string,
    age: number | null,
  }

  type CustomerAgeNotNull = ExcludePropType<Customer, null>

  const x: CustomerAgeNotNull = { age: 0 } as any
  assertType.isNumber(x.age)
})
