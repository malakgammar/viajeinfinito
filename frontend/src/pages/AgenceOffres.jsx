import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'; 
import { FaCheckCircle, FaDownload, FaArrowLeft } from "react-icons/fa";

const offresMaroc = [
  {
    id: 1,
    titre: "Séjour à Marrakech - 5 jours",
    description: "Découvrez les souks, les palais et la culture vibrante de Marrakech.",
    prix: 450,
    image: "https://images.unsplash.com/photo-1518544866330-95a3296179f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    titre: "Tour de Casablanca - 3 jours",
    description: "Explorez la plus grande ville économique du Maroc et ses environs.",
    prix: 300,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    titre: "Excursion à Fès - 4 jours",
    description: "Visitez la médina de Fès, ses artisans et monuments historiques.",
    prix: 400,
    image: "https://images.unsplash.com/photo-1580502304784-8985b7eb7260?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
];

export default function Offres() {
  const [selectedOffre, setSelectedOffre] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    numeroCarte: "",
    dateExpiration: "",
    cvc: "",
    nbPersonnes: 1,
  });
  const [confirmation, setConfirmation] = useState(null);

  const handleReserver = (offre) => {
    setSelectedOffre(offre);
    setConfirmation(null);
    setFormData({
      nom: "",
      email: "",
      numeroCarte: "",
      dateExpiration: "",
      cvc: "",
      nbPersonnes: 1,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "nbPersonnes" ? Math.max(1, Number(value)) : value,
    }));
  };

  const totalMontant = selectedOffre
    ? selectedOffre.prix * formData.nbPersonnes
    : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmation({
      ...formData,
      offre: selectedOffre,
      montant: totalMontant,
      dateReservation: new Date().toLocaleDateString('fr-FR'),
      reference: `RES-${Math.floor(Math.random() * 1000000)}`
    });
    setSelectedOffre(null);
  };

const generatePDF = () => {
  const doc = new jsPDF();
  
  // En-tête
  doc.setFillColor(115, 148, 107);
  doc.rect(0, 0, 210, 30, 'F');
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text("ViajeInfinito", 15, 20);
  
  // Titre
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text("Confirmation de réservation", 105, 50, { align: 'center' });
  
  // Informations
  let y = 70;
  const addLine = (label, value) => {
    doc.text(`${label}: ${value}`, 15, y);
    y += 10;
  };
  
  addLine('Référence', confirmation.reference);
  addLine('Date', confirmation.dateReservation);
  addLine('Nom complet', confirmation.nom);
  addLine('Email', confirmation.email);
  addLine('Offre', confirmation.offre.titre);
  addLine('Nombre de personnes', confirmation.nbPersonnes);
  addLine('Montant total', `${confirmation.montant} MAD`);
  
  // Message
  y += 15;
  doc.text("Merci pour votre confiance. Votre réservation a bien été enregistrée.", 15, y);
  y += 10;
  doc.text("Nous vous contacterons dans les plus brefs délais pour finaliser votre séjour.", 15, y);
  
  // Pied de page
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("Voyage Maroc - Contact: contact@voyagemaroc.com - Tel: +212 6 12 34 56 78", 105, 285, { align: 'center' });
  
  doc.save(`confirmation_${confirmation.reference}.pdf`);
};

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#73946B] mb-3">Nos Offres au Maroc</h1>
          <p className="text-lg text-[#D2D0A0] max-w-2xl mx-auto">
            Découvrez nos séjours exceptionnels à travers les plus belles villes du Maroc
          </p>
        </div>

        {!selectedOffre && !confirmation && (
          <div className="grid md:grid-cols-3 gap-8">
            {offresMaroc.map((offre) => (
              <div
                key={offre.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-[#D2D0A0]"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={offre.image} 
                    alt={offre.titre}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#73946B] mb-2">{offre.titre}</h2>
                  <p className="text-gray-600 mb-4">{offre.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-[#73946B]">{offre.prix} MAD</span>
                    <button
                      onClick={() => handleReserver(offre)}
                      className="px-6 py-2 bg-[#73946B] text-white rounded-lg hover:bg-[#5a7a52] transition-colors"
                    >
                      Réserver
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedOffre && (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <button 
                onClick={() => setSelectedOffre(null)}
                className="flex items-center text-[#73946B] mb-4 hover:underline"
              >
                <FaArrowLeft className="mr-2" /> Retour aux offres
              </button>
              
              <h2 className="text-2xl font-bold text-[#73946B] mb-6">
                Réserver : {selectedOffre.titre}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="nom"
                      required
                      value={formData.nom}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#73946B] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#73946B] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre de personnes <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="nbPersonnes"
                    min={1}
                    required
                    value={formData.nbPersonnes}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#73946B] focus:border-transparent"
                  />
                </div>

                <div className="border-t border-gray-200 pt-4 mt-6">
                  <h3 className="text-lg font-medium text-[#73946B] mb-4">Paiement sécurisé</h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Numéro de carte <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="numeroCarte"
                      required
                      maxLength={16}
                      value={formData.numeroCarte}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#73946B] focus:border-transparent"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date d'expiration <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="dateExpiration"
                        required
                        placeholder="MM/AA"
                        maxLength={5}
                        value={formData.dateExpiration}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#73946B] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVC <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="cvc"
                        required
                        maxLength={3}
                        value={formData.cvc}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#73946B] focus:border-transparent"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#F8F8F8] p-4 rounded-lg mt-6">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total:</span>
                    <span className="text-2xl font-bold text-[#73946B]">{totalMontant} MAD</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 py-3 bg-[#73946B] text-white rounded-lg hover:bg-[#5a7a52] transition-colors font-medium"
                >
                  Confirmer la réservation
                </button>
              </form>
            </div>
          </div>
        )}

        {confirmation && (
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <FaCheckCircle className="h-6 w-6 text-[#73946B]" />
              </div>
              
              <h2 className="text-2xl font-bold text-[#73946B] mb-2">
                Réservation confirmée !
              </h2>
              <p className="text-gray-600 mb-6">
                Votre référence: <span className="font-bold">{confirmation.reference}</span>
              </p>
              
              <div className="bg-[#F8F8F8] rounded-lg p-6 mb-6 text-left">
                <h3 className="font-bold text-[#73946B] mb-3">Détails de la réservation</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Offre:</span> {confirmation.offre.titre}</p>
                  <p><span className="font-medium">Nom:</span> {confirmation.nom}</p>
                  <p><span className="font-medium">Email:</span> {confirmation.email}</p>
                  <p><span className="font-medium">Nombre de personnes:</span> {confirmation.nbPersonnes}</p>
                  <p><span className="font-medium">Montant total:</span> {confirmation.montant} MAD</p>
                </div>
              </div>

              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={generatePDF}
                  className="px-6 py-2 bg-[#73946B] text-white rounded-lg hover:bg-[#5a7a52] transition-colors flex items-center justify-center"
                >
                  <FaDownload className="mr-2" /> Télécharger la confirmation
                </button>
                
                <button
                  onClick={() => setConfirmation(null)}
                  className="px-6 py-2 border border-[#73946B] text-[#73946B] rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Nouvelle réservation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}