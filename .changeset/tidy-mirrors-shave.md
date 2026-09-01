---
'type-plus': patch
---

Update runtime dependencies: `tersify` `^3.11.1` -> `^4.0.6` and `unpartial` `^1.0.4` -> `^1.0.7`.

Both are runtime `dependencies` of `type-plus`, so this changes what consumers resolve.

Two consumer-visible consequences, neither of which touches the type-level API:

- `assertType`'s failure message renders the validator through `tersify`, and `tersify@4`
  preserves the quote style of the original source instead of normalising it to double
  quotes. A validator written as `subject => typeof subject === 'boolean'` now reports
  `subject fails to satisfy subject => typeof subject === 'boolean'` rather than
  `... === "boolean"`. Only the diagnostic string changed; the assertion behaviour did not.
- `unpartial@1.0.7` declares `engines: { node: '>= 20' }`, so the effective Node floor for
  `type-plus`'s runtime dependencies is Node 20. `tersify@4` also targets ES2020 (it was
  ES5 in v3).
