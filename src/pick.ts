import { reduceKey } from './reduceKey';

export function pick<T extends object>(obj: T, ...props: Array<keyof T>) {
  return reduceKey(obj, (p, k) => {
    if (props.indexOf(k) >= 0) p[k] = obj[k]
    return p
  }, {} as any)
}
