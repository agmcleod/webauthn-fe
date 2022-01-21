import React, { useState, useMemo, BaseSyntheticEvent } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { NavigateFunction, useNavigate } from 'react-router-dom'

import { Error } from 'common/components/Error'
import { FormError } from 'common/components/FormError'
import { Wrapper } from './styled'

const schema = yup.object().shape({
  email: yup.string().email().required(),
})

interface Props {
  loginUser: (
    values: FieldValues,
    setSubmitError: (val: string) => void,
    setAccessToken: (val: string) => void,
    navigate: NavigateFunction
  ) => void
  registerCredentials: (
    values: FieldValues,
    setSubmitError: (val: string) => void
  ) => void
  setAccessToken: (value: string) => void
}

export function Login({
  setAccessToken,
  loginUser,
  registerCredentials,
}: Props) {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const navigate = useNavigate()

  const supportsCredentials = useMemo(
    () => Boolean(window.PublicKeyCredential && navigator.credentials),
    []
  )

  const [submitError, setSubmitError] = useState('')

  async function onSubmit(values: FieldValues, event?: BaseSyntheticEvent) {
    if (event?.type === 'submit') {
      registerCredentials(values, setSubmitError)
    } else if (event?.type === 'click') {
      loginUser(values, setSubmitError, setAccessToken, navigate)
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
          <button type='button' onClick={handleSubmit(onSubmit)}>
            Login
          </button>
        </form>
      ) : (
        <p>Webuathn not supported</p>
      )}
    </Wrapper>
  )
}
