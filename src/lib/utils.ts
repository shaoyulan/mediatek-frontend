export function isValidKey(key:string, object:object): key is keyof typeof object{
  return key in object
}