import { baseline } from '@unional/fixture'
import fs from 'fs'
import path, { dirname } from 'path'
import * as T from './index.js'
import { O } from './optional.js'

const eslint = T.object.create({
	env: O.object.create({
		es6: O.boolean
	}),
	parseOptions: O.object.create({
		ecmaVersion: O.number.list(3, 5, 6, 7, 8, 9, 10, 11, 12),
		sourceType: O.string.list('script', 'module'),
		ecmaFeatures: O.object.create({
			globalReturn: O.boolean,
			impliedStrict: O.boolean,
			jsx: O.boolean
		})
	}),
	plugins: O.array.create(O.string),
	overrides: O.array.create(
		T.object.create({
			files: O.array.create(O.string),
			processor: O.string,
			rules: O.record.create(O.string.create('error'))
		})
	),
	rules: O.record.create(O.string.create('error'))
})

baseline('fixtures/eslint', ({ caseName, casePath }) => {
	test(`eslint ${caseName}`, () => {
		const config: unknown = JSON.parse(fs.readFileSync(casePath, 'utf-8'))

		if (!T.satisfy(eslint, config)) fail('should satisfy')
	})
})
