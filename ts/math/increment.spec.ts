import { it } from '@jest/globals'
import { type Increment, testType } from '../index.js'

it('add 1', () => {
	testType.equal<Increment<0>, 1>(true)
})

it('work with large number', () => {
	testType.equal<Increment<7776>, 7777>(true)
})
