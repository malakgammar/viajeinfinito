// src/components/Auth.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api";

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin]     = useState(true);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [formData, setFormData]   = useState({
    fullName:        "",
    email:           "",
    phone:           "",
    password:        "",
    confirmPassword: ""
  });

  // Palette de couleurs
  const colors = {
    primary:   '#73946B',
    secondary: '#D2D0A0',
    light:     '#FAFAF7'
  };

  // Redirige si déjà authentifié
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/profile');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData(fd => ({
      ...fd,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Appel login ou register
      const endpoint = isLogin ? '/login' : '/register';
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            name:                  formData.fullName,
            email:                 formData.email,
            telephone:             formData.phone,
            password:              formData.password,
            password_confirmation: formData.confirmPassword
          };

      const { data } = await api.post(endpoint, payload);

      // Stockage du token + configuration Axios
      localStorage.setItem('token', data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

      // Récupère le profil pour le rôle
      const profile = await api.get('/user/profile');
      const user    = profile.data;

      // Redirection selon rôle
      if (isLogin) {
        navigate(user.role === 'client' ? '/profile' : '/partner/dashboard');
      } else {
        navigate('/profile');
      }
    } catch (err) {
      console.error("Erreur API:", err.response?.data || err);
      setError(
        err.response?.data?.message ||
        err.message ||
        "Erreur inconnue"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="pt-20 min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: colors.light }}
    >
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, x: isLogin ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 50 : -50 }}
              transition={{ duration: 0.3 }}
            >
              <h2 
                className="text-2xl font-bold mb-6 text-center"
                style={{ color: colors.primary }}
              >
                {isLogin ? 'Connexion' : 'Inscription'}
              </h2>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block mb-1 font-medium" style={{ color: colors.primary }}>
                      Nom complet
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none"
                      style={{ borderColor: `${colors.primary}80` }}
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block mb-1 font-medium" style={{ color: colors.primary }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none"
                    style={{ borderColor: `${colors.primary}80` }}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label className="block mb-1 font-medium" style={{ color: colors.primary }}>
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none"
                      style={{ borderColor: `${colors.primary}80` }}
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block mb-1 font-medium" style={{ color: colors.primary }}>
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none"
                    style={{ borderColor: `${colors.primary}80` }}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength="6"
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label className="block mb-1 font-medium" style={{ color: colors.primary }}>
                      Confirmer le mot de passe
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none"
                      style={{ borderColor: `${colors.primary}80` }}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      minLength="6"
                    />
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
                  style={{ 
                    backgroundColor: colors.primary,
                    color: 'white'
                  }}
                >
                  {loading ? 'Chargement...' : isLogin ? 'Se connecter' : 'S\'inscrire'}
                </motion.button>
              </form>

              <p className="mt-6 text-center text-sm" style={{ color: colors.primary }}>
                {isLogin ? 'Pas encore inscrit ?' : 'Déjà un compte ?'}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-medium hover:underline"
                  style={{ color: colors.primary }}
                >
                  {isLogin ? 'Créer un compte' : 'Se connecter'}
                </button>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
