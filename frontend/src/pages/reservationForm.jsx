import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // bien écrire { jwtDecode }
import axios from "axios";

export default function ReservationForm() {
  const { state } = useLocation();
  const offer = state?.offer;
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);

  // Récupération de l'ID utilisateur depuis le token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token.split('.').length === 3) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id || decoded.sub); // selon la structure de ton token
      } catch (error) {
        console.error("Erreur lors du décodage du token :", error.message);
      }
    } else {
      console.warn("Token JWT invalide ou manquant.");
    }
  }, []);

  const [form, setForm] = useState({
    nbPersonne: 1,
    date: "",
    duration: 1,
    cardNumber: "",
    cardName: "",
    cvv: "",
    expiry: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const total = offer.price * form.nbPersonne;

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!userId) {
    console.warn("User ID non disponible pour la réservation.");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://localhost:8000/api/v1/reservations",
      {
        id_user: userId,
        id_offre: offer.id,
        nbPersonne: form.nbPersonne,
        total,
        date: form.date,
        duration: form.duration,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    navigate("/confirmation", {
      state: { reservation: response.data, payment: form, offer },
    });
  } catch (err) {
    if (err.response) {
      console.error("Erreur lors de la réservation :", err.response.data);
    } else {
      console.error("Erreur lors de la réservation :", err.message);
    }
  }
};

  return (
    <div className="pt-20 px-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Réserver l’offre</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <input type="number" name="nbPersonne" min={1} value={form.nbPersonne} onChange={handleChange} className="input" placeholder="Nombre de personnes" />
        <input type="date" name="date" value={form.date} onChange={handleChange} className="input" />
        <input type="number" name="duration" min={1} value={form.duration} onChange={handleChange} className="input" placeholder="Durée (jours)" />

        <hr className="my-4" />

        <h2 className="text-xl font-semibold">Paiement</h2>
        <input name="cardName" value={form.cardName} onChange={handleChange} className="input" placeholder="Nom sur la carte" />
        <input name="cardNumber" value={form.cardNumber} onChange={handleChange} className="input" placeholder="Numéro de carte" />
        <div className="flex gap-4">
          <input name="expiry" value={form.expiry} onChange={handleChange} className="input" placeholder="MM/AA" />
          <input name="cvv" value={form.cvv} onChange={handleChange} className="input" placeholder="CVV" />
        </div>

        <p className="text-lg font-bold mt-4">Total : {total}€</p>

<button
  type="submit"
  disabled={!userId}
  className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
>
  Confirmer la réservation
</button>
      </form>
    </div>
  );
}
