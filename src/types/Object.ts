// import { BigInt } from './BigInt'
// import { Boolean } from './Boolean'
// import { Null } from './Null'
// import { Number } from './Number'
// import { String } from './String'
// import { Symbol } from './Symbol'
// import { Undefined } from './Undefined'
// type AllTypes = Undefined | Null | Boolean | Number | String
//   | BigInt | Symbol

export type Object = { name: 'object', fields: any[] }

export const object = {
  props(fields: any): any {
    return {
      name: 'object',
      fields
    }
  }
}
