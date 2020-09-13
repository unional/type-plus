export type Boolean<Value extends 'true' | 'false' = 'true' | 'false'> = { name: 'boolean', value: Value }

export const boolean: Boolean & { true: True, false: False } = {
  name: 'boolean',
  value: 'false' as 'true' | 'false',
  true: { name: 'boolean', value: 'true' },
  false: { name: 'boolean', value: 'false' }
}

export type True = Boolean<'true'>

export type False = Boolean<'false'>
