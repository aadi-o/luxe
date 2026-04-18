/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import { AnimatePresence } from 'motion/react';
// Lazy load pages for better performance
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import AddProductPage from './pages/admin/AddProductPage';
import EditProductPage from './pages/admin/EditProductPage';
import ProtectedRoute from './components/ProtectedRoute';
import PageWrapper from './components/PageWrapper';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname} {...({} as any)}>
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/shop" element={<PageWrapper><ShopPage /></PageWrapper>} />
        <Route path="/product/:slug" element={<PageWrapper><ProductPage /></PageWrapper>} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/login" element={<PageWrapper><LoginPage /></PageWrapper>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<PageWrapper><DashboardPage /></PageWrapper>} />
          <Route path="/admin/add-product" element={<PageWrapper><AddProductPage /></PageWrapper>} />
          <Route path="/admin/edit-product/:id" element={<PageWrapper><EditProductPage /></PageWrapper>} />
        </Route>
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  );
}

