import { it } from '@jest/globals'
// 123 - 123 = 0
// => [[1, 2, 3], 0]
// -  [[1, 2, 3], 0]
// => [[0, 0, 0], 0]
// => [[0], 0]
// => 0

// 13579 - 97531 = -83952
// =>   [[  1,  3,  5,  7,  9], 0]
// -    [[  9,  7,  5,  3,  1], 0]
// =>   [[ -8, -4,  0,  4,  8], 0]
// => - [[  8,  4,  0, -4, -8], 0]
// => - [[  8,  3,  9,  5,  2], 0]

// 135 - 3579 = -3444
// =>   [    [  1,  3,  5], 0]
// -    [[  3,  5,  7,  9], 0]
// =>   [[ -3, -4, -4, -4], 0]
// => - [[  3,  4,  4,  4], 0]

// 1357.9 - 13.579 = 1344.321
// => [[1, 3, 5, 7, 9], 1]
// -  [[1, 3, 5, 7, 9], 3]
// => [[ 1, 3, 5, 7, 9,  0,  0], 3]
// -  [      [ 1, 3, 5,  7,  9], 3]
// => [[ 1, 3, 4, 4, 4, -7, -9], 3]
// => [[ 1, 3, 4, 4, 3,  2,  1], 3]

// 0 - 0.001 = -0.001
// =>   [[ 0], 0]
// -    [[ 1], 3]
// =>   [[ 0], 3]
// -    [[ 1], 3]
// =>   [[-1], 3]
// => - [[ 1], 3]
// => - [[ 0, 0, 0, 1], 3]
// => -0.001

// 0.1357 - 0.009753 = 0.125947
// =>   [            [  1,  3,  5,  7], 4]
// -    [            [  9,  7,  5,  3], 6]
// =>   [    [  1,  3,  5,  7,  0,  0], 6]
// -    [            [  9,  7,  5,  3], 6]
// =>   [    [  1,  3, -4,  0, -5, -3], 6]
// =>   [    [  1,  2,  5,  9,  4,  7], 6]
// =>   [[  0,  1,  2,  5,  9,  4,  7], 6]
// => 0.125947

// 0.009753 -  0.1357 = -0.125947
// =>   [        [  9,  7,  5,  3], 6]
// -    [        [  1,  3,  5,  7], 4]
// =>   [        [  9,  7,  5,  3], 6]
// -    [[  1,  3,  5,  7,  0,  0], 6]
// =>   [[ -1, -3,  4,  0,  5,  3], 6]
// => - [[  1,  3, -4,  0, -5, -3], 6]
// => - [[  1,  2,  5,  9,  4,  7], 6]

// 123 - 777 = -654
// =>   [[ 1,  2,  3], 0]
// -    [[ 7,  7,  7], 0]
// =>   [[-6, -5, -4], 0]
// => - [[ 6,  5,  4], 0]

it.todo('to be added')