import { AnyConstructor } from './AnyConstructor'

export function isConstructor(subject: unknown): subject is AnyConstructor {
  try {
    new (subject as AnyConstructor)()
  }
  catch (err: any) {
    const msg = err?.message as string | undefined
    if (msg && msg.indexOf('is not a constructor') >= 0) {
      return false
    }
  }
  return true
}
