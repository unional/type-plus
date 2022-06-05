import { hasProperty } from '../index.js'

test('hasProperty', () => {
  type X = { name: string } & ({ a: 1 } | { b: 2 })

  const x: X = { name: 'n', a: 1 }

  if (hasProperty(x, 'a'))
    expect(x.a).toBe(1)

  const y: X = { name: 'n', b: 2 }

  if (hasProperty(y, 'b'))
    expect(y.b).toBe(2)
})
