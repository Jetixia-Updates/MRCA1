import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Car, Menu, Sun, Moon, Globe, X, Crown } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { toast } from "sonner";

export function Header() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'ar' | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
      document.documentElement.lang = savedLanguage;
      document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
    }
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark') => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
    toast.success(`${newTheme === 'dark' ? 'Dark' : 'Light'} mode activated`);
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    toast.success(newLang === 'en' ? 'Language changed to English' : 'تم التغيير إلى العربية');
  };

  const handleNavigation = (section: string) => {
    setMobileMenuOpen(false);

    if (section === 'rent') {
      navigate('/');
    } else if (section === 'vehicles') {
      navigate('/vehicles');
    } else {
      // Scroll to section or show coming soon
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        toast.info(`${section.charAt(0).toUpperCase() + section.slice(1)} section coming soon!`);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-700/50 transition-colors">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <div className="bg-gradient-to-br from-[#EF4444] to-[#1E40AF] p-2 rounded-lg">
              <Car className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="block font-bold text-lg leading-tight dark:text-white">MAXIMUM</span>
              <span className="block text-xs text-slate-600 dark:text-slate-400">
                {language === 'en' ? 'Rent a Car' : 'تأجير السيارات'}
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleNavigation('rent')}
              className="text-slate-700 dark:text-slate-200 hover:text-[#1E40AF] transition-colors"
            >
              {language === 'en' ? 'Rent' : 'استئجار'}
            </button>
            <button
              onClick={() => handleNavigation('vehicles')}
              className="text-slate-700 dark:text-slate-200 hover:text-[#1E40AF] transition-colors"
            >
              {language === 'en' ? 'Vehicles' : 'المركبات'}
            </button>
            <button
              onClick={() => handleNavigation('leasing')}
              className="text-slate-700 dark:text-slate-200 hover:text-[#1E40AF] transition-colors"
            >
              {language === 'en' ? 'Leasing' : 'التأجير'}
            </button>
            <button
              onClick={() => handleNavigation('corporate')}
              className="text-slate-700 dark:text-slate-200 hover:text-[#1E40AF] transition-colors"
            >
              {language === 'en' ? 'Corporate' : 'الشركات'}
            </button>
            <button
              onClick={() => handleNavigation('offers')}
              className="text-slate-700 dark:text-slate-200 hover:text-[#1E40AF] transition-colors"
            >
              {language === 'en' ? 'Offers' : 'العروض'}
            </button>
            <button
              onClick={() => handleNavigation('about')}
              className="text-slate-700 dark:text-slate-200 hover:text-[#1E40AF] transition-colors"
            >
              {language === 'en' ? 'About' : 'من نحن'}
            </button>
          </nav>

          {/* Profile & Actions Section */}
          <div className="flex items-center gap-2">
            {/* M-Gold Badge */}
            <div className="hidden lg:flex items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-[#EF4444]/10 to-[#1E40AF]/10 border-[#EF4444]/20 flex items-center gap-1"
              >
                <Crown className="w-3 h-3 text-[#EF4444]" />
                <div className="text-right">
                  <div className="text-xs font-medium">{language === 'en' ? 'M-Gold Member' : 'عضو ذهبي'}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">2,450 {language === 'en' ? 'points' : 'نقطة'}</div>
                </div>
              </Badge>
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </Button>

            {/* Language Switcher */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              title={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
              className="relative"
            >
              <Globe className="w-5 h-5" />
              <span className="absolute -bottom-0.5 -right-0.5 text-[9px] font-bold bg-[#1E40AF] text-white rounded-sm px-1 leading-tight">
                {language === 'en' ? 'EN' : 'AR'}
              </span>
            </Button>

            {/* Admin Button */}
            <Button variant="outline" size="sm" asChild className="hidden md:inline-flex">
              <Link to="/admin">
                {language === 'en' ? 'Admin' : 'الإدارة'}
              </Link>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2 border-t border-slate-200 dark:border-slate-700 pt-4">
            <button
              onClick={() => handleNavigation('rent')}
              className="block w-full text-left py-2 hover:text-[#1E40AF] transition-colors dark:text-white"
            >
              {language === 'en' ? 'Rent' : 'استئجار'}
            </button>
            <button
              onClick={() => handleNavigation('vehicles')}
              className="block w-full text-left py-2 hover:text-[#1E40AF] transition-colors dark:text-white"
            >
              {language === 'en' ? 'Vehicles' : 'المركبات'}
            </button>
            <button
              onClick={() => handleNavigation('leasing')}
              className="block w-full text-left py-2 hover:text-[#1E40AF] transition-colors dark:text-white"
            >
              {language === 'en' ? 'Leasing' : 'التأجير'}
            </button>
            <button
              onClick={() => handleNavigation('corporate')}
              className="block w-full text-left py-2 hover:text-[#1E40AF] transition-colors dark:text-white"
            >
              {language === 'en' ? 'Corporate' : 'الشركات'}
            </button>
            <button
              onClick={() => handleNavigation('offers')}
              className="block w-full text-left py-2 hover:text-[#1E40AF] transition-colors dark:text-white"
            >
              {language === 'en' ? 'Offers' : 'العروض'}
            </button>
            <button
              onClick={() => handleNavigation('about')}
              className="block w-full text-left py-2 hover:text-[#1E40AF] transition-colors dark:text-white"
            >
              {language === 'en' ? 'About' : 'من نحن'}
            </button>
            <div className="pt-2">
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-[#EF4444]/10 to-[#1E40AF]/10 border-[#EF4444]/20 flex items-center gap-1 mb-2"
              >
                <Crown className="w-3 h-3 text-[#EF4444]" />
                {language === 'en' ? 'M-Gold: 2,450 points' : 'ذهبي: ٢٤٥٠ نقطة'}
              </Badge>
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                  {language === 'en' ? 'Admin' : 'الإدارة'}
                </Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
