import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Personnaliser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: "",
    date: "",
    budget: "",
    type: "",
    personnes: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Personnalisation envoyée:", formData);
    navigate("/confirmation", { state: formData });
  };

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-base to-primary/10 px-6 flex justify-center">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white shadow-2xl rounded-3xl p-10 max-w-3xl w-full flex flex-col gap-8"
      >
        <h1 className="text-3xl font-bold text-dark text-center">Personnaliser mon voyage</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-dark font-medium mb-1">Destination</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-dark font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-dark font-medium mb-1">Budget (€)</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-dark font-medium mb-1">Type de voyage</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              required
            >
              <option value="">-- Choisir --</option>
              <option value="aventure">Aventure</option>
              <option value="luxe">Luxe</option>
              <option value="détente">Détente</option>
              <option value="culturel">Culturel</option>
            </select>
          </div>

          <div>
            <label className="block text-dark font-medium mb-1">Nombre de personnes</label>
            <input
              type="number"
              name="personnes"
              value={formData.personnes}
              onChange={handleChange}
              min="1"
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-primary text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-dark transition"
          >
            Envoyer ma demande
          </button>
        </div>
      </motion.form>
    </div>
  );
}
