import React from 'react'

import { Error } from '../Error'

interface Props {
  field?: {
    message: string
  }
}

export function FormError({ field }: Props) {
  if (!field) {
    return null
  }

  return <Error>{field.message}</Error>
}
