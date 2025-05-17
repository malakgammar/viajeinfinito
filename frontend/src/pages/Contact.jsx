import { motion } from 'framer-motion';
import { 
  InstagramIcon, 
  FacebookIcon, 
  TwitterIcon 
} from '../components/SocialIcons';

export default function Contact() {
  return (
    <div className="pt-20 min-h-screen bg-base">
      <div className="container mx-auto px-6 py-12">
        {/* Réseaux sociaux */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-4xl font-bold text-dark mb-6">Rejoignez notre communauté</h2>
          <div className="flex justify-center space-x-8">
            <a href="https://instagram.com/viajeinfinito" target="_blank" rel="noopener noreferrer">
              <InstagramIcon className="h-12 w-12 text-primary hover:text-dark transition-colors" />
            </a>
            <a href="https://facebook.com/viajeinfinito" target="_blank" rel="noopener noreferrer">
              <FacebookIcon className="h-12 w-12 text-primary hover:text-dark transition-colors" />
            </a>
            <a href="https://twitter.com/viajeinfinito" target="_blank" rel="noopener noreferrer">
              <TwitterIcon className="h-12 w-12 text-primary hover:text-dark transition-colors" />
            </a>
          </div>
        </motion.div>

        {/* Formulaire de contact */}
        <motion.section 
          className="max-w-2xl mx-auto bg-primary/10 p-8 rounded-2xl shadow-xl"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-dark">Contactez-nous</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-dark font-medium mb-2">Nom</label>
              <input 
                type="text" 
                placeholder="Votre nom"
                className="w-full p-3 rounded-lg border border-primary/30 focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-dark font-medium mb-2">Email</label>
              <input 
                type="email" 
                placeholder="Votre adresse email"
                className="w-full p-3 rounded-lg border border-primary/30 focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-dark font-medium mb-2">Sujet</label>
              <input 
                type="text" 
                placeholder="Sujet de votre message"
                className="w-full p-3 rounded-lg border border-primary/30 focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-dark font-medium mb-2">Message</label>
              <textarea 
                rows="5"
                placeholder="Votre message..."
                className="w-full p-3 rounded-lg border border-primary/30 focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary text-base py-3 rounded-lg font-semibold hover:bg-dark transition-colors"
            >
              Envoyer le message
            </button>
          </form>
        </motion.section>
      </div>
    </div>
  );
}
