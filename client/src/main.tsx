import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserContextProvider } from './contextProvider/userContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </BrowserRouter>
  </StrictMode>
)
