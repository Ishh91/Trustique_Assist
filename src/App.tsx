import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import ServiceDetail from './pages/ServiceDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import BackgroundFX from './components/BackgroundFX';
import Careers from './pages/Careers';
import BlogAdmin from './pages/BlogAdmin';

function App() {
  return (
    <div className="min-h-screen">
      <BackgroundFX />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/blog-admin" element={<BlogAdmin />} />
        <Route path="/careers" element={<Careers />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
