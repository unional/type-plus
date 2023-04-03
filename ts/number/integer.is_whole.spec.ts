import { it } from '@jest/globals'
import { isType, type IsWhole } from '../index.js'

it('returns false if N is number as it can contain float', () => {
	isType.equal<true, IsWhole<number>, false>()
})

it('returns false if N is never', () => {
	isType.equal<true, IsWhole<never>, false>()
})

it('whole number is true', () => {
	isType.equal<true, true, IsWhole<1>>()
	isType.equal<true, true, IsWhole<1>>()
	isType.equal<true, true, IsWhole<0>>()
	isType.equal<true, true, IsWhole<0>>()
	isType.equal<true, true, IsWhole<-0>>()
	isType.equal<true, true, IsWhole<-1>>()
})

it('fraction is false', () => {
	isType.equal<true, false, IsWhole<0.1>>()
	isType.equal<true, false, IsWhole<-0.1>>()
})
