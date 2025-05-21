import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [agences, setAgences] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgences = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/agences");
        // Ajout d'une image par défaut si logo_path n'est pas fourni
        const agencesWithDefaults = response.data.map(agence => ({
          ...agence,
          logo_path: agence.logo_path || "https://cdn-icons-png.flaticon.com/512/196/196566.png",
          // Ajout d'une image de couverture aléatoire pour chaque agence
          cover_image: getRandomCoverImage()
        }));
        setAgences(agencesWithDefaults);
      } catch (error) {
        console.error("Erreur lors de la récupération des agences :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgences();
  }, []);

  // Fonction pour obtenir une image de couverture aléatoire
  const getRandomCoverImage = () => {
    const coverImages = [
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ];
    return coverImages[Math.floor(Math.random() * coverImages.length)];
  };

  const filteredAgences = agences.filter(({ name, address }) =>
    (name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) &&
    (address?.toLowerCase() || "").includes(locationTerm.toLowerCase())
  );

  return (
    <div className="bg-base text-dark min-h-screen">
      {/* Hero Section */}
      <section className="relative grid grid-cols-1 md:grid-cols-2 items-center px-6 py-16 overflow-hidden h-screen">
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
            Explorez nos agences partenaires et leurs offres exclusives
          </p>
        </motion.div>

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
          <input
            type="text"
            placeholder="Recherche agence"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-3 rounded-lg w-full"
          />
          <input
            type="text"
            placeholder="Localisation"
            value={locationTerm}
            onChange={(e) => setLocationTerm(e.target.value)}
            className="border p-3 rounded-lg w-full"
          />
          <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90">
            Rechercher
          </button>
        </div>
      </motion.section>

{/* Agencies Section */}
<section className="px-6 py-16 max-w-7xl mx-auto">
  <motion.h2
    className="text-3xl font-bold text-primary mb-8 text-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1 }}
  >
    Nos Agences Partenaires
  </motion.h2>

  {loading ? (
    <div className="flex justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  ) : filteredAgences.length === 0 ? (
    <p className="text-center text-gray-500">Aucune agence ne correspond à votre recherche.</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence>
        {filteredAgences.map(({ id, name, address, phone, logo_path, cover_image }) => (
          <motion.div
            key={id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col justify-between hover:shadow-xl transition-shadow relative"
          >
            {/* Badge optionnel */}
            <span className="absolute top-2 right-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
              Populaire
            </span>

            {/* Cover Image */}
            <div
              className="h-48 overflow-hidden cursor-pointer"
              onClick={() => navigate(`/agences/${id}`)}
            >
              <img
                src={cover_image}
                alt={`Image de couverture de l'agence ${name}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Agency Info */}
            <div className="p-6">
              <div className="flex items-start mb-4">
                <div>
                  <h3 className="font-bold text-xl text-gray-800">{name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {address || "Adresse non renseignée"}
                  </p>
                  {phone && (
                    <p className="text-sm text-gray-500 mt-1">
                      <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="p-4 pt-0">
              <button
                onClick={() => navigate("/offres")}
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Voir les offres
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )}
</section>

            <section className="px-6 py-12 bg-secondary bg-opacity-10">
        <h2 className="text-2xl font-bold text-primary mb-6">Why Choose Us?</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <img src="https://images.unsplash.com/photo-1568605114967-8130f3a36994" alt="House" className="rounded-xl" />
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 bg-primary rounded-full"></span>
              24/7 Support
            </li>
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 bg-primary rounded-full"></span>
              Best Price
            </li>
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 bg-primary rounded-full"></span>
              Fast Booking
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}



