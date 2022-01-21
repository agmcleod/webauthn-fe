import React, { useState, useEffect } from 'react'

import { getRequest } from 'common/api'
import { TokenData } from 'common/store/currentUser'

interface Props {
  logout: () => void
  tokenData: TokenData | null
}

async function getMessage(setMessage: (value: string) => void) {
  try {
    const body = await getRequest<{ accessed: boolean }>('/users/protected')
    setMessage(JSON.stringify(body))
  } catch (err: any) {
    setMessage(err.message)
  }
}

export function Dashboard({ logout, tokenData }: Props) {
  const [message, setMessage] = useState('')

  useEffect(() => {
    getMessage(setMessage)
  }, [setMessage])

  if (!tokenData) {
    return <h1>No token data</h1>
  }
  return (
    <div>
      <h1>Hi {tokenData.username}</h1>
      <p>{message}</p>
      <button type='button' onClick={() => logout()}>
        Logout
      </button>
    </div>
  )
}
