import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { SupabaseProvider } from './context/SupabaseContext'
import { AudioProvider } from './context/AudioContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SupabaseProvider>
      <AudioProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AudioProvider>
    </SupabaseProvider>
  </React.StrictMode>
)
