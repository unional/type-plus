import { baseline } from '@unional/fixture'
import fs from 'fs'
import path from 'path'
import { types, optional } from '..'

const rules = optional.object.record(optional.string.create('error'))
const eslint = types.object.create({
  env: optional.object.create({
    es6: optional.boolean
  }),
  parseOptions: optional.object.create({
    ecmaVersion: optional.number.list(3, 5, 6, 7, 8, 9, 10, 11, 12),
    sourceType: optional.string.list('script', 'module'),
    ecmaFeatures: optional.object.create({
      globalReturn: optional.boolean,
      impliedStrict: optional.boolean,
      jsx: optional.boolean
    })
  }),
  plugins: optional.array.create(optional.string),
  overrides: optional.array.create(
    types.object.create({
      files: optional.array.create(optional.string),
      processor: optional.string,
      rules
    })
  ),
  rules
})

baseline('fixtures/eslint', ({ caseName, caseFolder }) => {
  test(`eslint ${caseName}`, () => {
    const config = JSON.parse(fs.readFileSync(`${path.join(caseFolder, caseName)}`, 'utf-8'))

    if (!types.satisfy(eslint, config)) fail('should satisfy')
    config.parseOptions?.ecmaVersion
    config.rules
  })
})
