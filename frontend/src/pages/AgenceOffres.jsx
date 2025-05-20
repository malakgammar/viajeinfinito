import React from "react";
import { useLocation,useNavigate } from "react-router-dom";

export default function AgenceOffres() {
  const location = useLocation();
  const agence = location.state;
const navigate = useNavigate();

const handleReservation = (agence) => {
  navigate("/confirmation", { state: { offer: agence } });
};
  if (!agence) return <div className="pt-20 text-center">Aucune donnée disponible.</div>;

  return (
    <div className="pt-20 px-6 min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-8 text-center text-dark">{agence.name} - Offres</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {agence.offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-gray-100 rounded-2xl p-6 shadow hover:shadow-xl transition"
          >
            <img src={offer.image} alt={offer.title} className="rounded-xl h-48 w-full object-cover mb-4" />
            <h2 className="text-xl font-semibold text-dark mb-2">{offer.title}</h2>
            <p className="text-gray-700 mb-3">{offer.description}</p>
            <p className="text-primary font-bold text-lg mb-4">{offer.price}€</p>
            <button
              className="bg-primary text-white px-5 py-2 rounded-full hover:bg-dark"
onClick={() => handleReservation(agence)}            >
              Réserver cette offre
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
