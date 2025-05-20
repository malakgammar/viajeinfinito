import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { motion } from "framer-motion";

export default function ReservationForm() {
  const { state } = useLocation();
  const offer = state?.offer;
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);
  const [tokenValid, setTokenValid] = useState(false);
  const [priceAnimation, setPriceAnimation] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const userIdFromToken = decoded.userId || decoded.id || decoded.sub;
      if (!userIdFromToken) throw new Error("ID utilisateur non trouvé");
      if (decoded.exp && Date.now() >= decoded.exp * 1000) throw new Error("Token expiré");

      setUserId(userIdFromToken);
      setTokenValid(true);
    } catch (error) {
      console.error("Erreur de token:", error.message);
      localStorage.removeItem("token");
    }
  }, []);

  const [form, setForm] = useState({
    nbPersonne: 1,
    date: "",
    duration: offer?.duration || 1,
    cardNumber: "",
    cardName: "",
    cvv: "",
    expiry: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => {
      const newForm = { ...prev, [name]: value };
      
      // Déclencher l'animation quand le nombre de personnes change
      if (name === "nbPersonne") {
        setPriceAnimation(true);
        setTimeout(() => setPriceAnimation(false), 1000);
      }
      
      return newForm;
    });
  };

  const calculateTotal = () => {
    if (!offer) return 0;
    return offer.price * form.nbPersonne * form.duration;
  };

  const [total, setTotal] = useState(calculateTotal());

  useEffect(() => {
    setTotal(calculateTotal());
  }, [form.nbPersonne, form.duration, offer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !tokenValid) {
      navigate("/login");
      return;
    }

    try {
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
        { 
          headers: { 
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          } 
        }
      );

      navigate("/confirmation", { state: { reservation: response.data, offer } });
    } catch (err) {
      console.error("Erreur:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        setTokenValid(false);
      }
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 bg-[#F8F8F8]">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-[#73946B] p-6 text-white">
            <h1 className="text-2xl font-bold">Réserver l'offre</h1>
            {offer && (
              <p className="mt-2 text-[#D2D0A0]">
                {offer.destination} - {offer.price}€/personne/jour
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#73946B]">Détails de la réservation</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de personnes × durée (jours)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="number"
                      name="nbPersonne"
                      min={1}
                      max={20}
                      value={form.nbPersonne}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#73946B]"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      name="duration"
                      min={1}
                      value={form.duration}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#73946B]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#73946B]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 space-y-4">
              <h2 className="text-lg font-semibold text-[#73946B]">Paiement</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom sur la carte</label>
                <input
                  name="cardName"
                  value={form.cardName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#73946B]"
                  placeholder="Nom complet"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de carte</label>
                <input
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#73946B]"
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiration</label>
                  <input
                    name="expiry"
                    value={form.expiry}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#73946B]"
                    placeholder="MM/AA"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    name="cvv"
                    value={form.cvv}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#73946B]"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-lg font-medium">Total:</span>
                  <p className="text-sm text-gray-500">
                    {form.nbPersonne} personne{form.nbPersonne > 1 ? 's' : ''} × {form.duration} jour{form.duration > 1 ? 's' : ''} × {offer?.price}€
                  </p>
                </div>
                <motion.div
                  key={total}
                  initial={priceAnimation ? { scale: 1.2, color: "#5a7a52" } : {}}
                  animate={priceAnimation ? { scale: 1, color: "#73946B" } : {}}
                  transition={{ duration: 0.5 }}
                  className="text-2xl font-bold"
                  style={{ color: "#73946B" }}
                >
                  {total}€
                </motion.div>
              </div>

              <button
                type="submit"
                disabled={!userId || !tokenValid || !form.date}
                className={`w-full py-3 px-4 rounded-lg font-bold text-white ${
                  tokenValid && form.date
                    ? "bg-[#73946B] hover:bg-[#5a7a52]"
                    : "bg-gray-400 cursor-not-allowed"
                } transition-colors`}
              >
                {tokenValid ? "Confirmer la réservation" : "Authentification requise"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}