import { AllType } from '../types'
import { analyze } from '../types/analyze'
import { satisfy } from '../types/satisfy'
import { anySpec } from './AnyType'
import { booleanSpec } from './Boolean'
import { Tuple } from './Tuple'
import { Type, TypeSpec } from './types'

// export type TypeChecker<Types extends Type<string, any>[]> = {

// }

export namespace TypeChecker {
  export type CheckOptions = {
    /**
     * Check in strict mode.
     * true = `conform()`.
     * false = `satisfy()`.
     */
    strict: boolean,
    /**
     * Turn on debug logging.
     */
    debug: boolean
  }

  export type Generate<Specs extends Array<TypeSpec<string, any>>, T extends Type<string, any>> =
    Tuple.FindByProp<Specs, 'type', T> extends never ? never :
    ReturnType<(typeof booleanSpec)['toNative']>
}

export function createTypeChecker<
  Specs extends Type<string, any>[]
>(..._typeSpec: Specs) {
  return {
    check<T extends AllType>(
      _options: TypeChecker.CheckOptions,
      type: T,
      subject: unknown): subject is TypeChecker.Generate<[typeof anySpec, typeof booleanSpec], T> {
      const result = satisfy.result = analyze({ strict: false, debug: false }, type, subject)
      return !result.analysis.fail
    }
  }
}
