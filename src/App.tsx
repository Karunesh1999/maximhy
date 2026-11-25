import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { Layout } from './components/Layout'
import { DesktopDeviceFrame } from './components/DesktopDeviceFrame'
import { ScrollToTop } from './components/ScrollToTop'
import { HomePage } from './pages/HomePage'
import { ShopPage } from './pages/ShopPage'
import { BundlesPage } from './pages/BundlesPage'
import { SubscribePage } from './pages/SubscribePage'
import { CartPage } from './pages/CartPage'
import { ProfilePage } from './pages/ProfilePage'
import { EducationPage } from './pages/EducationPage'
import { FaqContactPage } from './pages/FaqContactPage'

export const App: React.FC = () => {
  return (
    <DesktopDeviceFrame>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="shop" element={<ShopPage />} />
                <Route path="bundles" element={<BundlesPage />} />
                <Route path="subscribe" element={<SubscribePage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="about" element={<Navigate to="/#about" replace />} />
                <Route path="education" element={<EducationPage />} />
                <Route path="faq" element={<FaqContactPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </DesktopDeviceFrame>
  )
}

export default App
