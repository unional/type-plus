export function isConstructor(subject: unknown): subject is new (...args: any[]) => void {
  try {
    new (subject as any)()
  }
  catch (err) {
    if (err.message.indexOf('is not a constructor') >= 0) {
      return false
    }
  }
  return true
}
