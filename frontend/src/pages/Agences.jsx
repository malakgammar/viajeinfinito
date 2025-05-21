import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Agences() {
  const [agences, setAgences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgences = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/agences");
        setAgences(response.data);
      } catch (err) {
        console.error("Erreur lors du chargement des agences:", err);
        setError("Impossible de charger les agences. Veuillez réessayer plus tard.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgences();
  }, []);

  // Filtrage par nom ou adresse (insensible à la casse)
  const filteredAgences = agences.filter(({ name, address }) =>
    (name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (address?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const handleVoirOffres = (agenceId) => {
    navigate(`/offres`);
  };

  if (isLoading) {
    return (
      <div className="pt-20 px-6 min-h-screen bg-[#FFFFFF] flex justify-center items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-[#73946B] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 px-6 min-h-screen bg-[#FFFFFF] flex justify-center items-center">
        <div className="text-red-500 font-medium text-center p-6 bg-red-50 rounded-xl max-w-md">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 px-6 min-h-screen bg-[#FFFFFF] pb-12">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-6 text-center text-[#73946B]"
        >
          Nos Agences Partenaires
        </motion.h1>

        {/* Barre de recherche */}
        <div className="mb-8 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Rechercher par nom ou adresse..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#73946B]"
          />
        </div>

        {filteredAgences.length === 0 ? (
          <p className="text-center text-gray-500">Aucune agence disponible pour le moment</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAgences.map((agence, index) => (
              <motion.div
                key={agence.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-[#FFFFFF] rounded-xl shadow-xl overflow-hidden border border-[#D2D0A0] hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Carte avec effet de superposition */}
                <div className="relative h-48 overflow-hidden">
                  {agence.logo_path ? (
                    <img 
                      src={`http://localhost:8000/storage/${agence.logo_path}`}
                      alt={`Logo ${agence.name}`}
                      className="w-full h-full object-contain p-4"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#D2D0A0] flex items-center justify-center">
                      <span className="text-4xl font-bold text-[#73946B]">
                        {agence.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00000080] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <button
                      onClick={() => handleVoirOffres(agence.id)}
                      className="w-full bg-[#73946B] text-white py-2 rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                    >
                      Voir les offres
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-[#73946B] mb-2">{agence.name}</h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-[#73946B] mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-gray-700">{agence.address}</p>
                    </div>
                    
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-[#73946B] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <p className="text-gray-700">{agence.phone}</p>
                    </div>
                  </div>

                  {/* Bouton visible sur mobile */}
                  <button
                    onClick={() => handleVoirOffres(agence.id)}
                    className="mt-6 md:hidden w-full bg-[#73946B] text-white px-4 py-2 rounded-lg hover:bg-[#5a7a52] transition-colors duration-200 font-medium"
                  >
                    Voir les offres
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
