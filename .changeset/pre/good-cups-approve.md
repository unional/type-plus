---
"type-plus": patch
---

Remove `exports.default` in `package.json`.

That provide the wrong file to systems expecting CJS.
May need to add a different one for browser-spec.
