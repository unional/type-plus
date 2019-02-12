import t from 'assert';
import { RecursiveRequired } from '.';

test('simple optional property becomes required', () => {
  type SimpleOptional = {
    x?: string
  }

  let actual: RecursiveRequired<SimpleOptional> = { x: '' }
  t.strictEqual(actual.x.length, 0)
})

test('deep optional object property becomes required', () => {
  type DeepOptonal = {
    x: {
      y?: string
    }
  }

  let actual: RecursiveRequired<DeepOptonal> = { x: { y: '' } }
  t.strictEqual(actual.x.y.length, 0)
})

test('deep optional array property becomes required', () => {
  type DeepArrayOptonal = {
    x: {
      y?: string
    }[]
  }

  let actual: RecursiveRequired<DeepArrayOptonal> = { x: [{ y: '' }] }
  t.strictEqual(actual.x[0].y.length, 0)
})

// Not supported

// test('simple optional array property becomes required', () => {
//   type SimpleArrayOptonal = Array<{ y?: string }>


//   let actual: RecursiveRequired<SimpleArrayOptonal> = [{ y: '' }]
//   t.strictEqual(actual[0].y.length, 0)
// })

// test('deep optional tuple property becomes required', () => {
//   type DeepArrayOptonal = {
//     x: [{
//       y?: string
//     }, {
//       z?: string
//     }]
//   }

//   let actual: RecursiveRequired<DeepArrayOptonal> = { x: [{ y: '' }, { z: '' }] }
//   t.strictEqual(actual.x[0].y.length, 0)
//   t.strictEqual(actual.x[1].z.length, 0)
// })
