import { motion } from 'framer-motion';
import { useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

const ReviewCard = ({ review }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(review.likes || 0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    
    // Ici vous pourriez ajouter un appel API pour sauvegarder le like
    // axios.post(`/reviews/${review.id}/like`)
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="group relative"
    >
      <div className="h-full p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/10 hover:border-primary/20">
        {/* En-tête */}
        <div className="flex items-center gap-4 mb-6">
          {review.images?.[0] ? (
            <motion.div whileHover={{ rotate: 2 }}>
              <img 
                src={review.images[0]} 
                alt="User"
                className="w-14 h-14 rounded-full object-cover border-2 border-primary/50 shadow-sm"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/default-avatar.jpg';
                }}
              />
            </motion.div>
          ) : (
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
              <span className="text-2xl text-primary/60">👤</span>
            </div>
          )}
          <div>
            <h3 className="text-xl font-semibold text-dark">{review.nom}</h3>
            <p className="text-sm text-primary/80">
              {new Date(review.created_at).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* Contenu */}
        <div className="relative mb-6">
          <div className="absolute -left-6 top-0 h-full w-1 bg-primary/20 rounded-full" />
          <p className="text-dark/90 leading-relaxed pl-4 italic">
            "{review.description}"
          </p>
        </div>

        {/* Galerie */}
        {review.images?.length > 0 && (
          <div className="mt-4">
            <div className="grid grid-cols-3 gap-2">
              {review.images.map((image, imgIndex) => (
                <motion.div
                  key={imgIndex}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square overflow-hidden rounded-lg"
                >
                  <img
                    src={image}
                    alt={`Preview ${imgIndex}`}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/default-image.jpg';
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Bouton Like */}
        <div className="mt-6 pt-4 border-t border-primary/10 flex justify-between items-center">
          <button 
            onClick={handleLike}
            className="flex items-center gap-1 text-primary hover:text-dark transition-colors"
          >
            {isLiked ? (
              <HeartIconSolid className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5 w-5" />
            )}
            <span>{likeCount} J'aime</span>
          </button>

          <span className="text-xs text-primary/60">
            {review.images?.length || 0} photo{review.images?.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;