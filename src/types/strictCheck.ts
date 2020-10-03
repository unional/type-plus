import { AllType } from './AllType'

export function strictCheck<T extends AllType>(type: T, subject: unknown): subject is T {

  return false;
}
