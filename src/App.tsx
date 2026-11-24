import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { Layout } from './components/Layout'
import { DesktopDeviceFrame } from './components/DesktopDeviceFrame'
import { ShopPage } from './pages/ShopPage'
import { BundlesPage } from './pages/BundlesPage'
import { SubscribePage } from './pages/SubscribePage'
import { CartPage } from './pages/CartPage'
import { AboutPage } from './pages/AboutPage'
import { EducationPage } from './pages/EducationPage'
import { FaqContactPage } from './pages/FaqContactPage'

export const App: React.FC = () => {
  return (
    <DesktopDeviceFrame>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<ShopPage />} />
              <Route path="shop" element={<ShopPage />} />
              <Route path="bundles" element={<BundlesPage />} />
              <Route path="subscribe" element={<SubscribePage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="education" element={<EducationPage />} />
              <Route path="faq" element={<FaqContactPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </DesktopDeviceFrame>
  )
}

export default App
