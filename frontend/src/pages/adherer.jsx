// src/pages/Adherer.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api";

export default function Adherer() {
  const navigate = useNavigate();
  const [plan, setPlan] = useState("basic");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const colors = {
    primary: '#73946B',
    secondary: '#D2D0A0',
    light: '#FAFAF7',
    base: '#FFFFFF'
  };

  const plans = {
    basic: {
      name: "Basique",
      price: "999.99MAD",
      features: ["Profil partenaire", "5 annonces/mois", "Support standard"]
    },
    pro: {
      name: "Professionnel",
      price: "1999.99MAD",
      features: ["Profil partenaire", "Annonces illimitées", "Support prioritaire", "Mise en avant"]
    },
    premium: {
      name: "Premium",
      price: "2999.99MAD",
      features: ["Profil partenaire", "Annonces illimitées", "Support 24/7", "Mise en avant", "Statistiques avancées"]
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      const response = await api.post('/partenaires/adherer', {
        plan,
        paymentMethod,
        cardDetails
      });
      
      navigate('/partner/dashboard', { state: { subscription: response.data } });
    } catch (error) {
      console.error("Erreur lors de l'adhésion:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div 
      className="pt-20 min-h-screen px-6 flex justify-center"
      style={{ backgroundColor: colors.light }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
        className="max-w-4xl w-full bg-base rounded-3xl shadow-lg p-8 md:p-12 relative"
        style={{
          border: `2px solid ${colors.primary}30`,
          boxShadow: `0 10px 30px ${colors.primary}15`
        }}
      >
        <h1 
          className="text-3xl font-bold mb-8 text-center"
          style={{ color: colors.primary }}
        >
          Devenir Partenaire
        </h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4" style={{ color: colors.primary }}>
              Choisissez votre forfait
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(plans).map(([key, planData]) => (
                <motion.div
                  key={key}
                  whileHover={{ y: -5 }}
                  className={`p-6 rounded-xl cursor-pointer border-2 transition-all ${plan === key ? 'border-primary' : 'border-transparent'}`}
                  style={{ 
                    backgroundColor: colors.base,
                    boxShadow: `0 5px 15px ${colors.primary}10`
                  }}
                  onClick={() => setPlan(key)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold" style={{ color: colors.primary }}>
                      {planData.name}
                    </h3>
                    <span className="text-xl font-bold" style={{ color: colors.primary }}>
                      {planData.price}
                      <span className="text-sm font-normal">/mois</span>
                    </span>
                  </div>
                  
                  <ul className="space-y-2">
                    {planData.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke={colors.primary}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span style={{ color: colors.primary }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4" style={{ color: colors.primary }}>
              Méthode de paiement
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg cursor-pointer border-2 ${paymentMethod === 'card' ? 'border-primary' : 'border-gray-200'}`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={paymentMethod === 'card' ? colors.primary : '#666'}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span style={{ color: paymentMethod === 'card' ? colors.primary : '#666' }}>Carte bancaire</span>
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg cursor-pointer border-2 ${paymentMethod === 'paypal' ? 'border-primary' : 'border-gray-200'}`}
                onClick={() => setPaymentMethod('paypal')}
              >
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={paymentMethod === 'paypal' ? colors.primary : '#666'}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <span style={{ color: paymentMethod === 'paypal' ? colors.primary : '#666' }}>PayPal</span>
                </div>
              </motion.div>
            </div>
            
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-2" style={{ color: colors.primary }}>
                    Numéro de carte
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-3 rounded-lg border focus:ring-2 focus:outline-none"
                    style={{ 
                      borderColor: `${colors.primary}50`,
                      focusRingColor: colors.primary,
                      color: colors.primary
                    }}
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-2" style={{ color: colors.primary }}>
                      Date d'expiration
                    </label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="w-full p-3 rounded-lg border focus:ring-2 focus:outline-none"
                      style={{ 
                        borderColor: `${colors.primary}50`,
                        focusRingColor: colors.primary,
                        color: colors.primary
                      }}
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block font-medium mb-2" style={{ color: colors.primary }}>
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full p-3 rounded-lg border focus:ring-2 focus:outline-none"
                      style={{ 
                        borderColor: `${colors.primary}50`,
                        focusRingColor: colors.primary,
                        color: colors.primary
                      }}
                      value={cardDetails.cvc}
                      onChange={(e) => setCardDetails({...cardDetails, cvc: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-center">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full font-semibold shadow-md flex items-center gap-2"
              style={{ 
                backgroundColor: colors.primary,
                color: colors.base
              }}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Traitement...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Confirmer l'adhésion
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}