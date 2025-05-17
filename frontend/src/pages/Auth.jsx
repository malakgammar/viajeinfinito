import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  // Signup states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("client");

  const toggleForm = () => setIsLogin(!isLogin);

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    // Redirection selon le rôle
    if (role === "client") {
      navigate("/profile");
    } else if (role === "partenaire") {
      navigate("/partner/dashboard");
    }
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-base px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="p-8">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-center text-dark">Connexion</h2>
                <form className="space-y-5">
                  <div>
                    <label className="block mb-1 text-dark font-medium">Email</label>
                    <input type="email" className="w-full p-3 border rounded-lg border-primary/30 focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block mb-1 text-dark font-medium">Mot de passe</label>
                    <input type="password" className="w-full p-3 border rounded-lg border-primary/30 focus:ring-2 focus:ring-primary" />
                  </div>
                  <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg hover:bg-dark transition-colors font-semibold">
                    Se connecter
                  </button>
                </form>
                <p className="mt-6 text-center text-sm">
                  Pas encore inscrit ?{" "}
                  <button onClick={toggleForm} className="text-primary hover:underline font-medium">
                    Créez un compte
                  </button>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-center text-dark">Inscription</h2>
                <form onSubmit={handleRegister} className="space-y-5">
                  <div>
                    <label className="block mb-1 text-dark font-medium">Nom complet</label>
                    <input
                      type="text"
                      className="w-full p-3 border rounded-lg border-primary/30 focus:ring-2 focus:ring-primary"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-dark font-medium">Email</label>
                    <input
                      type="email"
                      className="w-full p-3 border rounded-lg border-primary/30 focus:ring-2 focus:ring-primary"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-dark font-medium">Téléphone</label>
                    <input
                      type="tel"
                      className="w-full p-3 border rounded-lg border-primary/30 focus:ring-2 focus:ring-primary"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-dark font-medium">Rôle</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full p-3 border rounded-lg border-primary/30 focus:ring-2 focus:ring-primary"
                    >
                      <option value="client">Client</option>
                      <option value="partenaire">Partenaire</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-dark font-medium">Mot de passe</label>
                    <input
                      type="password"
                      className="w-full p-3 border rounded-lg border-primary/30 focus:ring-2 focus:ring-primary"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-dark font-medium">Confirmer le mot de passe</label>
                    <input
                      type="password"
                      className="w-full p-3 border rounded-lg border-primary/30 focus:ring-2 focus:ring-primary"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div><button type="submit" className="w-full bg-primary text-white py-3 rounded-lg hover:bg-dark transition-colors font-semibold">
                    S'inscrire
                  </button>
                </form>
                <p className="mt-6 text-center text-sm">
                  Déjà inscrit ?{" "}
                  <button onClick={toggleForm} className="text-primary hover:underline font-medium">
                    Se connecter
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
