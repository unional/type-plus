import { baseline } from '@unional/fixture'
import fs from 'fs'
import path from 'path'
import { satisfy, types } from '.'

const eslint = types.object.create({
  parseOptions: types.object.create({
    ecmaVersion: types.number.optional.list(3, 5, 6, 7, 8, 9, 10, 11, 12),
    sourceType: types.string.optional.list('script', 'module')
  })
})

baseline('fixtures/eslint', ({ caseName, caseFolder }) => {
  test(`eslint ${caseName}`, () => {
    const config = JSON.parse(fs.readFileSync(`${path.join(caseFolder, caseName)}`, 'utf-8'))

    if (!satisfy(eslint, config)) fail('should satisfy')
  })
})
