import { reduceKey } from './reduceKey';

export function pick<T extends object, P1 extends keyof T>(subject: T, prop1: P1): Pick<T, P1>
export function pick<T extends object, P1 extends keyof T, P2 extends keyof T>(subject: T, prop1: P1, prop2: P2): Pick<T, P1 | P2>
export function pick<T extends object, P1 extends keyof T, P2 extends keyof T, P3 extends keyof T>(subject: T, prop1: P1, prop2: P2, prop3: P3): Pick<T, P1 | P2 | P3>
export function pick<T extends object, P1 extends keyof T, P2 extends keyof T, P3 extends keyof T, P4 extends keyof T>(subject: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4): Pick<T, P1 | P2 | P3 | P4>
export function pick<T extends object, P1 extends keyof T, P2 extends keyof T, P3 extends keyof T, P4 extends keyof T, P5 extends keyof T>(subject: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4, prop5: P5): Pick<T, P1 | P2 | P3 | P4 | P5>
export function pick<T extends object, P1 extends keyof T, P2 extends keyof T, P3 extends keyof T, P4 extends keyof T, P5 extends keyof T, P6 extends keyof T>(subject: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4, prop5: P5, prop6: P6): Pick<T, P1 | P2 | P3 | P4 | P5 | P6>
export function pick<T extends object, P1 extends keyof T, P2 extends keyof T, P3 extends keyof T, P4 extends keyof T, P5 extends keyof T, P6 extends keyof T, P7 extends keyof T>(subject: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4, prop5: P5, prop6: P6, prop7: P7): Pick<T, P1 | P2 | P3 | P4 | P5 | P6 | P7>
export function pick<T extends object, P1 extends keyof T, P2 extends keyof T, P3 extends keyof T, P4 extends keyof T, P5 extends keyof T, P6 extends keyof T, P7 extends keyof T, P8 extends keyof T>(subject: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4, prop5: P5, prop6: P6, prop7: P7, prop8: P8): Pick<T, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8>
export function pick<T extends object, P1 extends keyof T, P2 extends keyof T, P3 extends keyof T, P4 extends keyof T, P5 extends keyof T, P6 extends keyof T, P7 extends keyof T, P8 extends keyof T, P9 extends keyof T>(subject: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4, prop5: P5, prop6: P6, prop7: P7, prop8: P8, prop9: P9): Pick<T, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9>
export function pick<T extends object, P1 extends keyof T, P2 extends keyof T, P3 extends keyof T, P4 extends keyof T, P5 extends keyof T, P6 extends keyof T, P7 extends keyof T, P8 extends keyof T, P9 extends keyof T, P10 extends keyof T>(subject: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4, prop5: P5, prop6: P6, prop7: P7, prop8: P8, prop9: P9, prop10: P10): Pick<T, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10>
export function pick<T extends object, P1 extends keyof T, P2 extends keyof T, P3 extends keyof T, P4 extends keyof T, P5 extends keyof T, P6 extends keyof T, P7 extends keyof T, P8 extends keyof T, P9 extends keyof T, P10 extends keyof T, P11 extends keyof T>(subject: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4, prop5: P5, prop6: P6, prop7: P7, prop8: P8, prop9: P9, prop10: P10, prop11: P11): Pick<T, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 | P11>
export function pick<T extends object, P1 extends keyof T, P2 extends keyof T, P3 extends keyof T, P4 extends keyof T, P5 extends keyof T, P6 extends keyof T, P7 extends keyof T, P8 extends keyof T, P9 extends keyof T, P10 extends keyof T, P11 extends keyof T, P12 extends keyof T>(subject: T, prop1: P1, prop2: P2, prop3: P3, prop4: P4, prop5: P5, prop6: P6, prop7: P7, prop8: P8, prop9: P9, prop10: P10, prop11: P11, prop12: P12): Pick<T, P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 | P11 | P12>
export function pick<T extends object>(subject: T, ...props: Array<keyof T>) {
  return reduceKey(subject, (p, k) => {
    if (props.indexOf(k) >= 0) p[k] = subject[k]
    return p
  }, {} as any)
}


// by Titian Cernicova-Dragomir
// https://github.com/microsoft/TypeScript/issues/28339#issuecomment-463577347
export type Pick<T, K extends keyof T> = T extends T ? { [P in K]: T[P] } : never
