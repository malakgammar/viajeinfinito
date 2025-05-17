import React from "react";

const agencesData = [
  {
    id: 1,
    name: "Voyage Évasion",
    image: "https://source.unsplash.com/400x300/?beach",
    description: "Découvrez nos destinations paradisiaques avec des prix attractifs !",
    price: 899,
  },
  {
    id: 2,
    name: "Aventure Nomade",
    image: "https://source.unsplash.com/400x300/?mountain",
    description: "Partez à l’aventure avec nos circuits 100% personnalisables.",
    price: 1290,
  },
];

export default function Agences() {

  const handleReservation = (agence) => {
    alert(`Vous avez réservé chez ${agence.name}`);
    // Naviguer ou envoyer les données au backend
  };

  return (
    <div className="pt-20 min-h-screen px-6 bg-gradient-to-br from-white to-primary/10">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-dark drop-shadow">
        Nos Agences Partenaires
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {agencesData.map((agence) => (
          <div
            key={agence.id}
            className="bg-white rounded-3xl shadow-lg p-6 flex flex-col justify-between"
          >
            <img
              src={agence.image}
              alt={agence.name}
              className="w-full h-56 object-cover rounded-xl mb-4 shadow-md"
            />
            <h2 className="text-2xl font-bold text-dark mb-2">{agence.name}</h2>
            <p className="text-gray-700 mb-4">{agence.description}</p>
            <p className="text-primary font-bold text-lg mb-4">À partir de {agence.price}€</p>
            <div className="flex gap-4">
              <button
                onClick={() => handleReservation(agence)}
                className="bg-primary hover:bg-dark text-white px-6 py-2 rounded-full font-semibold transition"
              >
                Réserver
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
