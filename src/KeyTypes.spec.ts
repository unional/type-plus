import { KeyTypes } from '.';

test('contains type of all keys', () => {
  acceptKeys('a')
  acceptKeys(1)
  acceptKeys(Symbol())

  function acceptKeys(k: KeyTypes) { return k }
})
