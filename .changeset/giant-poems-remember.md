---
'type-plus': patch
---

Fix `IndexAt` to return `number` when `A` is an array and `N` is `number`.

Fix `IndexAt` to return `N` when `A` is an array and `N` is negative.

Fix `IndexAt` to return `never` when `A` is an empty tuple, even when `N` is `number`.

Update `At` to use `IndexAt` to get consistent results.
