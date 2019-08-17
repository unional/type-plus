import { ExcludePropType, assertType } from '.';

test('exclude type R from properties of T', () => {
  interface Customer {
    name: string,
    age: number | null,
  }

  type CustomerAgeNotNull = ExcludePropType<Customer, null>

  const x: CustomerAgeNotNull = {} as any
  assertType.isNumber(x.age)
})
