---
title: Categories
description: What does those icons mean?
---

The types and utilities in [`type-plus`](https://github.com/cyberuni/type-plus) can be categorized in one or more categories.

They can fit into multiple categories because they can be customizable.

## 💫 Endofunction

An endofunction (💫 dizzy) is a utility that map input to an output in the same category.

Transformation type (⚗️ alembic) transforms the input type from one set to another.

Technically, any type with type parameter are transformation type.
So that definition is not that helpful in our context.

Instead, we will use transformation type to describe the types that transform the input to a different form within the same category.

In category theory, it means the type is an endofunctor.

Other icons considered:

- ⚗️ :alembic:
- 🔄 :arrows_counterclockwise:
- 🚛 :articulated_lorry:
- ➰ :curly_loop:
- 💱 :currency_exchange:
- 🌀 :cyclone:
- 💠 :diamond_shape_with_a_dot_inside:
- ➿ :loop:
- 🪄 :magic_wand:
- 🔁 :repeat:
- 🔀 :twisted_rightwards_arrows:

## 🧱 Building Types

Building type (🧱 bricks) is a type that can be used to build other types.

(other icons considered: 🧰 toolbox, 🛠️ hammer_and_wrench)

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

## 🏃 Runtime

Runtime (🏃 runner) means the utility (e.g. a function) has runtime effect.

## Others

- 👽 *alias* (:alien:): Alias of another type
- 💥 *immediate* (:boom:): The effect of the type can be observed immediately during development
- 🩳 *shortcut* (:shorts:): Shortcut or convenient types
- 🦴 *utilities* (:bone:): provide various functionalities (other icons considered: 🔧🔨)

[type predicate]: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
[Assertion function]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions
