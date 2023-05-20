---
'type-plus': patch
---

Add `Upper` and `Lower` for `IndexAt`.

This allow fine-grained control over the `IndexAt` behavior,
when the value is out of bounds.

This is used in cases where out-of-bounds values are coarsen to the upper and lower bound of the subject array.
