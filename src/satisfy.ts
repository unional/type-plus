import * as types from './types'

export function satisfy<T extends types.AllTypes>(type: T, subject: unknown): subject is types.ConvertToActual<T> {
  switch (type.name) {
    case 'undefined':
    case 'boolean':
    case 'number':
      return typeof subject === type.name
    case 'null':
      return subject === null
  }
  return false
}
