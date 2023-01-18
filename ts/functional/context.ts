import type { LeftJoin } from '../object/index.js'

export type ContextBaseShape = Record<string | symbol, any>

/**
 * Extends the context with new props.
 * @param context the current context.
 * @return an additional context with new properties.
 */
export type ContextExtender<
  Current,
  Additional
> = (context: Current) => Additional

export type ContextBuilder<
  Init extends ContextBaseShape,
  Ctx extends ContextBaseShape
> = {
  /**
   * Extends the context using an extender.
   *
   * @type Additional The additional context to be added by the `extender`.
   * By default this is inferred by the `extender`.
   * But you can also explicitly specify it,
   * if the type is a superset of the actual return type of the `extender`.
   * @param extender function that add new props to the context.
   *
   * The extender only need to return a new object with additional properties.
   * The builder will merge that with the current context.
   *
   * If the extender specify an existing property,
   * it overrides the existing value.
   */
  extend<
    Additional extends ContextBaseShape = ContextBaseShape
  >(extender: ContextExtender<Ctx, Additional>)
    : ContextBuilder<Init, LeftJoin<Ctx, Additional>>,
  /**
   * Build and return the context.
   */
  build(): Ctx
}

/**
 * A fluent context builder.
 *
 * The initializer and transformer
 *
 * @param init The initial context or an context initializer.
 * @return the context builder where you can
 * use `extend()` to add context, and
 * use `build()` to build the context.
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

function contextBuilder(init: ContextBaseShape, transformers: ContextExtender<any, any>[]) {
  return {
    extend(transformer: ContextExtender<any, any>) {
      return contextBuilder(init, transformers.concat(transformer))
    },
    build() {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return transformers.reduce((p, t) => ({ ...p, ...t(p) }), init)
    }
  }
}
