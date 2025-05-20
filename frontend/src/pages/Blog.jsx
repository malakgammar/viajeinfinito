import { useState, useEffect, useRef } from 'react';
import ReviewCard from '../components/ReviewCard'; 
import { motion } from 'framer-motion';
import axios from '../api';
import {
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  CameraIcon,
} from '../components/SocialIcons';

export default function Contact() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ nom: '', email: '', description: '' });
  const [files, setFiles] = useState([]);
  const fileInput = useRef(null);

  useEffect(() => {
    axios
      .get('/blogs')
      .then((res) => setReviews(res.data))
      .catch((err) => console.error('Error fetching reviews:', err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setFiles([...e.target.files]);
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
      if (fileInput.current) fileInput.current.value = null;
    } catch (err) {
      console.error('Erreur lors de la soumission du formulaire:', err);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-base">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/* Section Communauté */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-6">Rejoignez notre communauté</h2>
  
          <div className="flex justify-center space-x-6">
            <motion.a 
              href="https://instagram.com/viajeinfinito" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
            >
              <InstagramIcon className="h-10 w-10 text-primary hover:text-dark transition-colors" />
            </motion.a>
            <motion.a 
              href="https://facebook.com/viajeinfinito" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
            >
              <FacebookIcon className="h-10 w-10 text-primary hover:text-dark transition-colors" />
            </motion.a>
            <motion.a 
              href="https://twitter.com/viajeinfinito" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
            >
              <TwitterIcon className="h-10 w-10 text-primary hover:text-dark transition-colors" />
            </motion.a>
          </div>
          <p className="text-lg text-dark/80 max-w-2xl mx-auto mb-8">
            Partagez vos aventures et inspirez d'autres voyageurs
          </p>
        </motion.div>

        {/* Section Avis */}
<section className="mb-20">
  <center>
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-dark relative inline-block mx-auto">
      Expériences voyageurs
      <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
    </h2>
  </center>
  
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {reviews.map((review, index) => (
      <ReviewCard 
        key={index} 
        review={review} 
        index={index} 
      />
    ))}
  </div>
</section>

        {/* Formulaire */}
        <motion.section
          className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-primary/20"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-dark">Partagez votre expérience</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-dark font-medium mb-2">Votre nom</label>
              <input
                name="nom"
                value={form.nom}
                onChange={handleChange}
                type="text"
                required
                className="w-full p-3 rounded-lg border border-primary/30 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Votre nom ou pseudo"
              />
            </div>

            <div>
              <label className="block text-dark font-medium mb-2">Votre email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                required
                className="w-full p-3 rounded-lg border border-primary/30 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="email@exemple.com"
              />
            </div>

            <div>
              <label className="block text-dark font-medium mb-2">Votre expérience</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="5"
                required
                className="w-full p-3 rounded-lg border border-primary/30 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Décrivez votre voyage inoubliable..."
              />
            </div>

            <div>
              <label className="block text-dark font-medium mb-2">Ajouter des photos</label>
              <motion.div
                onClick={() => fileInput.current?.click()}
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-primary/30 rounded-lg cursor-pointer hover:border-primary transition-colors bg-primary/5 p-6 text-center"
                whileHover={{ scale: 1.01 }}
              >
                <CameraIcon className="h-10 w-10 text-primary mb-3" />
                <span className="text-primary font-medium">Cliquez ou glissez-déposez vos photos</span>
                <span className="text-sm text-primary/60 mt-1">(Formats JPEG, PNG - Max 5MB)</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  ref={fileInput}
                  onChange={handleFile}
                  className="hidden"
                />
              </motion.div>
              {files.length > 0 && (
                <div className="mt-2 text-sm text-primary/80">
                  {files.length} fichier{files.length !== 1 ? 's' : ''} sélectionné{files.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>

            <motion.button
              type="submit"
              className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-dark transition-colors relative overflow-hidden"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Publier votre expérience</span>
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.button>
          </form>
        </motion.section>
      </div>
    </div>
  );
}