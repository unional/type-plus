import { AllType } from './AllTypes'

export function strictCheck<T extends AllType>(type: T, subject: unknown): subject is T {

  return false;
}
