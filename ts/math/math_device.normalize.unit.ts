import { it } from '@jest/globals'

it.todo('to be migrated')

// subtract
// 100 - 1 = 99
// 1 - 2 = -1

// it('shift bigint', () => {
// 	testType.equal<MathDevice.Normalize<['bigint', '+', [1, -1]]>, ['bigint', '+', [9]]>(true)
// })


// it('normalizes negative bigint', () => {
// 	testType.equal<MathDevice.Normalize<['bigint', '-', [10]]>, ['bigint', '-', [1, 0]]>(true)

// 	testType.equal<MathDevice.Normalize<['bigint', '-', [81]]>, ['bigint', '-', [8, 1]]>(true)

// 	testType.equal<MathDevice.Normalize<['bigint', '-', [1, 10]]>, ['bigint', '-', [2, 0]]>(true)
// 	testType.equal<MathDevice.Normalize<['bigint', '-', [1, 81]]>, ['bigint', '-', [9, 1]]>(true)

// 	testType.equal<MathDevice.Normalize<['bigint', '-', [81, 81]]>, ['bigint', '-', [8, 9, 1]]>(true)

// 	testType.equal<
// 		MathDevice.Normalize<['bigint', '-', [9, 9, 9, 9, 10]]>,
// 		['bigint', '-', [1, 0, 0, 0, 0, 0]]
// 	>(true)
// })

// it('remain unchanged if every digits are single digits for number', () => {
// 	testType.equal<MathDevice.Normalize<['number', '+', [0], []]>, ['number', '+', [0], []]>(true)
// 	testType.equal<MathDevice.Normalize<['number', '+', [9], []]>, ['number', '+', [9], []]>(true)
// 	testType.equal<MathDevice.Normalize<['number', '+', [1, 2, 3], []]>, ['number', '+', [1, 2, 3], []]>(true)

// 	testType.equal<MathDevice.Normalize<['number', '+', [0], [1]]>, ['number', '+', [0], [1]]>(true)
// 	testType.equal<MathDevice.Normalize<['number', '+', [9], [1, 2, 3]]>, ['number', '+', [9], [1, 2, 3]]>(true)

// 	testType.equal<MathDevice.Normalize<['number', '-', [0], []]>, ['number', '-', [0], []]>(true)
// 	testType.equal<MathDevice.Normalize<['number', '-', [9], []]>, ['number', '-', [9], []]>(true)
// 	testType.equal<MathDevice.Normalize<['number', '-', [1, 2, 3], []]>, ['number', '-', [1, 2, 3], []]>(true)
// })

// it('normalizes positive number', () => {
// 	testType.equal<MathDevice.Normalize<['number', '+', [10], []]>, ['number', '+', [1, 0], []]>(true)

// 	testType.equal<MathDevice.Normalize<['number', '+', [81], []]>, ['number', '+', [8, 1], []]>(true)

// 	testType.equal<MathDevice.Normalize<['number', '+', [1, 10], []]>, ['number', '+', [2, 0], []]>(true)
// 	testType.equal<MathDevice.Normalize<['number', '+', [1, 81], []]>, ['number', '+', [9, 1], []]>(true)

// 	testType.equal<MathDevice.Normalize<['number', '+', [81, 81], []]>, ['number', '+', [8, 9, 1], []]>(true)

// 	testType.equal<
// 		MathDevice.Normalize<['number', '+', [9, 9, 9, 9, 10], []]>,
// 		['number', '+', [1, 0, 0, 0, 0, 0], []]
// 	>(true)

// 	testType.equal<
// 		MathDevice.Normalize<['number', '+', [1, 2, 3], [4, 11]]>,
// 		['number', '+', [1, 2, 3], [5, 1]]
// 	>(true)

// 	testType.equal<
// 		MathDevice.Normalize<['number', '+', [1, 2, 3], [9, 11]]>,
// 		['number', '+', [1, 2, 4], [0, 1]]
// 	>(true)
// })

// it('normalizes negative number', () => {
// 	testType.equal<MathDevice.Normalize<['number', '-', [10], []]>, ['number', '-', [1, 0], []]>(true)

// 	testType.equal<MathDevice.Normalize<['number', '-', [81], []]>, ['number', '-', [8, 1], []]>(true)

// 	testType.equal<MathDevice.Normalize<['number', '-', [1, 10], []]>, ['number', '-', [2, 0], []]>(true)
// 	testType.equal<MathDevice.Normalize<['number', '-', [1, 81], []]>, ['number', '-', [9, 1], []]>(true)

// 	testType.equal<MathDevice.Normalize<['number', '-', [81, 81], []]>, ['number', '-', [8, 9, 1], []]>(true)

// 	testType.equal<
// 		MathDevice.Normalize<['number', '-', [9, 9, 9, 9, 10], []]>,
// 		['number', '-', [1, 0, 0, 0, 0, 0], []]
// 	>(true)

// 	testType.equal<
// 		MathDevice.Normalize<['number', '-', [1, 2, 3], [4, 11]]>,
// 		['number', '-', [1, 2, 3], [5, 1]]
// 	>(true)

// 	testType.equal<
// 		MathDevice.Normalize<['number', '-', [1, 2, 3], [9, 11]]>,
// 		['number', '-', [1, 2, 4], [0, 1]]
// 	>(true)
// })

// it('normalizes positive number to negative', () => {
// 	testType.equal<MathDevice.Normalize<['number', '+', [-1], []]>, ['number', '-', [1], []]>(true)

// 	testType.equal<MathDevice.Normalize<['number', '+', [0], [-10]]>, ['number', '-', [1], []]>(true)
// })
