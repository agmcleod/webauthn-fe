import React, { useState, useMemo } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Error } from 'common/components/Error'
import * as base64 from 'common/base64'

import { getRequest, postRequest } from 'common/api'
import { FormError } from 'common/components/FormError'
import { publicKeyCredentialToObject } from 'common/helpers'
import { Wrapper } from './styled'

interface Challenge {
  id: string
  challenge: string
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
})

export function Home() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const supportsCredentials = useMemo(
    () => Boolean(window.PublicKeyCredential && navigator.credentials),
    []
  )

  const [submitError, setSubmitError] = useState('')

  async function onSubmit(values: FieldValues) {
    try {
      const challengeRes = await getRequest<Challenge>('/users/challenge')

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
          pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
          authenticatorSelection: {
            authenticatorAttachment: 'platform',
          },
          timeout: 60000,
          attestation: 'direct',
          // attestation: 'none'
        },
      })

      const body = publicKeyCredentialToObject(credential)

      await postRequest('/users/register', body)
      setSubmitError('')
    } catch (err: any) {
      setSubmitError(err.message)
    }
  }

  return (
    <Wrapper>
      <h1>Register an account here</h1>

      {supportsCredentials ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor='email'>Email</label>
            <input {...register('email')} id='email' />
            <FormError field={errors.email} />
          </div>
          {submitError ? <Error>{submitError}</Error> : null}
          <button type='submit'>Register</button>
        </form>
      ) : (
        <p>Webuathn not supported</p>
      )}
    </Wrapper>
  )
}
