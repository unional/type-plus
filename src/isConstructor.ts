import { AnyConstructor } from './class/AnyConstructor'

export function isConstructor(subject: unknown): subject is AnyConstructor {
  try {
    new (subject as any)()
  }
  catch (err) {
    if (err?.message?.indexOf('is not a constructor') >= 0) {
      return false
    }
  }
  return true
}
