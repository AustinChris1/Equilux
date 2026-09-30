import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Two pages, no router: the landing at /, the workspace at /app.
// The workspace (and Midnight's WebAssembly contract runtime) loads only on /app.
const AppPage = lazy(() => import('./AppPage.tsx'))

const clean = (p: string) => p.replace(/\/+$/, '') || '/'
if (clean(location.pathname) === '/workspace') history.replaceState(null, '', `/app${location.search}${location.hash}`)
const isApp = clean(location.pathname) === '/app'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isApp ? (
      <Suspense fallback={<div className="min-h-dvh bg-night-deep" />}>
        <AppPage />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
)
