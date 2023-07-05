---
"type-plus": patch
---

Rename `caseNoMatch` to `caseNotMatch`.
Rename `caseUnionMiss` to `caseUnionNotMatch`.

Change `caseUnionNotMatch` default from `undefined` to `never`,
making it defaults to the type behavior instead of JavaScript behavior.
