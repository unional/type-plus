import type { LeftJoin } from '../object/index.js'

export type ContextBaseShape = Record<string | symbol, any>

export type ContextTransformer<
  Current,
  Additional
> = (context: Current) => Additional

export type ContextBuilder<
  Init extends ContextBaseShape,
  Ctx extends ContextBaseShape
> = {
  extend<
    Current extends ContextBaseShape = Ctx,
    Additional extends ContextBaseShape = ContextBaseShape
  >(transformer: ContextTransformer<Current, Additional>)
    : ContextBuilder<Init, LeftJoin<Current, Additional>>,
  build(): Ctx
}

/**
 * A fluent context builder.
 */
export function context<
  Init extends ContextBaseShape,
  Ctx extends ContextBaseShape = Init
>(init?: Init | (() => Init)): ContextBuilder<Init, Ctx> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return typeof init === 'function'
    ? contextBuilder({}, [init])
    : contextBuilder(init ?? {}, []) as any
}

function contextBuilder(init: ContextBaseShape, transformers: ContextTransformer<any, any>[]) {
  return {
    extend(transformer: ContextTransformer<any, any>) {
      return contextBuilder(init, transformers.concat(transformer))
    },
    build() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return transformers.reduce((p, t) => ({ ...p, ...t(p) }), init)
    }
  }
}
