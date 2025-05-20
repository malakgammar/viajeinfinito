import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Confirmation() {
  const { state } = useLocation();
  const { reservation, payment, offer } = state || {};
  const pdfRef = useRef();

  const generatePDF = async () => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
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
    pdf.save("confirmation_reservation.pdf");
  };

  if (!reservation || !offer || !payment) {
    return (
      <div className="pt-20 px-6 text-center text-red-500">
        <h2>Erreur : Informations de réservation manquantes.</h2>
      </div>
    );
  }

  return (
    <div className="pt-20 px-6">
      <div ref={pdfRef} className="bg-white rounded-lg p-6 shadow space-y-2 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">Réservation confirmée</h1>
        <p><strong>Offre :</strong> {offer.title}</p>
        <p><strong>Destination :</strong> {offer.destination || "N/A"}</p>
        <p><strong>Date :</strong> {reservation.date}</p>
        <p><strong>Durée :</strong> {reservation.duration} jours</p>
        <p><strong>Nombre de personnes :</strong> {reservation.nbPersonne}</p>
        <p><strong>Total payé :</strong> {reservation.total}€</p>
        <hr className="my-4" />
        <h2 className="text-xl font-semibold">Paiement</h2>
        <p><strong>Nom sur carte :</strong> {payment.cardName}</p>
        <p><strong>Numéro (partiel) :</strong> **** **** **** {payment.cardNumber?.slice(-4)}</p>
      </div>

      <div className="text-center mt-6">
        <button onClick={generatePDF} className="bg-primary text-white px-5 py-2 rounded">
          Télécharger le PDF
        </button>
      </div>
    </div>
  );
}
