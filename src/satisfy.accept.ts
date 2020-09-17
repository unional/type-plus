import { baseline } from '@unional/fixture'
import fs from 'fs'
import path from 'path'
import { satisfy, types } from '.'

const rules = types.object.optional.record(types.string.create('error'))
const eslint = types.object.create({
  env: types.object.optional.create({
    es6: types.boolean.optional
  }),
  parseOptions: types.object.optional.create({
    ecmaVersion: types.number.optional.list(3, 5, 6, 7, 8, 9, 10, 11, 12),
    sourceType: types.string.optional.list('script', 'module'),
    ecmaFeatures: types.object.optional.create({
      globalReturn: types.boolean.optional,
      impliedStrict: types.boolean.optional,
      jsx: types.boolean.optional
    })
  }),
  plugins: types.array.optional.create(types.string),
  overrides: types.array.optional.create(
    types.object.create({
      files: types.array.optional.create(types.string),
      processor: types.string.optional,
      rules
    })
  ),
  rules
})

baseline('fixtures/eslint', ({ caseName, caseFolder }) => {
  test(`eslint ${caseName}`, () => {
    const config = JSON.parse(fs.readFileSync(`${path.join(caseFolder, caseName)}`, 'utf-8'))

    if (!satisfy(eslint, config)) fail('should satisfy')
    config.parseOptions?.ecmaVersion
    config.rules
  })
})
