import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style/css/style.css'
import { AppUserProvider } from './context/userContext.jsx'
import { AppServicesProvider } from './context/servicesContext.jsx'
import { AppReviewsProvider } from './context/reviewsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppUserProvider>
      <AppServicesProvider>
        <AppReviewsProvider>
          <App />
        </AppReviewsProvider>
      </AppServicesProvider>
    </AppUserProvider>
  </React.StrictMode>,
)
