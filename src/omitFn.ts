import { Omit } from './Omit';
import { reduceKey } from './reduceKey';
import { UnionKeys } from './UnionKeys';

export function omit<T extends object, P1 extends UnionKeys<T>>(subject: T, prop1: P1): Omit<T, P1>
export function omit<T extends object, P1 extends UnionKeys<T>, P2 extends UnionKeys<T>>(subject: T, prop1: P1, prop2: P2): Omit<T, P1 | P2>
export function omit<T extends object, P1 extends UnionKeys<T>, P2 extends UnionKeys<T>, P3 extends UnionKeys<T>>(subject: T, prop1: P1, prop2: P2, prop3: P3): Omit<T, P1 | P2 | P3>
export function omit<T extends object, P1 extends UnionKeys<T>, P2 extends UnionKeys<T>, P3 extends UnionKeys<T>, P4 extends UnionKeys<T>>(subject: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4): Omit<T, P1 | P2 | P3 | P4>
export function omit<T extends object, P1 extends UnionKeys<T>, P2 extends UnionKeys<T>, P3 extends UnionKeys<T>, P4 extends UnionKeys<T>, P5 extends UnionKeys<T>>(subject: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4, prop5: P5): Omit<T, P1 | P2 | P3 | P4 | P5>
export function omit<T extends object, P1 extends UnionKeys<T>, P2 extends UnionKeys<T>, P3 extends UnionKeys<T>, P4 extends UnionKeys<T>, P5 extends UnionKeys<T>, P6 extends UnionKeys<T>>(subject: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4, prop5: P5, prop6: P6): Omit<T, P1 | P2 | P3 | P4 | P5 | P6>
export function omit<T extends object, P1 extends UnionKeys<T>, P2 extends UnionKeys<T>, P3 extends UnionKeys<T>, P4 extends UnionKeys<T>, P5 extends UnionKeys<T>, P6 extends UnionKeys<T>, P7 extends UnionKeys<T>>(subject: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4, prop5: P5, prop6: P6, prop7: P7): Omit<T, P1 | P2 | P3 | P4 | P5 | P6 | P7>
export function omit<T extends object, P1 extends UnionKeys<T>, P2 extends UnionKeys<T>, P3 extends UnionKeys<T>, P4 extends UnionKeys<T>, P5 extends UnionKeys<T>, P6 extends UnionKeys<T>, P7 extends UnionKeys<T>, P8 extends UnionKeys<T>>(subject: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4, prop5: P5, prop6: P6, prop7: P7, prop8: P8): Omit<T, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8>
export function omit<T extends object, P1 extends UnionKeys<T>, P2 extends UnionKeys<T>, P3 extends UnionKeys<T>, P4 extends UnionKeys<T>, P5 extends UnionKeys<T>, P6 extends UnionKeys<T>, P7 extends UnionKeys<T>, P8 extends UnionKeys<T>, P9 extends UnionKeys<T>>(subject: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4, prop5: P5, prop6: P6, prop7: P7, prop8: P8, prop9: P9): Omit<T, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9>
export function omit<T extends object, P1 extends UnionKeys<T>, P2 extends UnionKeys<T>, P3 extends UnionKeys<T>, P4 extends UnionKeys<T>, P5 extends UnionKeys<T>, P6 extends UnionKeys<T>, P7 extends UnionKeys<T>, P8 extends UnionKeys<T>, P9 extends UnionKeys<T>, P10 extends UnionKeys<T>>(subject: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4, prop5: P5, prop6: P6, prop7: P7, prop8: P8, prop9: P9, prop10: P10): Omit<T, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10>
export function omit<T extends object, P1 extends UnionKeys<T>, P2 extends UnionKeys<T>, P3 extends UnionKeys<T>, P4 extends UnionKeys<T>, P5 extends UnionKeys<T>, P6 extends UnionKeys<T>, P7 extends UnionKeys<T>, P8 extends UnionKeys<T>, P9 extends UnionKeys<T>, P10 extends UnionKeys<T>, P11 extends UnionKeys<T>>(subject: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4, prop5: P5, prop6: P6, prop7: P7, prop8: P8, prop9: P9, prop10: P10, prop11: P11): Omit<T, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 | P11>
export function omit<T extends object, P1 extends UnionKeys<T>, P2 extends UnionKeys<T>, P3 extends UnionKeys<T>, P4 extends UnionKeys<T>, P5 extends UnionKeys<T>, P6 extends UnionKeys<T>, P7 extends UnionKeys<T>, P8 extends UnionKeys<T>, P9 extends UnionKeys<T>, P10 extends UnionKeys<T>, P11 extends UnionKeys<T>, P12 extends UnionKeys<T>>(subject: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4, prop5: P5, prop6: P6, prop7: P7, prop8: P8, prop9: P9, prop10: P10, prop11: P11, prop12: P12): Omit<T, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 | P11 | P12>
export function omit<T extends object>(subject: T, ...props: Array<UnionKeys<T>>) {
  return reduceKey(subject, (p, k) => {
    if (props.indexOf(k) === -1) p[k] = subject[k]
    return p
  }, {} as any)
}
