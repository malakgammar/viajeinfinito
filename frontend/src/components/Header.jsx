import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api';

const navItems = [
  { label: 'Home', links: [
      { name: 'À propos', path: '/about' },
      { name: 'Blog Communautaire', path: '/blog' },
      { name: 'Contactez-nous', path: '/contact' }
    ]
  },
  { label: 'Tours', links: [
      { name: 'Adventure', path: '/tours/adventure' },
      { name: 'Culture', path: '/tours/culture' },
    ]
  },
  { label: 'Destinations', links: [
      { name: 'Europe', path: '/destinations/europe' },
      { name: 'Asia', path: '/destinations/asia' },
      { name: 'Africa', path: '/destinations/africa' }
    ]
  },

  { label: 'Hotel', links: [
      { name: '5-Star', path: '/hotel/5star' },
      { name: 'Budget', path: '/hotel/budget' },
    ]
  }
];

export default function Header() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Vérifie si l'utilisateur est connecté
    const fetchUser = async () => {
      try {
        const res = await api.get('/user/profile');
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/auth');
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-base shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo animé */}
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 50 }}
        >
          <Link to="/" className="text-3xl font-extrabold bg-gradient-to-r from-primary to-dark bg-clip-text text-transparent">
            ViajeInfinito
          </Link>
        </motion.div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm text-primary font-medium relative">
          {navItems.map((item, index) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenIndex(index)}
              onMouseLeave={() => setOpenIndex(null)}
            >
              <div className="cursor-pointer hover:text-secondary transition flex items-center">
                {item.label}<span className="ml-1">▼</span>
              </div>
              {openIndex === index && (
                <div className="absolute top-full left-0 w-44 bg-white border rounded shadow-lg py-2 z-50">
                  {item.links.map(link => (
                    <Link key={link.name} to={link.path} className="block px-4 py-2 text-sm text-dark hover:text-secondary hover:bg-gray-50 transition">
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Bouton connexion / déconnexion */}
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white font-semibold px-5 py-2 rounded-full hover:bg-red-600 transition"
          >
            Déconnexion
          </button>
        ) : (
          <Link
            to="/auth"
            className="bg-primary text-white font-semibold px-5 py-2 rounded-full hover:brightness-110 transition"
          >
            Se connecter
          </Link>
        )}
      </div>
    </header>
  );
}
