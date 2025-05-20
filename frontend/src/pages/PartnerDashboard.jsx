// src/pages/PartenerDashboard.js
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api";

export default function PartenerDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [subscription, setSubscription] = useState(null);
  const [nextPayment, setNextPayment] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const colors = {
    primary: '#73946B',
    secondary: '#D2D0A0',
    light: '#FAFAF7',
    base: '#FFFFFF'
  };

  useEffect(() => {
    // Si on arrive depuis la page d'adhésion, utiliser les données de localisation
    if (location.state?.subscription) {
      setSubscription(location.state.subscription);
      calculateNextPayment(location.state.subscription.startDate);
      setIsLoading(false);
    } else {
      // Sinon, charger les données depuis l'API
      api.get('/partenaires/abonnement')
        .then(res => {
          setSubscription(res.data);
          calculateNextPayment(res.data.startDate);
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Erreur lors du chargement de l'abonnement:", err);
          navigate('/profile');
        });
    }
  }, [location]);

  const calculateNextPayment = (startDate) => {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + 1);
    setNextPayment(date.toLocaleDateString('fr-FR'));
  };

  const handleRenew = () => {
    navigate('/payment', { state: { subscription } });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div 
      className="pt-20 min-h-screen px-6 pb-12"
      style={{ backgroundColor: colors.light }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ color: colors.primary }}
          >
            Tableau de bord Partenaire
          </h1>
          <div className="h-1 w-24 rounded-full" style={{ backgroundColor: colors.secondary }}></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-xl shadow-lg"
            style={{ backgroundColor: colors.base }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>
              Votre abonnement
            </h3>
            <p className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>
              {subscription.plan}
            </p>
            <p className="text-lg mb-4" style={{ color: colors.primary }}>
              {subscription.price}/mois
            </p>
            <div className="h-px w-full mb-4" style={{ backgroundColor: `${colors.primary}20` }}></div>
            <p className="text-sm" style={{ color: colors.primary }}>
              Prochain paiement: {nextPayment}
            </p>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-xl shadow-lg"
            style={{ backgroundColor: colors.base }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>
              Statut
            </h3>
            <div className="flex items-center gap-2 mb-4">
              <div 
                className={`h-3 w-3 rounded-full ${subscription.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`}
              ></div>
              <p style={{ color: colors.primary }}>
                {subscription.status === 'active' ? 'Actif' : 'En attente'}
              </p>
            </div>
            <div className="h-px w-full mb-4" style={{ backgroundColor: `${colors.primary}20` }}></div>
            <p className="text-sm mb-2" style={{ color: colors.primary }}>
              Date d'activation: {new Date(subscription.startDate).toLocaleDateString('fr-FR')}
            </p>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-xl shadow-lg"
            style={{ backgroundColor: colors.base }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>
              Actions
            </h3>
            <motion.button
              onClick={handleRenew}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-2 rounded-lg font-medium mb-3"
              style={{ 
                backgroundColor: colors.primary,
                color: colors.base
              }}
            >
              Renouveler maintenant
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-2 rounded-lg font-medium border"
              style={{ 
                borderColor: colors.primary,
                color: colors.primary
              }}
            >
              Changer de forfait
            </motion.button>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-xl shadow-lg"
          style={{ backgroundColor: colors.base }}
        >
          <h2 className="text-xl font-bold mb-6" style={{ color: colors.primary }}>
            Historique des paiements
          </h2>
          
          {subscription.payments?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${colors.primary}20` }}>
                    <th className="text-left py-3 px-4" style={{ color: colors.primary }}>Date</th>
                    <th className="text-left py-3 px-4" style={{ color: colors.primary }}>Montant</th>
                    <th className="text-left py-3 px-4" style={{ color: colors.primary }}>Méthode</th>
                    <th className="text-left py-3 px-4" style={{ color: colors.primary }}>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {subscription.payments.map((payment, index) => (
                    <tr 
                      key={index} 
                      style={{ 
                        borderBottom: `1px solid ${colors.primary}10`,
                        backgroundColor: index % 2 === 0 ? `${colors.light}80` : 'transparent'
                      }}
                    >
                      <td className="py-3 px-4" style={{ color: colors.primary }}>
                        {new Date(payment.date).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="py-3 px-4" style={{ color: colors.primary }}>
                        {payment.amount}
                      </td>
                      <td className="py-3 px-4" style={{ color: colors.primary }}>
                        {payment.method}
                      </td>
                      <td className="py-3 px-4">
                        <span 
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            payment.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : payment.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {payment.status === 'completed' ? 'Complété' : payment.status === 'pending' ? 'En attente' : 'Échoué'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke={colors.primary}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p style={{ color: colors.primary }}>Aucun historique de paiement disponible</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}