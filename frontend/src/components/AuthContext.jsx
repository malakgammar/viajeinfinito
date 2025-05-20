import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './components/AuthContext';
import RequireAuth from './components/RequireAuth';
import RequireRole from './components/RequireRole';
import LoadingSpinner from './components/LoadingSpinner';

// Chargement différé des composants pour une meilleure performance
const Home = lazy(() => import('./pages/Home'));
const Agences = lazy(() => import('./pages/Agences'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const Auth = lazy(() => import('./pages/Auth'));
const Profile = lazy(() => import('./pages/Profile'));
const Personnaliser = lazy(() => import('./pages/Personnaliser'));
const ConfirmationPage = lazy(() => import('./pages/ConfirmationPage'));
const PartnerDashboard = lazy(() => import('./pages/PartnerDashboard'));
const AdminPage = lazy(() => import('./pages/Admin'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          
          <main className="flex-grow">
            <Suspense fallback={<LoadingSpinner fullScreen />}>
              <Routes>
                {/* Routes publiques */}
                <Route path="/" element={<Home />} />
                <Route path="/agences" element={<Agences />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/auth" element={<Auth />} />

                {/* Routes protégées - Client */}
                <Route
                  path="/profile"
                  element={
                    <RequireAuth>
                      <RequireRole allowedRoles={['client']}>
                        <Profile />
                      </RequireRole>
                    </RequireAuth>
                  }
                />
                <Route
                  path="/personnaliser"
                  element={
                    <RequireAuth>
                      <RequireRole allowedRoles={['client']}>
                        <Personnaliser />
                      </RequireRole>
                    </RequireAuth>
                  }
                />
                <Route
                  path="/confirmation"
                  element={
                    <RequireAuth>
                      <RequireRole allowedRoles={['client']}>
                        <ConfirmationPage />
                      </RequireRole>
                    </RequireAuth>
                  }
                />

                {/* Routes protégées - Partenaire */}
                <Route
                  path="/partner/dashboard"
                  element={
                    <RequireAuth>
                      <RequireRole allowedRoles={['partner']}>
                        <PartnerDashboard />
                      </RequireRole>
                    </RequireAuth>
                  }
                />

                {/* Routes protégées - Admin */}
                <Route
                  path="/admin"
                  element={
                    <RequireAuth>
                      <RequireRole allowedRoles={['admin']}>
                        <AdminPage />
                      </RequireRole>
                    </RequireAuth>
                  }
                />

                {/* Route 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}