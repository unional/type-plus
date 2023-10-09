---
"type-plus": minor
---

Add `$DefineInputOptions` and `$DefineBranchOptions`.
Add support of handing `$any`, `$unknown`, `$never` for `IsAny`.

Add `$ResolveBranch` that fixes the `unknown` passthrough issue.

The types will be able to use in the form of `IsAny<T, { $then:..., $else:...}>`, hopefully.

It's still not recommended to do so, but at least it will not produce weird results.

Will need to convert other types to support that and add tests for them.
