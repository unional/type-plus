// // https://stackoverflow.com/questions/53964071/how-to-dynamically-create-mapped-type-in-typescript

// export function mapObject<
//   TObject extends {},
//   TItem,
//   TKey extends keyof TObject = keyof TObject
// >(
//   obj: TObject,
//   callbackfn: (value: TObject[TKey], key: TKey, obj: TObject) => TItem
// ): { [K in TKey]: TItem } {
//   const result = {} as { [K in TKey]: TItem }
//   for (let key in obj) {
//     const k = key as any as TKey
//     if (obj.hasOwnProperty(key)) {
//       result[k] = callbackfn(obj[k], k, obj)
//     }
//   }
//   return result;
// }
