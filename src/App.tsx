import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import ServiceDetail from './pages/ServiceDetail';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';

import BlobCursor from './components/BlobCursor';
import Careers from './pages/Careers';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { useState, useEffect } from 'react';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import RefundPolicy from './pages/RefundPolicy';
import StartupPackage from './pages/StartupPackage';

// Mobile detection hook
const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// Loading component for better UX
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0056D2]"></div>
  </div>
);

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h2>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#0056D2] text-white px-6 py-3 rounded-lg hover:bg-[#0046B2] transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Lazy loading wrapper for better performance
const LazyRoute = ({ component: Component, ...props }: any) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for demonstration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <Component {...props} />;
};

function App() {
  const isMobile = useMobile();

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">


        {/* Blob Cursor Effect - Full Width Site-Wide */}
        <BlobCursor
          blobType="circle"
          fillColor="#00C8D7"
          trailCount={3}
          sizes={[60, 125, 75]}
          innerSizes={[20, 35, 25]}
          innerColor="rgba(67, 232, 255, 0.8)"
          opacities={[0.6, 0.6, 0.6]}
          shadowColor="rgba(0,0,0,0.75)"
          shadowBlur={5}
          shadowOffsetX={10}
          shadowOffsetY={10}
          filterStdDeviation={30}
          useFilter={true}
          fastDuration={0.1}
          slowDuration={0.5}
          zIndex={1}
        />
        
        {/* Navbar with mobile menu */}
        <div className="relative z-20">
          <Navbar />
        </div>

        {/* Main content with proper spacing */}
        <main className="flex-1 relative z-10 pt-16 md:pt-20">
            <Routes>
              <Route 
                path="/" 
                element={<LazyRoute component={Home} />} 
              />
              <Route 
                path="/services" 
                element={<LazyRoute component={ServicesPage} />} 
              />
              <Route 
                path="/services/:slug" 
                element={<LazyRoute component={ServiceDetail} />} 
              />
              <Route 
                path="/portfolio" 
                element={<LazyRoute component={Portfolio} />} 
              />
              <Route 
                path="/about" 
                element={<LazyRoute component={About} />} 
              />
              <Route 
                path="/contact" 
                element={<LazyRoute component={Contact} />} 
              />
              <Route 
                path="/blog" 
                element={<LazyRoute component={Blog} />} 
              />
              <Route 
                path="/blog/:slug" 
                element={<LazyRoute component={BlogDetail} />} 
              />
              <Route 
                path="/admin/login" 
                element={<LazyRoute component={AdminLogin} />} 
              />
              <Route 
                path="/admin" 
                element={<LazyRoute component={AdminDashboard} />} 
              />
              <Route 
                path="/careers" 
                element={<LazyRoute component={Careers} />} 
              />
              <Route
                path="/privacy-policy"
                element={<LazyRoute component={PrivacyPolicy} />}
              />
              <Route
                path="/terms-and-conditions"
                element={<LazyRoute component={TermsAndConditions} />}
              />
              <Route
                path="/refund-policy"
                element={<LazyRoute component={RefundPolicy} />}
              />
              <Route 
                path="/startup-package" 
                element={<LazyRoute component={StartupPackage} />} 
              />
              
              {/* 404 Page */}
              <Route 
                path="*" 
                element={
                  <div className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                      <p className="text-xl text-gray-600 mb-8">Page not found</p>
                      <a 
                        href="/" 
                        className="bg-[#0056D2] text-white px-6 py-3 rounded-lg hover:bg-[#0046B2] transition-colors"
                      >
                        Go Home
                      </a>
                    </div>
                  </div>
                } 
              />
            </Routes>
        </main>

        {/* Footer */}
        <div className="relative z-20">
          <Footer />
        </div>

        {/* Mobile-specific optimizations */}
        {isMobile && (
          <>
            {/* Safe area insets for mobile devices */}
            <style>{`
              .pb-safe {
                padding-bottom: env(safe-area-inset-bottom);
              }
            `}</style>
            <div className="pb-safe"></div>
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;