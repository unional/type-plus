import { ExcludePropType } from './ExcludePropType';
import { isNumber } from './test-util';

test('exclude type R from properties of T', () => {
  interface Customer {
    name: string,
    age: number | null
  }

  type CustomerAgeNotNull = ExcludePropType<Customer, null>

  let x: CustomerAgeNotNull = {} as any
  isNumber(x.age)
})
