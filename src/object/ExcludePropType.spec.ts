import { assertType, ExcludePropType } from '..'

test('exclude type R from properties of T', () => {
  interface Customer {
    name: string,
    age: number | null,
  }

  type CustomerAgeNotNull = ExcludePropType<Customer, null>

  const x: CustomerAgeNotNull = { name: '', age: 0 }
  assertType.isNumber(x.age)
})
