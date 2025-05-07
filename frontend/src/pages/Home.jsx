import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const agencesData = [
  {
    id: 1,
    name: "Agence Soleil",
    location: "Paris",
    description: "Découvrez nos offres exclusives à Paris.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
  {
    id: 2,
    name: "Globe Trotter",
    location: "Lyon",
    description: "Voyages sur mesure et aventures à Lyon.",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
  },
  {
    id: 3,
    name: "Aventure Plus",
    location: "Marseille",
    description: "Excursions et séjours pour les amateurs d'aventure.",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
  },
  {
    id: 4,
    name: "Découverte Monde",
    location: "Toulouse",
    description: "Explorez le monde avec nos meilleures offres.",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b",
  },
  {
    id: 5,
    name: "Voyages & Co",
    location: "Nice",
    description: "Voyages personnalisés et offres uniques à Nice.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
  },
  {
    id: 6,
    name: "Horizons Lointains",
    location: "Bordeaux",
    description: "Votre partenaire pour des destinations lointaines.",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
  },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Filtrer agences selon recherche
  const filteredAgences = agencesData.filter(({ name, location }) => {
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      location.toLowerCase().includes(locationTerm.toLowerCase())
    );
  });

  return (
    <div className="bg-base text-dark min-h-screen">
      {/* Hero Section */}
      <section className="relative grid grid-cols-1 md:grid-cols-2 items-center px-6 py-16 overflow-hidden h-screen">
        {/* Left Content */}
        <motion.div 
          className="relative z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-light leading-tight">
            Découvrez une <span className="font-bold text-primary">Agence</span><br />
            Où vous <span className="font-bold text-primary">Trouverez</span> vos voyages
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Explorez nos agences et leurs offres exclusives
          </p>
          <div className="flex gap-8 mt-8">
            {[
              { value: "6+", label: "Agences partenaires" },
              { value: "20+", label: "Années d'expérience" },
              { value: "10k+", label: "Clients satisfaits" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold text-primary">{item.value}</h2>
                <p className="text-sm text-gray-600">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div 
          className="relative z-0 h-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1527631746610-bca00a040d60')] bg-cover bg-center filter grayscale-[20%] hover:grayscale-0 transition-all duration-500" />
        </motion.div>
      </section>

      {/* Search Bar */}
      <motion.section 
        className="bg-white shadow-lg rounded-xl mx-6 -mt-10 p-6 z-10 relative"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div whileHover={{ scale: 1.02 }}>
            <input
              type="text"
              placeholder="Recherche agence"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }}>
            <input
              type="text"
              placeholder="Localisation"
              value={locationTerm}
              onChange={(e) => setLocationTerm(e.target.value)}
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all"
          >
            Rechercher
          </motion.button>
        </div>
      </motion.section>

      {/* Agences */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-primary mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Nos Agences
        </motion.h2>
        
        {filteredAgences.length === 0 ? (
          <motion.p 
            className="text-gray-600 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Aucune agence trouvée.
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredAgences.map(({ id, name, location, description, image }) => (
                <motion.div
                  key={id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="overflow-hidden h-48">
                    <motion.img
                      src={image}
                      alt={name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-1">{name}</h3>
                    <p className="text-sm text-gray-500 mb-3 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {location}
                    </p>
                    <p className="mb-4">{description}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-primary font-medium hover:underline flex items-center"
                    >
                      Découvrir les offres
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Pourquoi nous choisir */}
      <section className="px-6 py-16 bg-secondary bg-opacity-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-primary mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Pourquoi nous choisir ?
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden rounded-xl shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
                alt="Voyage"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
            
            <motion.ul 
              className="space-y-6 text-lg"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {[
                "Support 24/7",
                "Meilleurs prix garantis",
                "Réservation rapide",
                "Conseillers experts",
                "Assurance voyage incluse",
                "Flexibilité maximale"
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                >
                  <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* Explore by Type */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-primary mb-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Explorer par type
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Aventure", img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be" },
            { label: "Culture", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
            { label: "Plage", img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6" },
            { label: "Montagne", img: "https://images.unsplash.com/photo-1503596476-1c12f9fdbf9e" },
          ].map(({ label, img }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl text-center cursor-pointer transition-all duration-300"
            >
              <div className="mx-auto mb-4 h-20 w-20 rounded-full overflow-hidden border-2 border-primary">
                <img
                  src={img}
                  alt={label}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <p className="font-medium text-lg">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}