import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../provider/AuthProvider'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import "bootstrap/dist/css/bootstrap.min.css";

const options = {
  timeout: 5000,
  position: 'top center',
  offset: '30px',
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AlertProvider template={AlertTemplate} {...options}>
        <Component {...pageProps} />
      </AlertProvider>
    </AuthProvider>
  )
}

export default MyApp
