import { encode } from 'base64-arraybuffer'

type PubKeyData =
  | Credential
  | ArrayBuffer
  | Array<ArrayBuffer>
  | { [key: string]: PubKeyData }
  | string
  | Array<PubKeyData>
  | null

export function publicKeyCredentialToObject(
  pubKeyCred: PubKeyData
): PubKeyData {
  if (pubKeyCred instanceof Array) {
    return pubKeyCred.map((i) => publicKeyCredentialToObject(i))
  }

  if (pubKeyCred instanceof ArrayBuffer) {
    return encode(pubKeyCred)
  }

  if (pubKeyCred instanceof Object) {
    const obj: { [key: string]: PubKeyData } = {}

    const sourceObj = pubKeyCred as { [key: string]: PubKeyData }
    for (const key in sourceObj) {
      if (typeof sourceObj[key] !== 'function') {
        obj[key] = publicKeyCredentialToObject(sourceObj[key])
      }
    }

    return obj
  }

  return pubKeyCred
}
