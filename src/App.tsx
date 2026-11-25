import React, { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { Layout } from './components/Layout'
import { DesktopDeviceFrame } from './components/DesktopDeviceFrame'
import { SplashScreen } from './components/SplashScreen'
import { OnboardingScreen } from './components/OnboardingScreen'
import { ScrollToTop } from './components/ScrollToTop'
import { HomePage } from './pages/HomePage'
import { ShopPage } from './pages/ShopPage'
import { OrdersPage } from './pages/OrdersPage'
import { SubscribePage } from './pages/SubscribePage'
import { CartPage } from './pages/CartPage'
import { ProfilePage } from './pages/ProfilePage'
import { EducationPage } from './pages/EducationPage'
import { FaqContactPage } from './pages/FaqContactPage'

export const App: React.FC = () => {
  const [stage, setStage] = useState<'splash' | 'onboarding' | 'app'>('splash')

  const handleSplashComplete = useCallback(() => {
    if (window.location.pathname !== '/' || window.location.search !== '') {
      window.history.replaceState(null, '', '/')
    }
    setStage('onboarding')
  }, [])

  const handleOnboardingComplete = useCallback(() => {
    if (window.location.pathname !== '/' || window.location.search !== '') {
      window.history.replaceState(null, '', '/')
    }
    setStage('app')
  }, [])

  return (
    <DesktopDeviceFrame>
      {stage === 'splash' ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : stage === 'onboarding' ? (
        <OnboardingScreen onGetStarted={handleOnboardingComplete} />
      ) : (
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="shop" element={<ShopPage />} />
                  <Route path="orders" element={<OrdersPage />} />
                  <Route path="bundles" element={<Navigate to="/orders" replace />} />
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
      )}
    </DesktopDeviceFrame>
  )
}

export default App
