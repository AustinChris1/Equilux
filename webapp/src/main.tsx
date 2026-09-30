import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Three pages, no router: the landing at /, the workspace at /app, the verifier at /verify.
// The workspace (and Midnight's WebAssembly contract runtime) loads only on /app.
const AppPage = lazy(() => import('./AppPage.tsx'))
const VerifyPage = lazy(() => import('./VerifyPage.tsx'))

const clean = (p: string) => p.replace(/\/+$/, '') || '/'
if (clean(location.pathname) === '/workspace') history.replaceState(null, '', `/app${location.search}${location.hash}`)
const route = clean(location.pathname)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {route === '/app' || route === '/verify' ? (
      <Suspense fallback={<div className="min-h-dvh bg-night-deep" />}>
        {route === '/app' ? <AppPage /> : <VerifyPage />}
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
)
