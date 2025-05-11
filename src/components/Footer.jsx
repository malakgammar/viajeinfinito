import { motion } from 'framer-motion';
import { GlobeAltIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <footer className="bg-primary text-base py-16 mt-20">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-base to-secondary bg-clip-text text-transparent">
            ViajeInfinito
          </h3>
          <p className="text-sm text-dark opacity-90 leading-relaxed">
            Votre passerelle vers des voyages extraordinaires. Nous sélectionnons avec soin les meilleures agences pour vos rêves d'évasion.
          </p>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-base">Navigation</h4>
          <ul className="space-y-2">
            <li>
              <a href="/agencies" className="text-dark hover:text-secondary transition-colors">
                Agences
              </a>
            </li>
            <li>
              <a href="/contact" className="text-dark hover:text-secondary transition-colors">
                Contact
              </a>
            </li>
            <li>
              <a href="/profile" className="text-dark hover:text-secondary transition-colors">
                Profil
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-base">Contact</h4>
          <div className="space-y-3">
            <div className="flex items-start">
              <EnvelopeIcon className="h-5 w-5 mt-1 mr-2 text-dark" />
              <div>
                <p className="font-medium text-dark">Email</p>
                <p className="text-sm text-dark opacity-90">contact@viajeinfinito.com</p>
              </div>
            </div>
            <div className="flex items-start">
              <PhoneIcon className="h-5 w-5 mt-1 mr-2 text-dark" />
              <div>
                <p className="font-medium text-dark">Téléphone</p>
                <p className="text-sm text-dark opacity-90">+33 1 23 45 67 89</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-base">Réseaux sociaux</h4>
          <div className="flex space-x-6">
            {['Instagram', 'Twitter', 'Facebook'].map((network) => (
              <motion.div 
                key={network}
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-full bg-base/20 hover:bg-base/30 cursor-pointer"
              >
                <GlobeAltIcon className="h-6 w-6 text-dark" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="border-t border-base/20 mt-12 pt-8 text-center text-sm text-dark opacity-80">
        © 2023 ViajeInfinito. Tous droits réservés.
      </div>
    </footer>
  );
}