// src/pages/Paiement.js
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [subscription, setSubscription] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvc: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const colors = {
    primary: '#73946B',
    secondary: '#D2D0A0',
    light: '#FAFAF7',
    base: '#FFFFFF'
  };

  useEffect(() => {
    if (location.state?.subscription) {
      setSubscription(location.state.subscription);
    } else {
      navigate('/partener/dashboard');
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      const response = await api.post('/paiement/process', {
        subscriptionId: subscription.id,
        paymentMethod,
        cardDetails: paymentMethod === 'card' ? cardDetails : null,
        amount: subscription.price
      });
      
      setPaymentSuccess(true);
      setTimeout(() => {
        navigate('/partener/dashboard', { state: { subscription: response.data } });
      }, 2000);
    } catch (error) {
      console.error("Erreur lors du paiement:", error);
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-8 rounded-xl shadow-lg"
          style={{ backgroundColor: colors.base }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h2 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>
            Paiement réussi !
          </h2>
          <p style={{ color: colors.primary }}>
            Votre abonnement a été renouvelé avec succès.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      className="pt-20 min-h-screen px-6 flex justify-center"
      style={{ backgroundColor: colors.light }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
        className="max-w-2xl w-full bg-base rounded-3xl shadow-lg p-8 md:p-12 relative"
        style={{
          border: `2px solid ${colors.primary}30`,
          boxShadow: `0 10px 30px ${colors.primary}15`
        }}
      >
        <h1 
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: colors.primary }}
        >
          Paiement de l'abonnement
        </h1>
        
        <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: `${colors.secondary}20` }}>
          <div className="flex justify-between items-center mb-2">
            <span style={{ color: colors.primary }}>Forfait:</span>
            <span className="font-bold" style={{ color: colors.primary }}>{subscription?.plan}</span>
          </div>
          <div className="flex justify-between items-center">
            <span style={{ color: colors.primary }}>Montant:</span>
            <span className="font-bold" style={{ color: colors.primary }}>{subscription?.price}</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4" style={{ color: colors.primary }}>
              Méthode de paiement
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Payer maintenant
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}