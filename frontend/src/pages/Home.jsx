import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Exemple de données d'offres (remplacer par données API Laravel plus tard)
const offresData = [
  {
    id: 1,
    destination: "Paris",
    budget: 1500.00,
    description: "Découvrez nos offres exclusives à Paris.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
  {
    id: 2,
    destination: "Lyon",
    budget: 1200.00,
    description: "Voyages sur mesure et aventures à Lyon.",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
  },
  {
    id: 3,
    destination: "Marseille",
    budget: 1000.00,
    description: "Excursions et séjours pour les amateurs d'aventure.",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
  },
  {
    id: 4,
    destination: "Toulouse",
    budget: 900.00,
    description: "Explorez le monde avec nos meilleures offres.",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b",
  },
];

export default function Offres() {
  const [destinationFilter, setDestinationFilter] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [maxBudgetFilter, setMaxBudgetFilter] = useState("");

  const filteredOffres = offresData.filter((offre) => {
    const matchDestination = offre.destination.toLowerCase().includes(destinationFilter.toLowerCase());
    const matchDescription = offre.description.toLowerCase().includes(descriptionFilter.toLowerCase());
    const matchBudget = !maxBudgetFilter || offre.budget <= parseFloat(maxBudgetFilter);
    return matchDestination && matchDescription && matchBudget;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-primary mb-8">Offres Disponibles</h1>

      {/* Filtres */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <input
          type="text"
          placeholder="Filtrer par destination"
          value={destinationFilter}
          onChange={(e) => setDestinationFilter(e.target.value)}
          className="p-3 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Budget maximum (€)"
          value={maxBudgetFilter}
          onChange={(e) => setMaxBudgetFilter(e.target.value)}
          className="p-3 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Filtrer par description"
          value={descriptionFilter}
          onChange={(e) => setDescriptionFilter(e.target.value)}
          className="p-3 border rounded-lg"
        />
      </div>

      {/* Liste des offres */}
      {filteredOffres.length === 0 ? (
        <p className="text-center text-gray-500">Aucune offre ne correspond à vos critères.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredOffres.map((offre) => (
              <motion.div
                key={offre.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img src={offre.image} alt={offre.destination} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-bold">{offre.destination}</h2>
                  <p className="text-gray-500 mt-2">{offre.description}</p>
                  <p className="mt-4 text-primary font-semibold">Budget : {offre.budget} €</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
