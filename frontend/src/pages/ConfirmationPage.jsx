import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-lg w-full"
      >
        <h1 className="text-3xl font-bold text-primary mb-4">🎉 Réservation Confirmée !</h1>
        <p className="text-gray-700 mb-6">
          Merci pour votre réservation. Un email de confirmation vous a été envoyé avec tous les détails.
        </p>

        <Link
          to="/agences"
          className="inline-block mt-4 px-6 py-2 bg-primary text-white rounded-full font-semibold shadow-md hover:scale-105 transition-transform"
        >
          Retour aux offres
        </Link>
      </motion.div>
    </div>
  );
}
