import { ExcludePropType } from './ExcludePropType';
import { typeAssert } from './typeAssert';

test('exclude type R from properties of T', () => {
  interface Customer {
    name: string,
    age: number | null
  }

  type CustomerAgeNotNull = ExcludePropType<Customer, null>

  let x: CustomerAgeNotNull = {} as any
  typeAssert.isNumber(x.age)
})
