import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api';

export default function Adherer() {
  const nav = useNavigate();
  const [forfaits, setForfaits] = useState([]);
  const [selectedForfait, setSelectedForfait] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
    logo: null,
  });
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: ''
  });
  const [loading, setLoading] = useState({ forfaits: true, submission: false });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const colors = {
    primary: '#73946B',
    secondary: '#D2D0A0',
    light: '#FAFAF7',
    base: '#FFFFFF'
  };

  useEffect(() => {
    const loadForfaits = async () => {
      try {
        const response = await api.get('/forfaits');
        setForfaits(response.data);
        setSelectedForfait(response.data[0]?.id);
      } catch (err) {
        setError("Erreur lors du chargement des forfaits");
      } finally {
        setLoading(prev => ({ ...prev, forfaits: false }));
      }
    };
    loadForfaits();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      setError("La taille du logo ne doit pas dépasser 2MB");
      return;
    }
    setForm({ ...form, logo: file });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedForfait) {
      setError("Veuillez sélectionner un forfait");
      return;
    }

    setLoading(prev => ({ ...prev, submission: true }));
    setError(null);

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('address', form.address);
      formData.append('phone', form.phone);
       if (form.logo) formData.append('logo', form.logo); // Changé de logo_url à logo

    // Envoyez d'abord les données de l'agence
   await api.post('/agences', formData, {
      headers: { 
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Ajout du token si nécessaire
      }
    });

      await api.post('/subscribe', { 
        forfait_id: selectedForfait,
        paymentMethod,
        cardDetails
      });

      setSuccess(true);
      setTimeout(() => nav('/partner/dashboard'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'adhésion");
    } finally {
      setLoading(prev => ({ ...prev, submission: false }));
    }
  };

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: colors.light }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 max-w-md bg-base rounded-3xl shadow-lg"
          style={{ border: `2px solid ${colors.primary}30` }}
        >
          <div className="mx-auto mb-4">
            <svg className="mx-auto h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke={colors.primary}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>Paiement réussi!</h2>
          <p className="text-gray-600">Redirection en cours...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen px-6" style={{ backgroundColor: colors.light }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto bg-base rounded-3xl shadow-lg p-8"
        style={{ border: `2px solid ${colors.primary}30` }}
      >
        <h1 className="text-3xl font-bold text-center mb-10" style={{ color: colors.primary }}>
          Devenir Partenaire
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Forfaits */}
          <div>
            <h2 className="text-xl font-semibold mb-4" style={{ color: colors.primary }}>Nos forfaits</h2>
            
            <div className="space-y-4">
              {forfaits.map((forfait) => (
                <motion.div
                  key={forfait.id}
                  whileHover={{ y: -5 }}
                  className={`p-6 rounded-xl cursor-pointer border-2 transition-all ${
                    selectedForfait === forfait.id ? 'border-primary' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: colors.base }}
                  onClick={() => setSelectedForfait(forfait.id)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold" style={{ color: colors.primary }}>{forfait.name}</h3>
                    <span className="text-xl font-bold" style={{ color: colors.primary }}>
                      {forfait.price_label}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {forfait.features.map((feature, index) => (
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

          {/* Formulaire */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4" style={{ color: colors.primary }}>Informations de l'agence</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block font-medium mb-2" style={{ color: colors.primary }}>Nom de l'agence</label>
                    <input
                      type="text"
                      required
                      className="w-full p-3 rounded-lg border focus:ring-2"
                      style={{ borderColor: `${colors.primary}50` }}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-2" style={{ color: colors.primary }}>address</label>
                    <input
                      type="text"
                      required
                      className="w-full p-3 rounded-lg border focus:ring-2"
                      style={{ borderColor: `${colors.primary}50` }}
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-2" style={{ color: colors.primary }}>Téléphone</label>
                    <input
                      type="tel"
                      required
                      className="w-full p-3 rounded-lg border focus:ring-2"
                      style={{ borderColor: `${colors.primary}50` }}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-2" style={{ color: colors.primary }}>Logo</label>
                    <input
    type="file"
    accept="image/jpeg, image/png, image/jpg, image/gif"
    onChange={handleFileChange}
    className="w-full p-2 rounded-lg border"
    style={{ borderColor: `${colors.primary}50` }}
/>
                  </div>
                </div>
              </div>

              {/* Paiement */}
              <div>
                <h2 className="text-xl font-semibold mb-4" style={{ color: colors.primary }}>Paiement</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
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
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block font-medium mb-2" style={{ color: colors.primary }}>Numéro de carte</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full p-3 rounded-lg border focus:ring-2"
                        style={{ borderColor: `${colors.primary}50` }}
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-medium mb-2" style={{ color: colors.primary }}>Expiration</label>
                        <input
                          type="text"
                          placeholder="MM/AA"
                          className="w-full p-3 rounded-lg border focus:ring-2"
                          style={{ borderColor: `${colors.primary}50` }}
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block font-medium mb-2" style={{ color: colors.primary }}>CVC</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full p-3 rounded-lg border focus:ring-2"
                          style={{ borderColor: `${colors.primary}50` }}
                          value={cardDetails.cvc}
                          onChange={(e) => setCardDetails({...cardDetails, cvc: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 rounded-full font-semibold flex justify-center items-center gap-2"
                style={{ 
                  backgroundColor: colors.primary,
                  color: colors.base,
                  opacity: loading.submission ? 0.7 : 1
                }}
                disabled={loading.submission}
              >
                {loading.submission ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" strokeWidth="4" className="opacity-25"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Traitement...
                  </>
                ) : (
                  "Confirmer l'adhésion"
                )}
              </motion.button>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}