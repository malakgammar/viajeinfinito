import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function ConfirmationReservation() {
  const { state } = useLocation();
  const offre = state?.offre || {};
  const [nbPersonne, setNbPersonne] = useState(1);
  const [date, setDate] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const total = nbPersonne * (offre.prix || 0);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Facture de Réservation', 14, 20);

    doc.setFontSize(12);
    doc.text(`Offre : ${offre.nom}`, 14, 40);
    doc.text(`Agence : ${offre.agenceName}`, 14, 48);
    doc.text(`Durée : ${offre.duration} jours`, 14, 56);
    doc.text(`Nombre de personnes : ${nbPersonne}`, 14, 64);
    doc.text(`Date : ${date}`, 14, 72);
    doc.text(`Total : ${total} DH`, 14, 80);

    doc.save('facture_reservation.pdf');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      id_user: 1, // à remplacer avec l'utilisateur connecté
      id_offre: offre.id,
      nbPersonne,
      total,
      date,
      duration: offre.duration,
    };

    try {
      await fetch('http://localhost:8000/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      setIsConfirmed(true);
      generatePDF();
    } catch (err) {
      console.error(err);
    }
  };

  return (
<div className="flex justify-center items-start min-h-screen bg-[#f8f9fa] pt-24">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-[#73946B] mb-6">Confirmation de Réservation</h2>

        <div className="space-y-3 mb-6 text-gray-700">
          <p><span className="font-semibold">Offre :</span> {offre.nom}</p>
          <p><span className="font-semibold">Agence :</span> {offre.agenceName}</p>
          <p><span className="font-semibold">Durée :</span> {offre.duration} jours</p>
          <p><span className="font-semibold">Prix par personne :</span> {offre.prix} DH</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-sm">Nombre de personnes :</label>
            <input
              type="number"
              value={nbPersonne}
              onChange={(e) => setNbPersonne(parseInt(e.target.value))}
              min="1"
              required
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="block font-medium text-sm">Date du voyage :</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full border rounded-md p-2"
            />
          </div>

          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2 text-[#73946B]">Paiement par carte</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Numéro de carte"
                required
                className="w-full border rounded-md p-2"
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="MM/AA"
                  required
                  className="w-full border rounded-md p-2"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  required
                  className="w-full border rounded-md p-2"
                />
              </div>
              <input
                type="text"
                placeholder="Nom du titulaire"
                required
                className="w-full border rounded-md p-2"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-sm">Montant total :</label>
            <input
              type="text"
              value={`${total} DH`}
              readOnly
              className="w-full border bg-gray-100 rounded-md p-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#73946B] hover:bg-[#5e7e59] text-white font-medium py-2 rounded-md transition"
          >
            Confirmer et Payer
          </button>

          {isConfirmed && (
            <p className="text-green-600 font-semibold text-center mt-4">
              ✅ Réservation confirmée ! La facture est téléchargée.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
