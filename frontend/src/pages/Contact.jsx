import { motion } from 'framer-motion';
import { InstagramIcon, FacebookIcon, TwitterIcon } from '../components/SocialIcons';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [errorMessages, setErrorMessages] = useState({});

  // 1) Configure axios – si vous lancez 'npm run dev', votre front tourne sur 3000
  //    et votre API sur 8000. Pensez aussi à définir "proxy" dans package.json.
  useEffect(() => {
    axios.defaults.baseURL = 'http://127.0.0.1:8000';
    // Pour recevoir un JSON clair en cas d’erreur 422
    axios.defaults.headers.common['Accept'] = 'application/json';
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // on efface l’erreur liée à ce champ
    setErrorMessages(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setErrorMessages({});

    try {
      const response = await axios.post('/api/contact', formData);

      if (response.status === 201 && response.data.success) {
        setSubmitMessage('Message envoyé avec succès !');
        setFormData({ nom: '', email: '', sujet: '', message: '' });
      } else {
        throw new Error('Statut inattendu');
      }
    } catch (error) {
      console.error('Erreur envoi contact :', error);

      // Validation Laravel renvoie un 422 JSON avec { errors: { champ: [msg] } }
      if (error.response && error.response.status === 422) {
        setErrorMessages(error.response.data.errors);
      }
      // Erreur réseau / CORS / autre
      else {
        setSubmitMessage('Erreur lors de l’envoi du message. Veuillez réessayer.');
      }
    } finally {
      setIsSubmitting(false);
      // Faites disparaître le message après 5s
      setTimeout(() => setSubmitMessage(''), 5000);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-base">
      <div className="container mx-auto px-6 py-12">
        {/* Réseaux sociaux */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-4xl font-bold text-dark mb-6">Rejoignez notre communauté</h2>
          <div className="flex justify-center space-x-8">
            <a href="https://instagram.com/viajeinfinito" target="_blank" rel="noopener noreferrer">
              <InstagramIcon className="h-12 w-12 text-primary hover:text-dark transition-colors" />
            </a>
            <a href="https://facebook.com/viajeinfinito" target="_blank" rel="noopener noreferrer">
              <FacebookIcon className="h-12 w-12 text-primary hover:text-dark transition-colors" />
            </a>
            <a href="https://twitter.com/viajeinfinito" target="_blank" rel="noopener noreferrer">
              <TwitterIcon className="h-12 w-12 text-primary hover:text-dark transition-colors" />
            </a>
          </div>
        </motion.div>

        {/* Formulaire de contact */}
        <motion.section
          className="max-w-2xl mx-auto bg-primary/10 p-8 rounded-2xl shadow-xl"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-dark">Contactez-nous</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {[
              { name: 'nom', label: 'Nom', type: 'text', placeholder: 'Votre nom' },
              { name: 'email', label: 'Email', type: 'email', placeholder: 'Votre adresse email' },
              { name: 'sujet', label: 'Sujet', type: 'text', placeholder: 'Sujet de votre message' },
            ].map(({ name, label, type, placeholder }) => (
              <div key={name}>
                <label htmlFor={name} className="block text-dark font-medium mb-2">{label}</label>
                <input
                  id={name}
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full p-3 rounded-lg border border-primary/30 focus:ring-2 focus:ring-primary"
                  required
                />
                {errorMessages[name] && (
                  <p className="mt-1 text-red-600 text-sm">{errorMessages[name][0]}</p>
                )}
              </div>
            ))}

            <div>
              <label htmlFor="message" className="block text-dark font-medium mb-2">Message</label>
              <textarea
                id="message"
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Votre message..."
                className="w-full p-3 rounded-lg border border-primary/30 focus:ring-2 focus:ring-primary"
                required
              />
              {errorMessages.message && (
                <p className="mt-1 text-red-600 text-sm">{errorMessages.message[0]}</p>
              )}
            </div>

            {submitMessage && (
              <div className={`p-3 rounded-lg ${submitMessage.includes('succès') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {submitMessage}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-base py-3 rounded-lg font-semibold hover:bg-dark transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
            </button>
          </form>
        </motion.section>
      </div>
    </div>
);
}
