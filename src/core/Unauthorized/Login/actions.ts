import { FieldValues } from 'react-hook-form'
import * as base64 from 'base64-arraybuffer'
import { NavigateFunction } from 'react-router-dom'

import { getRequest, postRequest } from 'common/api'
import { publicKeyCredentialToObject } from 'common/helpers'
import { ACCESS_TOKEN_KEY } from 'common/store/currentUser'

interface Challenge {
  id: string
  challenge: string
}

interface AssertionOptions {
  challenge: string
  allowCredentials: { id: string; type: 'public-key' }[]
}

export function registerCredentials(
  values: FieldValues,
  setSubmitError: (val: string) => void
) {
  return async () => {
    try {
      const challengeRes = await getRequest<Challenge>('/users/challenge')

      // Created this here, but this config could also be retrieved from the server.
      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: base64.decode(challengeRes.challenge),
          rp: {
            name: 'Example',
            id: 'localhost',
          },
          user: {
            id: base64.decode(challengeRes.id),
            name: values.email,
            displayName: values.email,
          },
          pubKeyCredParams: [
            { alg: -7, type: 'public-key' },
            { alg: -257, type: 'public-key' },
          ],
          authenticatorSelection: {
            authenticatorAttachment: 'platform',
          },
          timeout: 60000,
          attestation: 'direct',
        },
      })

      const credentialJSON = publicKeyCredentialToObject(credential)
      console.log(credential)

      await postRequest('/users/register', {
        credential: credentialJSON,
        email: values.email,
      })
      setSubmitError('')
    } catch (err: any) {
      setSubmitError(err.message)
    }
  }
}

export async function loginUser(
  values: FieldValues,
  setSubmitError: (val: string) => void,
  setAccessToken: (val: string) => void,
  navigate: NavigateFunction
) {
  return async () => {
    try {
      const res = await getRequest<AssertionOptions>(
        `/auth/login?email=${values.email}`
      )
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: base64.decode(res.challenge),
          allowCredentials: res.allowCredentials.map((cred) => ({
            type: cred.type,
            id: base64.decode(cred.id),
          })),
        },
      })
      console.log(credential)
      const credentialJSON = publicKeyCredentialToObject(credential)
      const loginRes = await postRequest<{ access_token: string }>(
        '/auth/login',
        {
          email: values.email,
          credential: credentialJSON,
        }
      )

      setSubmitError('')
      setAccessToken(loginRes.access_token)
      localStorage.setItem(ACCESS_TOKEN_KEY, loginRes.access_token)
      navigate('/')
    } catch (err: any) {
      setSubmitError(err.message)
    }
  }
}
