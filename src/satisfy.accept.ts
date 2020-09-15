import { satisfy, types } from '.'
import fs from 'fs'
import path from 'path'
import { baseline } from '@unional/fixture'

const eslint = types.object.create({
  parseOptions: types.union.create(
    types.undefined,
    types.object.create({
      ecmaVersion: types.union.create(
        types.undefined,
        types.number
      )
    })
  )
})
baseline('fixtures/eslint', ({ caseName, caseFolder }) => {
  test(`eslint ${caseName}`, () => {
    const config = JSON.parse(fs.readFileSync(`${path.join(caseFolder, caseName)}`, 'utf-8'))

    expect(satisfy(eslint, config)).toBe(true)
  })
})
