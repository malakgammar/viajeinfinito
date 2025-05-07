import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AgenceOffres() {
  const { id } = useParams();
  const [offres, setOffres] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/v1/agences/${id}/offres`)
      .then(response => {
        setOffres(response.data);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des offres:", error);
      });
  }, [id]);

  return (
    <div className="pt-20 px-6 min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-8 text-center text-green-700">Offres de l'agence</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offres.map(offre => (
          <div key={offre.id} className="bg-gray-50 rounded-xl shadow p-4">
            <h2 className="text-lg font-bold">{offre.titre}</h2>
            <p className="text-sm text-gray-600">{offre.description}</p>
            <p className="text-sm mt-2 text-green-700 font-semibold">{offre.prix} €</p>
          </div>
        ))}
      </div>
    </div>
  );
}
