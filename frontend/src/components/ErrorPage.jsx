import React from 'react'

const ErrorPage = ({error}) => {
  return (
    <div className='h-screen content-center justify-self-center text-red-600 font-medium text-3xl'>
        Hata: {error}
    </div>
  )
}

export default ErrorPage;