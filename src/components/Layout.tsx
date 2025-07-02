
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Building, User, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ChatWidget from './ChatWidget';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <Building className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Sarang Rumah
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Properti
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Tentang Kami
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Kontak
              </Link>
              <Link to="/admin">
                <Button variant="outline" size="sm" className="hover:bg-blue-50 border-blue-200">
                  <User className="h-4 w-4 mr-2" />
                  Login Admin
                </Button>
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-blue-100">
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Properti
                </Link>
                <Link 
                  to="/about" 
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tentang Kami
                </Link>
                <Link 
                  to="/contact" 
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Kontak
                </Link>
                <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-fit">
                    <User className="h-4 w-4 mr-2" />
                    Login Admin
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Chat Widget */}
      <ChatWidget />

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-400 to-purple-400 p-2 rounded-xl">
                  <Building className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">Sarang Rumah</span>
              </div>
              <p className="text-gray-300">
                Mitra terpercaya Anda dalam menemukan properti impian. 
                Menghubungkan pembeli dengan rumah impian mereka sejak 2024.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Tautan Cepat</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/" className="hover:text-white transition-colors">Properti</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">Tentang Kami</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Kontak</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Jenis Properti</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Apartemen</li>
                <li>Rumah</li>
                <li>Kondominium</li>
                <li>Townhouse</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Info Kontak</h3>
              <div className="space-y-2 text-gray-300">
                <p>Jl. Properti Indah No. 123</p>
                <p>Jakarta Selatan, DKI Jakarta 12345</p>
                <p>Telepon: (021) 123-4567</p>
                <p>Email: info@sarangrumah.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Sarang Rumah. Semua hak dilindungi undang-undang.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
