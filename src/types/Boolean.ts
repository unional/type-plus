export type Boolean<Value extends 'true' | 'false' = 'true' | 'false'> = { name: 'boolean', value: Value }

export const Boolean: Boolean = { name: 'boolean', value: 'false' as 'true' | 'false' }

export type True = Boolean<'true'>
export const True: True = { name: 'boolean', value: 'true' } as any

export type False = Boolean<'false'>
export const False: False = { name: 'boolean', value: 'false' } as any
