# Type Categories

## ⚗️ Transformation

Transformation type (⚗️ alembic) transforms the input type from one set to another.

Technically, any type with type parameter are transformation type.
So that definition is not that helpful in our context.

Instead, we will use transformation type to describe the types that transform the input to a different form within the same category.

## 🧱 Building Types

Building type (🧱 bricks) is a type that can be used to build other types.

(other icons considered: 🧰 toolbox, 🛠️ hammer_and_wrench)

## 💀 Deprecated

Deprecated type (💀 deprecated) is a type that is deprecated and will be removed soon.

## 🛡️ Type Guard

Type guard (🛡️ guard) is a specific type of predicate function in TypeScript that can narrow the type of the input parameter to its subtype.
The return value of a type guard function is a [type predicate].

## 🚦 Assertion Functions

[Assertion function] (🚦 vertical_traffic_light) is a specific kind of function that narrows the input type using the `asserts condition` syntax.

They act like NodeJS's `assert()` function. The function is used as a statement.
If the assertion fails, it throws an exception. Otherwise, TypeScript knows the `asserts condition` is met,
and the input type is narrowed according to the condition in the remaining of the scope.

## 🧪 Testing

Testing types or functions (🧪 test_tube) are designed for testing.

## 🌪️ Filter

Filter (🌪️ tornado) is a type or function that filters the input.
If the input passes the filter, it is returned unchanged. Otherwise, it returns `never`.

Filter is also known as *pares*, as in [Parse, don't validate].

The returned input can be narrowed if [🔀 distributive] is enabled (on by default).

This means it is better to infer the return type instead of reusing the input type:

```ts
type IsUndefined<T> = T extends undefined ? T : never

// yes, these are silly, but just an example
type Bad<T> = IsUndefined<T> extends T ? T : never
type Good<T> = IsUndefined<T> extends infer R ? R : never

type R1 = Bad<undefined | number> // undefined | number
type R2 = Good<undefined | number> // undefined
```

(other icons considered: ↪️👉🚋⏩🐾🔑🚪💂🧲🙅‍♂️🪚)

## 🎭 Predicate

Predicate (🎭 performing_arts) is also known as *validate* or *logical*.
If the input satisfies the predicate, it returns `true`. Otherwise, `false`.

(other icons considered: ⭕)

## 🏃 Runtime

Runtime (🏃 runner) means the utility (e.g. a function) has runtime effect.

## Others

- 👽 *alias* (:alien:): Alias of another type
- 💥 *immediate* (:boom:): The effect of the type can be observed immediately during development
- 🩳 *shortcut* (:shorts:): Shortcut or convenient types
- 🦴 *utilities* (:bone:): provide various functionalities (other icons considered: 🔧🔨)

[type predicate]: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
[Assertion function]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions
[Parse, don't validate]: https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/
[🔀 distributive]: ./type_options.md#🔀-distributive
