import { useState } from "react";
import { personalInfo } from "@/data/portfolio-data";
import { Menu, X, Settings } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface NavigationProps {
  activeSection: string;
}

export default function Navigation({ activeSection }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'professional', label: 'Professional', isLink: false, href: '' },
    { id: 'photography', label: 'Photography', isLink: false, href: '' },
    { id: 'contact', label: 'Contact', isLink: false, href: '' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-xl font-semibold text-primary hover:text-secondary transition-colors duration-200"
            >
              {personalInfo.name}
            </button>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.isLink ? (
                <Link key={item.id} href={item.href}>
                  <button className="text-gray-700 hover:text-secondary transition-colors duration-200">
                    {item.label}
                  </button>
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-gray-700 hover:text-secondary transition-colors duration-200 ${
                    activeSection === item.id ? 'text-secondary font-medium' : ''
                  }`}
                >
                  {item.label}
                </button>
              )
            ))}
            
            {!isLoading && isAuthenticated && (
              <div className="flex items-center space-x-4">
                <Link href="/portfolio-manager">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Admin
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.href = "/api/logout"}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-secondary"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              item.isLink ? (
                <Link key={item.id} href={item.href}>
                  <button className="block w-full text-left py-2 text-gray-700 hover:text-secondary transition-colors duration-200">
                    {item.label}
                  </button>
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left py-2 text-gray-700 hover:text-secondary transition-colors duration-200 ${
                    activeSection === item.id ? 'text-secondary font-medium' : ''
                  }`}
                >
                  {item.label}
                </button>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
