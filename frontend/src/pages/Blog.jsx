import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from '../api';
import {
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  CameraIcon,
} from '../components/SocialIcons';

// Helper pour construire l'URL complète d'une image
const getImageUrl = (path) => {
  if (!path) return null;
  // Si déjà absolue
  if (path.startsWith('http')) return path;
  // Sinon préfixe l'origine du back (assumé sur le même domaine ou configuré)
  const origin = process.env.REACT_APP_BACKEND_URL || window.location.origin;
  return `${origin}${path}`;
};

// Composant d'affichage d'un avis
function ReviewCard({ review }) {
  // Assurer que review.images est un tableau
  const images = Array.isArray(review.images)
    ? review.images
    : typeof review.images === 'string'
    ? JSON.parse(review.images)
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative"
    >
      <div className="h-full p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-primary/10 hover:border-primary/20">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40" />

        <div className="flex items-center gap-4 mb-4">
          {images[0] && (
            <img
              src={getImageUrl(images[0])}
              alt="User"
              className="w-12 h-12 rounded-full object-cover border-2 border-primary/50"
            />
          )}
          <div>
            <h3 className="text-xl font-semibold text-dark">{review.nom}</h3>
            <p className="text-sm text-primary/80">
              {new Date(review.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <p className="text-dark/90 italic mb-4 leading-relaxed">
          "{review.description}"
        </p>

        {images.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {images.map((url, i) => (
              <img
                key={i}
                src={getImageUrl(url)}
                alt={`Preview ${i + 1}`}
                className="w-16 h-16 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity"
              />
            ))}
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>
    </motion.div>
  );
}

export default function Contact() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ nom: '', email: '', description: '' });
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const fileInput = useRef(null);

  // Charger les avis au montage
  useEffect(() => {
    axios
      .get('/blogs')
      .then((res) => setReviews(res.data))
      .catch((err) => console.error('Error fetching reviews:', err));
  }, []);

  // Nettoyage des URL d'aperçu
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
    setPreviews(selected.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('nom', form.nom);
    data.append('email', form.email);
    data.append('description', form.description);
    files.forEach((file) => data.append('images[]', file));

    try {
      const res = await axios.post('/blogs', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setReviews((prev) => [res.data, ...prev]);
      setForm({ nom: '', email: '', description: '' });
      setFiles([]);
      setPreviews([]);
      if (fileInput.current) fileInput.current.value = null;
    } catch (err) {
      console.error('Erreur lors de la soumission du formulaire:', err.response || err);
      const msgData = err.response?.data;
      const msg = msgData?.message || JSON.stringify(msgData) || err.message;
      alert(`Erreur lors de l'envoi : ${msg}`);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-base">
      <div className="container mx-auto px-6 py-12">
        {/* Section Communauté */}
        <motion.div className="text-center mb-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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

        {/* Section Avis */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-16 text-dark relative">
            Expériences voyageurs
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary/80 rounded-full" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review, idx) => (
              <ReviewCard key={idx} review={review} />
            ))}
          </div>
        </section>

        {/* Formulaire */}
        <motion.section className="max-w-2xl mx-auto bg-primary/10 p-8 rounded-2xl shadow-xl" initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
          <h2 className="text-3xl font-bold text-center mb-8 text-dark">Partagez votre expérience</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-dark font-medium mb-2">Nom</label>
              <input
                name="nom"
                value={form.nom}
                onChange={handleChange}
                type="text"
                required
                className="w-full p-3 rounded-lg border border-primary/30 focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-dark font-medium mb-2">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                required
                className="w-full p-3 rounded-lg border border-primary/30 focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-dark font-medium mb-2">Votre expérience</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                required
                className="w-full p-3 rounded-lg border border-primary/30 focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-dark font-medium mb-2">Ajouter des photos</label>
              <div
                onClick={() => fileInput.current?.click()}
                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-primary/30 rounded-lg cursor-pointer hover:border-primary transition-colors"
              >
                <CameraIcon className="h-8 w-8 text-primary mr-2" />
                <span className="text-primary font-medium">Cliquez ou glissez-déposez vos photos</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  ref={fileInput}
                  onChange={handleFile}
                  className="hidden"
                />
              </div>
              {previews.length > 0 && (
                <div className="mt-4 flex gap-2 flex-wrap">
                  {previews.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt={`Prévisualisation ${i + 1}`}
                      className="w-16 h-16 rounded-lg object-cover border border-primary/20"
                    />
                  ))}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-dark transition-colors"
            >
              Publier votre expérience
            </button>
          </form>
        </motion.section>
      </div>
    </div>
  );
}
