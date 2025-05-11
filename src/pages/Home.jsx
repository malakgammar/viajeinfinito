import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="pt-20 min-h-screen bg-base">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-base to-primary/10">
        <motion.div 
          className="absolute inset-0 z-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1527631746610-bca00a040d60')] bg-cover bg-center filter grayscale-[20%] opacity-20" />
        </motion.div>

        <motion.div 
          className="relative z-10 text-center space-y-8 px-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-dark">
            Explorez le monde
            <span className="block bg-gradient-to-r from-primary to-dark bg-clip-text text-transparent mt-4">
              avec élégance
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-dark/80 max-w-2xl mx-auto">
            Découvrez des expériences de voyage sur mesure avec nos agences partenaires triées sur le volet
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-primary text-base px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-primary/30 transition-all"
          >
            Commencer l'aventure
          </motion.button>
        </motion.div>
      </section>

      {/* Agences en vedette */}
      <section className="py-20 px-6 bg-base">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-dark relative pb-4">
            Nos partenaires d'exception
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary rounded-full" />
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div 
                key={item}
                className="group relative bg-base rounded-xl shadow-xl hover:shadow-2xl transition-shadow overflow-hidden"
                whileHover="hover"
                variants={{
                  hover: { y: -10 }
                }}
              >
                <div className="p-6">
                  <div className="h-64 overflow-hidden rounded-lg">
                    <img 
                      src={`https://source.unsplash.com/random/800x600?v=${item}`} 
                      alt="Agence"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform" 
                    />
                  </div>
                  <div className="pt-6">
                    <h3 className="text-2xl font-bold text-dark mb-2">Agence {item}</h3>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-primary">⭐ 4.9</span>
                      <span className="text-dark/50">•</span>
                      <span className="text-dark/80">🌍 15 destinations</span>
                    </div>
                    <p className="text-dark/70 mb-4">Description exceptionnelle de l'agence avec un texte placeholder sur plusieurs lignes...</p>
                    <button className="w-full bg-dark text-base py-2 rounded-lg hover:bg-primary transition-colors">
                      Voir les offres
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}