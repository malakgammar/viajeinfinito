// src/components/Auth.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api";

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  // Palette de couleurs
  const colors = {
    primary: '#73946B',
    secondary: '#D2D0A0',
    light: '#FAFAF7'
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
      if (isResetPassword) {
        // Envoi de la demande de réinitialisation
        await api.post('/forgot-password', {
          email: formData.email,
        });
        setError("Un email de réinitialisation a été envoyé !");
        return;
      }

      // Appel login ou register
      const endpoint = isLogin ? '/login' : '/register';
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            name: formData.fullName,
            email: formData.email,
            telephone: formData.phone,
            password: formData.password,
            password_confirmation: formData.confirmPassword
          };

      const { data } = await api.post(endpoint, payload);

      // Stockage du token + configuration Axios
      localStorage.setItem('token', data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

      // Récupère le profil pour le rôle
      const profile = await api.get('/profile');
      const user = profile.data;

      // Redirection selon rôle
      if (isLogin) {
        if (user.role === 'admin') {
          navigate('/admin');
        } else if (user.role === 'partner') {
          navigate('/partner/dashboard');
        } else {
          navigate('/profile');
        }
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
              key={`${isLogin}-${isResetPassword}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <h2 
                className="text-2xl font-bold mb-6 text-center"
                style={{ color: colors.primary }}
              >
                {isResetPassword ? 'Réinitialisation' : isLogin ? 'Connexion' : 'Inscription'}
              </h2>

              {error && (
                <div className={`mb-4 p-3 rounded-lg ${
                  error.includes("envoyé") 
                    ? "bg-green-100 text-green-700" 
                    : "bg-red-100 text-red-700"
                }`}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && !isResetPassword && (
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

                {!isLogin && !isResetPassword && (
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

                {!isResetPassword && (
                  <>
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
                  </>
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
                  {loading 
                    ? 'Chargement...' 
                    : isResetPassword 
                      ? 'Envoyer le lien' 
                      : isLogin 
                        ? 'Se connecter' 
                        : 'S\'inscrire'}
                </motion.button>
              </form>

              <div className="mt-6 text-center space-y-2">
                {isLogin && !isResetPassword && (
                  <p className="text-sm" style={{ color: colors.primary }}>
                    <button
                      onClick={() => {
                        setIsResetPassword(true);
                        setIsLogin(false);
                      }}
                      className="font-medium hover:underline"
                      style={{ color: colors.primary }}
                    >
                      Mot de passe oublié ?
                    </button>
                  </p>
                )}

                {isResetPassword && (
                  <p className="text-sm" style={{ color: colors.primary }}>
                    <button
                      onClick={() => {
                        setIsResetPassword(false);
                        setIsLogin(true);
                      }}
                      className="font-medium hover:underline"
                      style={{ color: colors.primary }}
                    >
                      Retour à la connexion
                    </button>
                  </p>
                )}

                {!isResetPassword && (
                  <p className="text-sm" style={{ color: colors.primary }}>
                    {isLogin ? 'Pas encore inscrit ?' : 'Déjà un compte ?'}{' '}
                    <button
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setIsResetPassword(false);
                      }}
                      className="font-medium hover:underline"
                      style={{ color: colors.primary }}
                    >
                      {isLogin ? 'Créer un compte' : 'Se connecter'}
                    </button>
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}