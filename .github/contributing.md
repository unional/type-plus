# Contributing Guide

## Icons

- 👽 *alias* (:alien:): Alias of another type
- 🚦 *assertion* (:vertical_traffic_light:): assertion function
- 💀 *deprecated* (:skull:): deprecated and will be removed soon
- 🛡️ *guard* (:shield:): type guard function
- 💥 *immediate* (:boom:): The effect of the type can be observed immediately during development
- 🏃 *runtime* (:runner:): The function has runtime effect
- 🩳 *shortcut* (:shorts:): Shortcut or convenient types
- 🧪 *testing* (:test_tube:): The type or function are designed for test
- ⚗️ *transform* (:alembic:): These types transforms the input to another category
- 🧰 *type util* (:toolbox:): types for building types
- 🦴 *utilities* (:bone:): provide various functionalities (other icons considered: 🔧🔨)

## 🌪️ *filter*

`:tornado:`

This icon indicates that the type is a filter, or filter by default.

*filter* type is also known as *parse* type, as in [Parse, don't validate](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/).

These types perform some kind of test.
If the input passes the test, the input is returned.
Otherwise, it returns `never`.

The returned input can be narrowed if the type is 🔀 *distributive*.

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

## 🎭 *predicate*

`:performing_arts:`

This icon indicates that the type is a predicate, or predicate by default.

*predicate* type is also known as *validate* or *logical* type.
These types perform some kind of test.
If the input passes the test,
it returns `true` or `false`

(other icons considered: ⭕)

## 🔀 *distributive*

`:twisted_rightwards_arrows:`

This icon indicates that the type is distributive, or distributive by default.

This means each value in an union type will be evaluated separately in conditional types,
so both branches may be executed.

```ts
type R = IsUndefined<string | undefined> // true | false -> boolean
```
