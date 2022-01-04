// import { MapToProp } from '../array'
// import { assertType } from '../assertion'
// import * as T from '../types'
// import { Checker } from './types'

// export function buildTypes<Checkers extends Checker[]>(...checkers: Checkers) {
//   const types = checkers.map(c => c.type).reduce((p, t) => ({ ...p, ...t }), {})
//   types.satisfy = (type: any, subject: unknown) => true
//   return types as unknown as MapToProp<Checkers, 'type'> & {
//     satisfy<T extends MapToProp<Checkers, 'type'>>(type: T, subject: unknown): subject is T
//   }
// }

// const any = { type: { any: { type: 'any', value: undefined } } }
// const unknown = { type: { unknown: { type: 'unknown', value: undefined } } }

// describe('checker: any', () => {
//   test('cast to any', () => {
//     const t = buildTypes(any, unknown)

//     const s: unknown = 1
//     if (t.satisfy(T.number, s)) {
//       assertType.isNumber(s)
//     }
//   })
// })

test.todo('not ready')
