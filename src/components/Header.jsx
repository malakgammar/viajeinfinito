import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <header className="fixed w-full z-50 bg-base shadow-xl border-b border-primary/20">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 50 }}
        >
          <Link 
            to="/" 
            className="text-3xl font-extrabold bg-gradient-to-r from-primary to-dark bg-clip-text text-transparent"
          >
            ViajeInfinito
          </Link>
        </motion.div>
        
        <div className="flex space-x-8 items-center">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link 
              to="/agencies" 
              className="text-dark hover:text-primary font-medium transition-colors duration-300"
            >
              Agences
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link 
              to="/contact" 
              className="text-dark hover:text-primary font-medium transition-colors duration-300"
            >
              Contact
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link 
              to="/profile" 
              className="flex items-center p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              <UserIcon className="h-6 w-6 text-dark hover:text-primary" />
            </Link>
          </motion.div>
        </div>
      </nav>
    </header>
  );
}