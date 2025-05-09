import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router'
import { store } from './api/store.ts'
import Registration from './pages/auth/registration.tsx'
import CategoryPage from './pages/category/index.tsx'
import Login from './pages/auth/login.tsx'

createRoot(document.getElementById('root')!).render(
<Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
)
