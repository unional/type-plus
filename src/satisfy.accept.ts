import { baseline } from '@unional/fixture'
import fs from 'fs'
import path from 'path'
import { satisfy, types } from '.'

const eslint = types.object.create({
  parseOptions: types.object.optional.create({
    ecmaVersion: types.number.optional.list(3, 5, 6, 7, 8, 9, 10, 11, 12),
    // ecmaVersion2: types.union.optional.create(
    //   types.number.create(3),
    //   types.number.create(5),
    //   types.number.create(6),
    //   types.number.create(7),
    //   types.number.create(8),
    //   types.number.create(9),
    //   types.number.create(10),
    //   types.number.create(11),
    //   types.number.create(12)
    // ),
    sourceType: types.string.optional.list('script', 'module'),
    // sourceType2: types.union.optional.create(
    //   types.string.create('script'),
    //   types.string.create('module')
    // ),
    ecmaFeatures: types.object.optional.create({
      globalReturn: types.boolean.optional,
      impliedStrict: types.boolean.optional,
      jsx: types.boolean.optional
    })
  }),
  rules: types.object.record({
    string: types.string.create('error')
  })
})

baseline('fixtures/eslint', ({ caseName, caseFolder }) => {
  test(`eslint ${caseName}`, () => {
    const config = JSON.parse(fs.readFileSync(`${path.join(caseFolder, caseName)}`, 'utf-8'))

    if (!satisfy(eslint, config)) fail('should satisfy')
    config.parseOptions?.ecmaVersion
  })
})
