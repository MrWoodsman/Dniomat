// REACT
// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// COMPONENTS
import App from './App.jsx'
// CSS
import './index.scss'
// CONTEXT
import { DatesProvider } from './contexts/DatesContext.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <DatesProvider>
    <App />
  </DatesProvider>
  // </StrictMode>,
)
