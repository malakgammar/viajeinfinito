import { motion } from 'framer-motion';

export default function ReviewCard({ review }) {
  return (
    <motion.div 
      className="bg-base p-6 rounded-xl shadow-lg border border-primary/20"
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center mb-4">
        <img 
          src={review.avatar} 
          alt={review.author} 
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="ml-4">
          <h4 className="font-bold text-dark">{review.author}</h4>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-5 w-5 ${i < review.rating ? 'text-primary' : 'text-dark/20'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <p className="text-dark/80 mb-4">{review.text}</p>
      {review.photos && (
        <div className="grid grid-cols-3 gap-2">
          {review.photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Experience ${index + 1}`}
              className="h-24 w-full object-cover rounded-lg"
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}