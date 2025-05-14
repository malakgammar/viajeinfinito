import { motion } from 'framer-motion';
import ReviewCard from '../components/ReviewCard';
import { 
  InstagramIcon, 
  FacebookIcon, 
  TwitterIcon, 
  CameraIcon 
} from '../components/SocialIcons';
const reviews = [
  {
    author: "Marie D.",
    rating: 5,
    text: "Une expérience incroyable en Thaïlande grâce à ViajeInfinito ! Tout était parfaitement organisé.",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    photos: [
      "https://source.unsplash.com/random/800x600?v=1",
      "https://source.unsplash.com/random/800x600?v=2"
    ]
  },
];

export default function Blog() {
<div className="pt-20 min-h-screen bg-base">
      <div className="container mx-auto px-6 py-12">
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

        {/* Section Avis Clients */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-16 text-dark">Expériences voyageurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
        </section>
</div>
</div>}