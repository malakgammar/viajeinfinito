// src/pages/ConfirmationPage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedOffer = location.state?.offer;
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    name: "",
    expiry: "",
    cvc: "",
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!cardInfo.name.trim()) newErrors.name = "Nom requis";
    if (!cardInfo.cardNumber.trim() || cardInfo.cardNumber.replace(/\s/g, '').length < 16) 
      newErrors.cardNumber = "Numéro de carte invalide";
    if (!cardInfo.expiry.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) 
      newErrors.expiry = "Format MM/AA requis";
    if (!cardInfo.cvc.match(/^[0-9]{3,4}$/)) 
      newErrors.cvc = "Code de sécurité invalide";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const generateInvoice = () => {
  const doc = new jsPDF();
  
  // Dimensions utiles
  const pageWidth = doc.internal.pageSize.getWidth();
  const centerX = pageWidth / 2;

  // === EN-TÊTE AVEC DÉGRADÉ ===
  // Solution alternative pour le dégradé (car jsPDF ne supporte pas nativement les dégradés)
  doc.setFillColor(115, 148, 107); // primary
  doc.rect(0, 0, pageWidth, 60, 'F');
  
  // Logo (texte stylisé)
  doc.setFontSize(28);
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text("VIAJE INFINITO", centerX, 35, { align: "center" });
  
  // Sous-titre
  doc.setFontSize(14);
  doc.text("Facture Premium", centerX, 45, { align: "center" });

  // === CORPS DU DOCUMENT ===
  
  // Cadre décoratif (alternative à roundedRect)
  doc.setDrawColor(210, 208, 160); // secondary
  doc.setLineWidth(0.5);
  // Dessiner un rectangle avec coins carrés
  doc.rect(15, 70, pageWidth - 30, 100);
  
  // Informations client
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Facture n°: ${Math.floor(100000 + Math.random() * 900000)}`, 20, 85);
  doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, pageWidth - 20, 85, { align: "right" });
  
  // Séparateur stylisé
  doc.setDrawColor(115, 148, 107); // primary
  doc.setLineWidth(0.3);
  doc.line(20, 95, pageWidth - 20, 95);
  
  // Icône client
  doc.setTextColor(115, 148, 107);
  doc.setFontSize(16);
  doc.text("➤", 20, 110);
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Client: ${cardInfo.name.toUpperCase()}`, 30, 110);
  
  // === TABLEAU PREMIUM ===
  autoTable(doc, {
    startY: 120,
    head: [['Description', 'Durée', 'Prix']],
    body: [
      [selectedOffer.name, '1 séjour', `${selectedOffer.price}€`],
      ['', 'Total', `${selectedOffer.price}€`]
    ],
    styles: {
      halign: 'center',
      cellPadding: 5,
    },
    headStyles: {
      fillColor: [115, 148, 107], // primary
      textColor: 255,
      fontStyle: 'bold',
      cellPadding: 8,
    },
    bodyStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      cellPadding: 6,
    },
    alternateRowStyles: {
      fillColor: [242, 242, 242]
    },
    columnStyles: {
      0: { halign: 'left', cellWidth: 'auto' },
      1: { cellWidth: 30 },
      2: { cellWidth: 30, fontStyle: 'bold' }
    },
    margin: { top: 10 },
    didDrawPage: function(data) {
      // Alternative pour la bordure autour du tableau
      doc.setDrawColor(210, 208, 160); // secondary
      doc.rect(
        data.table.x - 2, 
        data.table.y - 2, 
        data.table.width + 4, 
        data.table.height + 4
      );
    }
  });

  // === PIED DE PAGE LUXE ===
  const finalY = doc.lastAutoTable.finalY + 20;
  
  // Message de remerciement
  doc.setFontSize(14);
  doc.setTextColor(115, 148, 107); // primary
  doc.text("Merci pour votre confiance !", centerX, finalY, { align: "center" });
  
  // Ligne signature
  doc.setDrawColor(210, 208, 160); // secondary
  doc.setLineWidth(0.5);
  doc.line(centerX - 40, finalY + 30, centerX + 40, finalY + 30);
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("Signature", centerX, finalY + 35, { align: "center" });
  
  // Cachet circulaire (fonctionne car circle est supporté)
  doc.setDrawColor(115, 148, 107); // primary
  doc.setFillColor(210, 208, 160); // secondary
  doc.circle(pageWidth - 30, finalY + 20, 15, 'FD');
  doc.setFontSize(10);
  doc.setTextColor(115, 148, 107); // primary
  doc.text("PAYÉ", pageWidth - 30, finalY + 22, { align: "center" });
  
  // Bas de page
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("Viaje Infinito - 123 Rue du Voyage, Paris", centerX, 285, { align: "center" });
  doc.text("contact@viaje-infinito.com - www.viaje-infinito.com", centerX, 290, { align: "center" });

  return doc;
};

  const handlePayment = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);
    
    setTimeout(() => {
      const invoice = generateInvoice();
      invoice.save(`facture-viaje-infinito-${Date.now()}.pdf`);
      
      setIsProcessing(false);
      navigate("/profile", { state: { paymentSuccess: true } });
    }, 1500);
  };

  if (!selectedOffer) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base">
        <p className="text-lg text-primary">Aucune offre sélectionnée.</p>
      </div>
    );
  }

  return (
    <div className="pt-20 px-4 min-h-screen bg-base">
      <div className="max-w-md mx-auto bg-base p-8 rounded-xl shadow-md border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Confirmation de réservation</h1>
          <p className="text-gray-600">
            Vous allez réserver <span className="font-semibold text-primary">{selectedOffer.name}</span>
          </p>
          <div className="mt-4 p-4 bg-secondary rounded-lg">
            <p className="text-2xl font-bold text-dark">{selectedOffer.price}€</p>
            <p className="text-sm text-gray-600">Total TTC</p>
          </div>
        </div>

        <form onSubmit={handlePayment} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              Nom sur la carte <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Jean Dupont"
              value={cardInfo.name}
              onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-1">
              Numéro de carte <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardInfo.cardNumber}
              onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value })}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark mb-1">
                Date d'expiration <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                placeholder="MM/AA"
                value={cardInfo.expiry}
                onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary ${errors.expiry ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.expiry && <p className="mt-1 text-sm text-red-500">{errors.expiry}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1">
                CVC <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="123"
                  value={cardInfo.cvc}
                  onChange={(e) => setCardInfo({ ...cardInfo, cvc: e.target.value })}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary ${errors.cvc ? 'border-red-500' : 'border-gray-300'}`}
                />
                <span className="absolute right-3 top-3 text-gray-400 text-xs">3 chiffres</span>
              </div>
              {errors.cvc && <p className="mt-1 text-sm text-red-500">{errors.cvc}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className={`mt-8 w-full py-3 px-4 rounded-lg font-medium text-base ${isProcessing ? 'bg-primary/70' : 'bg-primary hover:bg-primary/90'} transition-colors duration-200 flex items-center justify-center`}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Traitement en cours...
              </>
            ) : (
              `Payer ${selectedOffer.price}€`
            )}
          </button>

          <div className="mt-6 flex items-center justify-center">
            <div className="flex items-center space-x-2 text-dark">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm">Paiement sécurisé</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}