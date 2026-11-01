import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { inject } from '@vercel/analytics'
import App from './App.tsx'

// Three pages, no router: the landing at /, the workspace at /app, the verifier at /verify.
// The workspace (and Midnight's WebAssembly contract runtime) loads only on /app.
const AppPage = lazy(() => import('./AppPage.tsx'))
const VerifyPage = lazy(() => import('./VerifyPage.tsx'))
const CheckPage = lazy(() => import('./CheckPage.tsx'))
const DocsPage = lazy(() => import('./DocsPage.tsx'))

// page views only, no cookies (Vercel Web Analytics); what visitors do is counted in api/stats.js
inject()

const clean = (p: string) => p.replace(/\/+$/, '') || '/'
if (clean(location.pathname) === '/workspace') history.replaceState(null, '', `/app${location.search}${location.hash}`)
const route = clean(location.pathname).startsWith('/docs') ? '/docs' : clean(location.pathname)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {route === '/app' || route === '/verify' || route === '/check' || route === '/docs' ? (
      <Suspense fallback={<div className="min-h-dvh bg-night-deep" />}>
        {route === '/app' ? <AppPage /> : route === '/check' ? <CheckPage /> : route === '/docs' ? <DocsPage /> : <VerifyPage />}
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
)
