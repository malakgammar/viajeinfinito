import React, { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";

export default function Confirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { reservation, offer } = state || {};
  const pdfRef = useRef();

  useEffect(() => {
    if (!reservation || !offer) {
      navigate("/", { replace: true });
    }
  }, [reservation, offer, navigate]);

  const generatePDF = async () => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element, { 
      scale: 2,
      backgroundColor: "#F8F8F8"
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);
    pdf.save(`confirmation_viajeinfinito_${reservation.id}.pdf`);
  };

  if (!reservation || !offer) return null;

  return (
    <div className="min-h-screen pt-24 px-4 bg-[#F8F8F8] pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        {/* En-tête de confirmation */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block bg-[#D2D0A0] p-4 rounded-full mb-4"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#73946B" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </motion.div>
          <h1 className="text-3xl font-bold text-[#73946B] mb-2">Réservation confirmée !</h1>
          <p className="text-gray-600">Votre référence: #{reservation.id}</p>
        </div>

        {/* Carte de confirmation */}
        <div 
          ref={pdfRef} 
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#D2D0A0]"
        >
          {/* En-tête de la carte */}
          <div className="bg-[#73946B] p-6 text-white">
            <h2 className="text-xl font-bold">{offer.destination}</h2>
            <p className="text-[#D2D0A0]">{offer.title}</p>
          </div>

          {/* Corps de la carte */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-[#73946B] mb-4">Détails du voyage</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Date de départ:</span>
                    <span className="font-medium">{new Date(reservation.date).toLocaleDateString()}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Durée:</span>
                    <span className="font-medium">{reservation.duration} jours</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Voyageurs:</span>
                    <span className="font-medium">{reservation.nbPersonne} personne{reservation.nbPersonne > 1 ? 's' : ''}</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#73946B] mb-4">Récapitulatif</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Prix unitaire:</span>
                    <span className="font-medium">{offer.price}€/pers.</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <motion.span 
                      key={reservation.total}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className="font-bold text-[#73946B]"
                    >
                      {reservation.total}€
                    </motion.span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#F8F8F8] p-4 rounded-lg">
              <h4 className="text-sm font-semibold text-[#73946B] mb-2">Informations supplémentaires</h4>
              <p className="text-sm text-gray-600">
                Vous recevrez un email de confirmation avec tous les détails de votre voyage. 
                Pensez à vérifier votre boîte de réception et vos spams.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={generatePDF}
            className="bg-[#73946B] text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Télécharger la confirmation
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/")}
            className="bg-white border border-[#73946B] text-[#73946B] px-6 py-3 rounded-lg font-semibold"
          >
            Retour à l'accueil
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}