import Login from '@/components/Login'
import React from 'react'
import { getProviders } from "next-auth/react"
function LoginPage({providers}:any) {
  return (
    <Login providers={providers} />
  )
}

export default LoginPage

export async function getServerSideProps(){
    const providers = await getProviders();
    return {
        props:{
            providers
        }
    }
}