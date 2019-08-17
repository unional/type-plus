import { assertType, HasKey, hasKey } from '.';

describe('HasKey<T, K>', () => {
  test('true if has key', () => {
    type Foo = { a: 1, b: 2 }
    const actual = false as HasKey<Foo, 'a'>
    assertType.isTrue(actual)
  })

  test('false if do not have key', () => {
    type Foo = { a: 1, b: 2 }
    const actual = true as HasKey<Foo, 'c'>
    assertType.isFalse(actual)
  })
});

describe('hasKey()', () => {
  test('true if has key', () => {
    const subject = { a: 1, b: 2 }

    expect(hasKey(subject, 'a')).toBeTruthy()
    expect(hasKey(subject, 'b')).toBeTruthy()
    expect(hasKey(subject, 'a', 'b')).toBeTruthy()
  })
  test('false if do not have key', () => {
    const subject = { a: 1, b: 2 }

    expect(hasKey(subject, 'c')).toBeFalsy()
    expect(hasKey(subject, 'a', 'c')).toBeFalsy()
  })
});
